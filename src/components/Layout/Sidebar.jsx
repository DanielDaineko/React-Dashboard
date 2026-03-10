import "./Sidebar.css";

const navItems = ["Dashboard", "Analytics", "Orders", "Customers", "Settings"];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <h2 className="sidebar__logo">ReactDash</h2>

        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className={`sidebar__link ${
                item === "Dashboard" ? "sidebar__link--active" : ""
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      <div className="sidebar__footer">
        <p className="sidebar__footer-text">React Project DashBoard</p>
      </div>
    </aside>
  );
}
