import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Topbar.css";

export default function Topbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="topbar">
      <div>
        <h1 className="topbar__title">Dashboard</h1>
        <p className="topbar__subtitle">
          Hi, {user?.firstName || user?.username}!
        </p>
      </div>

      <button onClick={handleLogout} className="topbar__button">
        Logout
      </button>
    </header>
  );
}
