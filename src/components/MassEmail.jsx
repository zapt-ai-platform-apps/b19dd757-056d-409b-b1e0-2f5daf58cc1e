import { createSignal, onMount, For } from 'solid-js';
import { supabase } from '../supabaseClient';

function MassEmail(props) {
  const [leadLists, setLeadLists] = createSignal([]);
  const [selectedListId, setSelectedListId] = createSignal(null);
  const [emailContent, setEmailContent] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const fetchLeadLists = async () => {
    let { data, error } = await supabase
      .from('lead_lists')
      .select('id, name')
      .eq('user_id', props.userId);
    if (error) console.error('Error fetching lead lists:', error);
    else setLeadLists(data);
  };

  onMount(fetchLeadLists);

  const sendEmails = async () => {
    if (!selectedListId() || !emailContent()) return;
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    try {
      const response = await fetch('/api/sendMassEmail', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailContent: emailContent(),
          leadListId: selectedListId(),
        }),
      });
      if (response.ok) {
        alert('Emails sent successfully!');
        setEmailContent('');
      } else {
        console.error('Error sending emails:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending emails:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 class="text-xl font-bold mb-4 text-purple-600">Mass Email</h2>
      <div class="mb-4">
        <label class="block mb-2">Select Lead List:</label>
        <select
          class="w-full p-2 border rounded box-border"
          onChange={(e) => setSelectedListId(e.target.value)}
        >
          <option value="">-- Select List --</option>
          <For each={leadLists()}>
            {(list) => (
              <option value={list.id}>{list.name}</option>
            )}
          </For>
        </select>
      </div>
      <div class="mb-4">
        <label class="block mb-2">Email Content:</label>
        <textarea
          class="w-full p-2 border rounded box-border"
          rows="6"
          value={emailContent()}
          onInput={(e) => setEmailContent(e.target.value)}
        ></textarea>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
        onClick={sendEmails}
        disabled={loading()}
      >
        {loading() ? 'Sending...' : 'Send Emails'}
      </button>
    </div>
  );
}

export default MassEmail;