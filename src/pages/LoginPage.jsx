import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser({
        username: formData.username,
        password: formData.password,
        expiresInMins: 30,
      });

      const token = data.accessToken || data.token;

      login(token, data);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login error. Check your username and password.",
      );
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setFormData({
      username: "emilys",
      password: "emilyspass",
    });
    setError("");
  };

  return (
    <div className="login-page">
      <div className="login-page__overlay" />

      <div className="login-card">
        <div className="login-card__header">
          <span className="login-card__badge">React Dashboard</span>
          <h1 className="login-card__title">Welcome back</h1>
          <p className="login-card__subtitle"></p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form__field">
            <label htmlFor="username" className="login-form__label">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Введите username"
              className="login-form__input"
              required
            />
          </div>

          <div className="login-form__field">
            <label htmlFor="password" className="login-form__label">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              className="login-form__input"
              required
            />
          </div>

          {error && <p className="login-form__error">{error}</p>}

          <button
            type="submit"
            className="login-form__button"
            disabled={loading}
          >
            {loading ? "Let's go..." : "Login"}
          </button>
        </form>

        <div className="login-demo">
          <div className="login-demo__top">
            <div>
              <p className="login-demo__title">Test account</p>
              <p className="login-demo__text"></p>
            </div>

            <button
              type="button"
              className="login-demo__fill-button"
              onClick={fillDemoCredentials}
            >
              Take
            </button>
          </div>

          <div className="login-demo__credentials">
            <div className="login-demo__item">
              <span className="login-demo__key">username</span>
              <span className="login-demo__value">emilys</span>
            </div>

            <div className="login-demo__item">
              <span className="login-demo__key">password</span>
              <span className="login-demo__value">emilyspass</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
