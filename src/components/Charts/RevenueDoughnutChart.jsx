import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function RevenueDoughnutChart({ carts }) {
  const chartData = {
    labels: ["Products Total", "Discounted Total", "Shipping Value"],
    datasets: [
      {
        label: "Revenue Sources",
        data: [
          carts.reduce((sum, cart) => sum + cart.total, 0),
          carts.reduce((sum, cart) => sum + cart.discountedTotal, 0),
          carts.reduce(
            (sum, cart) => sum + (cart.total - cart.discountedTotal),
            0,
          ),
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div style={styles.wrapper}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

const styles = {
  wrapper: {
    height: "320px",
  },
};
