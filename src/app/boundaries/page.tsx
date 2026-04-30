import { getBoundaries, addBoundary, deleteBoundary, getMulticabs } from "../actions";
import { Plus, Trash2 } from "lucide-react";

export default async function BoundariesPage() {
  const [boundaries, multicabs] = await Promise.all([
    getBoundaries(),
    getMulticabs()
  ]);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Boundaries</h1>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap-reverse' }}>
        <div className="card" style={{ flex: '1', minWidth: '400px' }}>
          <h2 style={{ marginBottom: '1rem' }}>Recent Boundaries</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Multicab</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {boundaries.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No boundaries recorded yet.</td>
                  </tr>
                ) : (
                  boundaries.map((b) => (
                    <tr key={b.id}>
                      <td>{new Date(b.date).toLocaleDateString()}</td>
                      <td style={{ fontWeight: 500 }}>{b.multicab.plateNumber}</td>
                      <td>
                        <span className={`badge ${b.type === 'Daily' ? 'badge-daily' : 'badge-weekly'}`}>
                          {b.type}
                        </span>
                      </td>
                      <td className="success" style={{ fontWeight: 600 }}>₱{b.amount.toLocaleString()}</td>
                      <td>
                        <form action={deleteBoundary.bind(null, b.id)}>
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
          <h2 style={{ marginBottom: '1rem' }}>Record Boundary</h2>
          <form action={addBoundary}>
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
              <input type="number" name="amount" placeholder="500" required min="0" step="0.01" />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="date" required defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select name="type" required>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <Plus size={18} /> Save Boundary
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
