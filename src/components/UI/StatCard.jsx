import "./StatCard.css";

export default function StatCard({ title, value, change }) {
  const isPositive = String(change).startsWith("+");

  return (
    <div className="stat-card">
      <p className="stat-card__title">{title}</p>
      <h3 className="stat-card__value">{value}</h3>
      <span
        className={`stat-card__change ${
          isPositive
            ? "stat-card__change--positive"
            : "stat-card__change--negative"
        }`}
      >
        {change}
      </span>
    </div>
  );
}
