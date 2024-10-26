import { createSignal, onMount, For } from 'solid-js';
import { supabase } from '../supabaseClient';

function LeadLists(props) {
  const [leadLists, setLeadLists] = createSignal([]);
  const [newList, setNewList] = createSignal({ name: '', description: '' });
  const [loading, setLoading] = createSignal(false);

  const fetchLeadLists = async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from('lead_lists')
      .select('*')
      .eq('user_id', props.userId);
    if (error) console.error('Error fetching lead lists:', error);
    else setLeadLists(data);
    setLoading(false);
  };

  onMount(fetchLeadLists);

  const createLeadList = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('lead_lists')
      .insert([
        { ...newList(), user_id: props.userId },
      ])
      .single();
    if (error) console.error('Error creating lead list:', error);
    else setLeadLists([...leadLists(), data]);
    setNewList({ name: '', description: '' });
    setLoading(false);
  };

  return (
    <div>
      <h2 class="text-xl font-bold mb-4 text-purple-600">Lead Lists</h2>
      <div class="mb-6">
        <input
          type="text"
          placeholder="List Name"
          value={newList().name}
          onInput={(e) => setNewList({ ...newList(), name: e.target.value })}
          class="w-full p-2 mb-2 border rounded box-border"
        />
        <input
          type="text"
          placeholder="Description"
          value={newList().description}
          onInput={(e) => setNewList({ ...newList(), description: e.target.value })}
          class="w-full p-2 mb-2 border rounded box-border"
        />
        <button
          class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded cursor-pointer"
          onClick={createLeadList}
          disabled={loading()}
        >
          {loading() ? 'Creating...' : 'Create List'}
        </button>
      </div>
      <For each={leadLists()}>
        {(list) => (
          <div class="p-4 mb-2 bg-gray-100 rounded shadow">
            <h3 class="font-semibold">{list.name}</h3>
            <p>{list.description}</p>
          </div>
        )}
      </For>
    </div>
  );
}

export default LeadLists;