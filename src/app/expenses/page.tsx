import { getExpenses, addExpense, deleteExpense, getMulticabs } from "../actions";
import { Plus, Trash2 } from "lucide-react";

export default async function ExpensesPage() {
  const [expenses, multicabs] = await Promise.all([
    getExpenses(),
    getMulticabs()
  ]);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Expenses</h1>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap-reverse' }}>
        <div className="card" style={{ flex: '1', minWidth: '400px' }}>
          <h2 style={{ marginBottom: '1rem' }}>Recent Expenses</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Multicab</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No expenses recorded yet.</td>
                  </tr>
                ) : (
                  expenses.map((e) => (
                    <tr key={e.id}>
                      <td>{new Date(e.date).toLocaleDateString()}</td>
                      <td style={{ fontWeight: 500 }}>{e.multicab.plateNumber}</td>
                      <td>{e.description}</td>
                      <td className="danger" style={{ fontWeight: 600 }}>₱{e.amount.toLocaleString()}</td>
                      <td>
                        <form action={deleteExpense.bind(null, e.id)}>
                          <button type="submit" className="btn btn-danger" style={{ padding: '0.5rem' }}>
                            <Trash2 size={16} />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ width: '320px', height: 'fit-content' }}>
          <h2 style={{ marginBottom: '1rem' }}>Log Expense</h2>
          <form action={addExpense}>
            <div className="form-group">
              <label>Multicab</label>
              <select name="multicabId" required>
                <option value="">Select Multicab...</option>
                {multicabs.map(mc => (
                  <option key={mc.id} value={mc.id}>{mc.plateNumber} - {mc.driverName}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Amount (₱)</label>
              <input type="number" name="amount" placeholder="1500" required min="0" step="0.01" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input type="text" name="description" placeholder="Oil change, parts, etc." required />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="date" required defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <Plus size={18} /> Save Expense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
