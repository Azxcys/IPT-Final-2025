import api from './api';

export interface Department {
  id: number;
  name: string;
  description: string;
}

export const departmentService = {
  // Get all departments
  getAll: async (): Promise<Department[]> => {
    const response = await api.get('/departments');
    return response.data as Department[];
  },

  // Get department by ID
  getById: async (id: number): Promise<Department> => {
    const response = await api.get(`/departments/${id}`);
    return response.data as Department;
  },

  // Create new department
  create: async (department: Omit<Department, 'id'>): Promise<Department> => {
    const response = await api.post('/departments', department);
    return response.data as Department;
  },

  // Update department
  update: async (id: number, department: Partial<Department>): Promise<Department> => {
    const response = await api.put(`/departments/${id}`, department);
    return response.data as Department;
  },

  // Delete department
  delete: async (id: number): Promise<void> => {
    await api.delete(`/departments/${id}`);
  },
}; 