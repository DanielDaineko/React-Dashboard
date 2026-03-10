import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

export default function SalesLineChart({ carts }) {
  const chartData = {
    labels: carts.map((cart) => `Order ${cart.id}`),
    datasets: [
      {
        label: "Order Total",
        data: carts.map((cart) => cart.total),
        borderWidth: 2,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div style={styles.wrapper}>
      <Line data={chartData} options={options} />
    </div>
  );
}

const styles = {
  wrapper: {
    height: "320px",
  },
};
