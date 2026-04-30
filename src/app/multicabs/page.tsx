import { getMulticabs, addMulticab, deleteMulticab } from "../actions";
import { Plus, Trash2 } from "lucide-react";

export default async function MulticabsPage() {
  const multicabs = await getMulticabs();

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Multicabs</h1>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap-reverse' }}>
        <div className="card" style={{ flex: '1', minWidth: '300px' }}>
          <h2 style={{ marginBottom: '1rem' }}>Active Units</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Plate Number</th>
                  <th>Assigned Driver</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {multicabs.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No multicabs found.</td>
                  </tr>
                ) : (
                  multicabs.map((mc) => (
                    <tr key={mc.id}>
                      <td style={{ fontWeight: 500 }}>{mc.plateNumber}</td>
                      <td>{mc.driverName || 'Unassigned'}</td>
                      <td>
                        <span className={`badge ${mc.status === 'Active' ? 'badge-active' : 'badge-maintenance'}`}>
                          {mc.status}
                        </span>
                      </td>
                      <td>
                        <form action={deleteMulticab.bind(null, mc.id)}>
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
          <h2 style={{ marginBottom: '1rem' }}>Add Multicab</h2>
          <form action={addMulticab}>
            <div className="form-group">
              <label>Plate Number</label>
              <input type="text" name="plateNumber" placeholder="ABC 1234" required />
            </div>
            <div className="form-group">
              <label>Driver Name</label>
              <input type="text" name="driverName" placeholder="Juan Dela Cruz" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <Plus size={18} /> Add Unit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
