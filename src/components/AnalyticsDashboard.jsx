import { onMount, createSignal } from 'solid-js';
import { Chart, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'solid-chartjs';

function AnalyticsDashboard(props) {
  const [chartData, setChartData] = createSignal({
    labels: [],
    datasets: [
      {
        label: 'Open Rates',
        data: [],
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Email Open Rates',
      },
    },
  };

  onMount(() => {
    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    // Mock data for demonstration
    const fetchData = () => {
      setChartData({
        labels: ['Campaign 1', 'Campaign 2', 'Campaign 3'],
        datasets: [
          {
            label: 'Open Rates',
            data: [65, 59, 80],
            backgroundColor: 'rgba(99, 102, 241, 0.6)',
          },
        ],
      });
    };

    fetchData();
  });

  return (
    <div>
      <h2 class="text-xl font-bold mb-4 text-purple-600">Analytics Dashboard</h2>
      <div class="w-full h-96">
        <Bar data={chartData()} options={chartOptions} />
      </div>
    </div>
  );
}

export default AnalyticsDashboard;