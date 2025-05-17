import React, { useState, useEffect } from 'react';
import { accountService, Account } from '../services/accountService';

const AccountList: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newAccount, setNewAccount] = useState({ username: '', password: '', role: 'user' });

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const data = await accountService.getAll();
      setAccounts(data);
      setError('');
    } catch (err) {
      setError('Failed to load accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await accountService.create(newAccount);
      setAccounts([...accounts, created]);
      setNewAccount({ username: '', password: '', role: 'user' });
      setError('');
    } catch (err) {
      setError('Failed to create account');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await accountService.delete(id);
      setAccounts(accounts.filter(acc => acc.id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete account');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="account-list">
      <h2>Accounts</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleCreate}>
        <h3>Add New Account</h3>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={newAccount.username}
            onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={newAccount.password}
            onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            value={newAccount.role}
            onChange={(e) => setNewAccount({ ...newAccount, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Add Account</button>
      </form>

      <div className="accounts">
        {accounts.map(acc => (
          <div key={acc.id} className="account-item">
            <h3>{acc.username}</h3>
            <p>Role: {acc.role}</p>
            <button onClick={() => handleDelete(acc.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountList; 