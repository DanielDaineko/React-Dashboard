import { useMemo, useState } from "react";
import Sidebar from "../components/Layout/Sidebar";
import Topbar from "../components/Layout/Topbar";
import StatCard from "../components/UI/StatCard";
import Loader from "../components/UI/Loader";
import ErrorMessage from "../components/UI/ErrorMessage";
import DashboardFilters from "../components/UI/DashboardFilters";
import SalesLineChart from "../components/Charts/SalesLineChart";
import CategoryBarChart from "../components/Charts/CategoryBarChart";
import RevenueDoughnutChart from "../components/Charts/RevenueDoughnutChart";
import { useDashboardData } from "../hooks/useDashboardData";
import formatCurrency from "../utils/formatCurrency";
import "./DashboardPage.css";

function getOrderStatus(cartId) {
  const statuses = ["paid", "processing", "completed"];
  return statuses[cartId % statuses.length];
}

function getPeriodLimit(period) {
  if (period === "7") return 3;
  if (period === "30") return 6;
  return 10;
}

export default function DashboardPage() {
  const { products, users, carts, loading, error } = useDashboardData();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [period, setPeriod] = useState("30");

  const preparedCarts = useMemo(() => {
    return carts.map((cart) => ({
      ...cart,
      status: getOrderStatus(cart.id),
    }));
  }, [carts]);

  const filteredCarts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const limit = getPeriodLimit(period);

    return preparedCarts.slice(0, limit).filter((cart) => {
      const matchesSearch =
        normalizedSearch === "" ||
        `order #${cart.id}`.toLowerCase().includes(normalizedSearch) ||
        String(cart.id).includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" || cart.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [preparedCarts, searchTerm, statusFilter, period]);

  const filteredProducts = useMemo(() => {
    const limit = period === "7" ? 6 : period === "30" ? 10 : products.length;
    return products.slice(0, limit);
  }, [products, period]);

  const totalRevenue = filteredCarts.reduce((sum, cart) => sum + cart.total, 0);
  const totalOrders = filteredCarts.length;
  const totalCustomers = users.length;
  const totalProducts = filteredProducts.length;

  const stats = [
    {
      title: "Revenue",
      value: formatCurrency(totalRevenue),
      change: "+12.5%",
    },
    {
      title: "Orders",
      value: totalOrders,
      change: "+8.2%",
    },
    {
      title: "Customers",
      value: totalCustomers,
      change: "+5.4%",
    },
    {
      title: "Products",
      value: totalProducts,
      change: "-1.1%",
    },
  ];

  return (
    <div className="dashboard-page">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <>
            <DashboardFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              period={period}
              onPeriodChange={setPeriod}
            />

            <section className="dashboard-stats-grid">
              {stats.map((item) => (
                <StatCard
                  key={item.title}
                  title={item.title}
                  value={item.value}
                  change={item.change}
                />
              ))}
            </section>

            <section className="dashboard-content-grid">
              <div className="dashboard-block dashboard-block--large">
                <h2 className="dashboard-block__title">Sales Overview</h2>
                <SalesLineChart carts={filteredCarts} />
              </div>

              <div className="dashboard-block dashboard-block--small">
                <h2 className="dashboard-block__title">Revenue Sources</h2>
                <RevenueDoughnutChart carts={filteredCarts} />
              </div>
            </section>

            <section className="dashboard-bottom-grid">
              <div className="dashboard-block">
                <h2 className="dashboard-block__title">Recent Orders</h2>

                <div className="orders-list">
                  {filteredCarts.length > 0 ? (
                    filteredCarts.map((cart) => (
                      <div key={cart.id} className="orders-list__item">
                        <div>
                          <p className="orders-list__title">Order #{cart.id}</p>
                          <p className="orders-list__subtitle">
                            Products: {cart.totalProducts} | Quantity:{" "}
                            {cart.totalQuantity}
                          </p>
                        </div>

                        <div className="orders-list__right">
                          <span
                            className={`orders-list__status orders-list__status--${cart.status}`}
                          >
                            {cart.status}
                          </span>
                          <div className="orders-list__amount">
                            {formatCurrency(cart.total)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="orders-list__empty">
                      Nothing found matching current filters.
                    </p>
                  )}
                </div>
              </div>

              <div className="dashboard-block">
                <h2 className="dashboard-block__title">Product Categories</h2>
                <CategoryBarChart products={filteredProducts} />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
