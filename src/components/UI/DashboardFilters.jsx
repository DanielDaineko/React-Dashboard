import "./DashboardFilters.css";

export default function DashboardFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  period,
  onPeriodChange,
}) {
  return (
    <section className="dashboard-filters">
      <div className="dashboard-filters__group dashboard-filters__group--search">
        <label htmlFor="search" className="dashboard-filters__label">
          Search orders
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="For example: Order #3"
          className="dashboard-filters__input"
        />
      </div>

      <div className="dashboard-filters__group">
        <label htmlFor="status" className="dashboard-filters__label">
          Status
        </label>
        <select
          id="status"
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
          className="dashboard-filters__select"
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="dashboard-filters__group">
        <label htmlFor="period" className="dashboard-filters__label">
          Period
        </label>
        <select
          id="period"
          value={period}
          onChange={(event) => onPeriodChange(event.target.value)}
          className="dashboard-filters__select"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>
    </section>
  );
}
