import api from './api';

export interface Account {
  id: number;
  username: string;
  password: string;
  role: string;
}

export const accountService = {
  // Get all accounts
  getAll: async (): Promise<Account[]> => {
    const response = await api.get('/accounts');
    return response.data as Account[];
  },

  // Get account by ID
  getById: async (id: number): Promise<Account> => {
    const response = await api.get(`/accounts/${id}`);
    return response.data as Account;
  },

  // Create new account
  create: async (account: Omit<Account, 'id'>): Promise<Account> => {
    const response = await api.post('/accounts', account);
    return response.data as Account;
  },

  // Update account
  update: async (id: number, account: Partial<Account>): Promise<Account> => {
    const response = await api.put(`/accounts/${id}`, account);
    return response.data as Account;
  },

  // Delete account
  delete: async (id: number): Promise<void> => {
    await api.delete(`/accounts/${id}`);
  },

  // Login
  login: async (username: string, password: string): Promise<{ token: string; account: Account }> => {
    const response = await api.post('/accounts/login', { username, password });
    return response.data as { token: string; account: Account };
  },
}; 