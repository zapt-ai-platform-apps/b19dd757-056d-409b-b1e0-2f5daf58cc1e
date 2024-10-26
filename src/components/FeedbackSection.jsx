import { createSignal, onMount, For } from 'solid-js';
import { supabase } from '../supabaseClient';

function FeedbackSection(props) {
  const [feedbackList, setFeedbackList] = createSignal([]);
  const [newFeedback, setNewFeedback] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const fetchFeedback = async () => {
    let { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error('Error fetching feedback:', error);
    else setFeedbackList(data);
  };

  onMount(fetchFeedback);

  const submitFeedback = async () => {
    if (!newFeedback()) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('feedback')
      .insert([
        { comments: newFeedback(), user_id: props.userId },
      ])
      .single();
    if (error) console.error('Error submitting feedback:', error);
    else setFeedbackList([data, ...feedbackList()]);
    setNewFeedback('');
    setLoading(false);
  };

  return (
    <div>
      <h2 class="text-xl font-bold mb-4 text-purple-600">User Feedback</h2>
      <div class="mb-4">
        <textarea
          class="w-full p-2 border rounded box-border"
          rows="4"
          placeholder="Leave your feedback..."
          value={newFeedback()}
          onInput={(e) => setNewFeedback(e.target.value)}
        ></textarea>
      </div>
      <button
        class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded cursor-pointer mb-6"
        onClick={submitFeedback}
        disabled={loading()}
      >
        {loading() ? 'Submitting...' : 'Submit Feedback'}
      </button>
      <For each={feedbackList()}>
        {(feedback) => (
          <div class="p-4 mb-2 bg-gray-100 rounded shadow">
            <p>{feedback.comments}</p>
            <small class="text-gray-500">Posted on {new Date(feedback.created_at).toLocaleString()}</small>
          </div>
        )}
      </For>
    </div>
  );
}

export default FeedbackSection;