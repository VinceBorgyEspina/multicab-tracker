import { getRestDays, addRestDay, deleteRestDay, getMulticabs } from "../actions";
import { Plus, Trash2 } from "lucide-react";

export default async function RestDaysPage() {
  const [restDays, multicabs] = await Promise.all([
    getRestDays(),
    getMulticabs()
  ]);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Rest Days</h1>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap-reverse' }}>
        <div className="card" style={{ flex: '1', minWidth: '400px' }}>
          <h2 style={{ marginBottom: '1rem' }}>Upcoming & Past Rest Days</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Multicab</th>
                  <th>Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {restDays.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No rest days scheduled.</td>
                  </tr>
                ) : (
                  restDays.map((rd) => (
                    <tr key={rd.id}>
                      <td>{new Date(rd.date).toLocaleDateString()}</td>
                      <td style={{ fontWeight: 500 }}>{rd.multicab.plateNumber}</td>
                      <td>{rd.reason || 'None provided'}</td>
                      <td>
                        <form action={deleteRestDay.bind(null, rd.id)}>
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
          <h2 style={{ marginBottom: '1rem' }}>Schedule Rest Day</h2>
          <form action={addRestDay}>
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
              <label>Date</label>
              <input type="date" name="date" required defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="form-group">
              <label>Reason (Optional)</label>
              <input type="text" name="reason" placeholder="Coding day, maintenance, etc." />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <Plus size={18} /> Schedule
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
