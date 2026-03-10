import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CategoryBarChart({ products }) {
  const categoryMap = products.reduce((acc, product) => {
    const category = product.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(categoryMap);
  const values = Object.values(categoryMap);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Products by Category",
        data: values,
        borderWidth: 1,
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
      <Bar data={chartData} options={options} />
    </div>
  );
}

const styles = {
  wrapper: {
    height: "320px",
  },
};
