import { getDashboardStats } from "./actions";

export default async function Dashboard() {
  const stats = await getDashboardStats();

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value success">
            ₱{stats.totalRevenue.toLocaleString()}
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-title">Total Expenses</div>
          <div className="stat-value danger">
            ₱{stats.totalExpenses.toLocaleString()}
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-title">Net Income</div>
          <div className={`stat-value ${stats.netIncome >= 0 ? 'success' : 'danger'}`}>
            ₱{stats.netIncome.toLocaleString()}
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-title">Total Multicabs</div>
          <div className="stat-value">
            {stats.multicabsCount}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Welcome to Multicab Tracker</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>
          Manage your multicab business efficiently. Use the sidebar to navigate through your multicabs, track daily boundaries, log expenses, and schedule rest days.
        </p>
      </div>
    </div>
  );
}
