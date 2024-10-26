import { createSignal, createEffect, Show } from 'solid-js';
import LeadLists from './LeadLists';
import MassEmail from './MassEmail';
import CustomForms from './CustomForms';
import FeedbackSection from './FeedbackSection';
import AnalyticsDashboard from './AnalyticsDashboard';

function LeadDashboard(props) {
  const [currentTab, setCurrentTab] = createSignal('leadLists');

  return (
    <div class="h-full">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-purple-600">LeadManager Dashboard</h1>
        <button
          class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md focus:outline-none cursor-pointer"
          onClick={props.onSignOut}
        >
          Sign Out
        </button>
      </div>
      <div class="flex space-x-4 mb-6">
        <button
          class={`py-2 px-4 rounded-lg ${currentTab() === 'leadLists' ? 'bg-purple-600 text-white' : 'bg-white text-gray-800'} cursor-pointer`}
          onClick={() => setCurrentTab('leadLists')}
        >
          Lead Lists
        </button>
        <button
          class={`py-2 px-4 rounded-lg ${currentTab() === 'massEmail' ? 'bg-purple-600 text-white' : 'bg-white text-gray-800'} cursor-pointer`}
          onClick={() => setCurrentTab('massEmail')}
        >
          Mass Email
        </button>
        <button
          class={`py-2 px-4 rounded-lg ${currentTab() === 'customForms' ? 'bg-purple-600 text-white' : 'bg-white text-gray-800'} cursor-pointer`}
          onClick={() => setCurrentTab('customForms')}
        >
          Custom Forms
        </button>
        <button
          class={`py-2 px-4 rounded-lg ${currentTab() === 'analytics' ? 'bg-purple-600 text-white' : 'bg-white text-gray-800'} cursor-pointer`}
          onClick={() => setCurrentTab('analytics')}
        >
          Analytics
        </button>
        <button
          class={`py-2 px-4 rounded-lg ${currentTab() === 'feedback' ? 'bg-purple-600 text-white' : 'bg-white text-gray-800'} cursor-pointer`}
          onClick={() => setCurrentTab('feedback')}
        >
          Feedback
        </button>
      </div>
      <div class="bg-white rounded-lg p-4 shadow-md h-full overflow-auto">
        <Show when={currentTab() === 'leadLists'}>
          <LeadLists userId={props.user.id} />
        </Show>
        <Show when={currentTab() === 'massEmail'}>
          <MassEmail userId={props.user.id} />
        </Show>
        <Show when={currentTab() === 'customForms'}>
          <CustomForms userId={props.user.id} />
        </Show>
        <Show when={currentTab() === 'analytics'}>
          <AnalyticsDashboard userId={props.user.id} />
        </Show>
        <Show when={currentTab() === 'feedback'}>
          <FeedbackSection userId={props.user.id} />
        </Show>
      </div>
    </div>
  );
}

export default LeadDashboard;