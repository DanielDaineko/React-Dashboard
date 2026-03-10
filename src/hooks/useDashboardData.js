import { useEffect, useState } from "react";
import { getCarts, getProducts, getUsers } from "../api/dashboardApi";

export function useDashboardData() {
  const [data, setData] = useState({
    products: [],
    users: [],
    carts: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      setError("");

      try {
        const [productsResponse, usersResponse, cartsResponse] =
          await Promise.all([getProducts(), getUsers(), getCarts()]);

        setData({
          products: productsResponse.products || [],
          users: usersResponse.users || [],
          carts: cartsResponse.carts || [],
        });
      } catch (err) {
        setError("Failed to load dashboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return {
    products: data.products,
    users: data.users,
    carts: data.carts,
    loading,
    error,
  };
}
