import { createSignal, onMount, For } from 'solid-js';
import { supabase } from '../supabaseClient';

function CustomForms(props) {
  const [forms, setForms] = createSignal([]);
  const [newForm, setNewForm] = createSignal({ title: '', fields: [] });
  const [fieldName, setFieldName] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const fetchForms = async () => {
    let { data, error } = await supabase
      .from('forms')
      .select('*')
      .eq('user_id', props.userId);
    if (error) console.error('Error fetching forms:', error);
    else setForms(data);
  };

  onMount(fetchForms);

  const addField = () => {
    if (fieldName()) {
      setNewForm({ ...newForm(), fields: [...newForm().fields, fieldName()] });
      setFieldName('');
    }
  };

  const createForm = async () => {
    if (!newForm().title || newForm().fields.length === 0) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('forms')
      .insert([
        { ...newForm(), user_id: props.userId, fields: JSON.stringify(newForm().fields) },
      ])
      .single();
    if (error) console.error('Error creating form:', error);
    else setForms([...forms(), data]);
    setNewForm({ title: '', fields: [] });
    setLoading(false);
  };

  return (
    <div>
      <h2 class="text-xl font-bold mb-4 text-purple-600">Custom Forms</h2>
      <div class="mb-6">
        <input
          type="text"
          placeholder="Form Title"
          value={newForm().title}
          onInput={(e) => setNewForm({ ...newForm(), title: e.target.value })}
          class="w-full p-2 mb-2 border rounded box-border"
        />
        <div class="flex mb-2">
          <input
            type="text"
            placeholder="Field Name"
            value={fieldName()}
            onInput={(e) => setFieldName(e.target.value)}
            class="flex-1 p-2 border rounded-l box-border"
          />
          <button
            class="bg-green-500 hover:bg-green-600 text-white px-4 rounded-r cursor-pointer"
            onClick={addField}
          >
            Add Field
          </button>
        </div>
        <div class="mb-2">
          <For each={newForm().fields}>
            {(field) => (
              <span class="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mb-2">{field}</span>
            )}
          </For>
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
          onClick={createForm}
          disabled={loading()}
        >
          {loading() ? 'Creating...' : 'Create Form'}
        </button>
      </div>
      <For each={forms()}>
        {(form) => (
          <div class="p-4 mb-2 bg-gray-100 rounded shadow">
            <h3 class="font-semibold">{form.title}</h3>
            <div>
              <For each={JSON.parse(form.fields)}>
                {(field) => (
                  <span class="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mb-2">{field}</span>
                )}
              </For>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}

export default CustomForms;