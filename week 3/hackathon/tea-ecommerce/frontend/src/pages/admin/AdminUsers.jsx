import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers, blockUnblockUser, changeUserRole } from '../../api/admin';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleBlockUnblock = async (userId) => {
    try {
      const res = await blockUnblockUser(userId);
      setUsers((prev) =>
        prev.map((u) => u._id === userId ? { ...u, isBlocked: res.data.user.isBlocked } : u)
      );
    } catch (err) {
      alert('Error updating user');
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      const res = await changeUserRole(userId, role);
      setUsers((prev) =>
        prev.map((u) => u._id === userId ? { ...u, role: res.data.user.role } : u)
      );
    } catch (err) {
      alert('Error changing role');
    }
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 48px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <Link to="/admin" style={{ fontSize: '0.8rem', color: '#888', textDecoration: 'none' }}>← Dashboard</Link>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#1a1a1a', fontWeight: 'normal', margin: 0 }}>
            Users Management
          </h1>
        </div>

        <div style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
          {loading ? (
            <p style={{ padding: '32px', textAlign: 'center', color: '#aaa' }}>Loading...</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9f9f9' }}>
                  {['Name', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map((h) => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.72rem', letterSpacing: '0.08em', color: '#888', fontWeight: '600', borderBottom: '1px solid #eee' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '14px 16px', fontSize: '0.82rem', color: '#333' }}>{user.name}</td>
                    <td style={{ padding: '14px 16px', fontSize: '0.78rem', color: '#888' }}>{user.email}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem',
                        backgroundColor: user.role === 'superadmin' ? '#fce7f3' : user.role === 'admin' ? '#e3f2fd' : '#f5f5f5',
                        color: user.role === 'superadmin' ? '#db2777' : user.role === 'admin' ? '#3b82f6' : '#888',
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem',
                        backgroundColor: user.isBlocked ? '#fff1f2' : '#f0fdf4',
                        color: user.isBlocked ? '#ef4444' : '#16a34a',
                      }}>
                        {user.isBlocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '0.78rem', color: '#888' }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {/* Block/Unblock — available to admin and superadmin */}
                        {user.role !== 'superadmin' && (
                          <button
                            onClick={() => handleBlockUnblock(user._id)}
                            style={{
                              background: 'none',
                              border: `1px solid ${user.isBlocked ? '#c6f6d5' : '#fed7d7'}`,
                              color: user.isBlocked ? '#16a34a' : '#e53e3e',
                              padding: '4px 12px', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '4px',
                            }}
                          >
                            {user.isBlocked ? 'Unblock' : 'Block'}
                          </button>
                        )}

                        {/* Role change — only superadmin */}
                        {currentUser?.role === 'superadmin' && user.role !== 'superadmin' && (
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                            style={{ border: '1px solid #ddd', padding: '4px 8px', fontSize: '0.75rem', color: '#333', outline: 'none', cursor: 'pointer', borderRadius: '4px' }}
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;