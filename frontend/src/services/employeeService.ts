import api from './api';

export interface Employee {
  id: string;
  account_id: string;
  department_id: string;
  position: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

export const employeeService = {
  // Get all employees
  getAll: async (): Promise<Employee[]> => {
    const response = await api.get('/employees');
    return response.data as Employee[];
  },

  // Get employee by ID
  getById: async (id: string): Promise<Employee> => {
    const response = await api.get(`/employees/${id}`);
    return response.data as Employee;
  },

  // Create new employee
  create: async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
    const response = await api.post('/employees', employee);
    return response.data as Employee;
  },

  // Update employee
  update: async (id: string, employee: Partial<Employee>): Promise<Employee> => {
    const response = await api.put(`/employees/${id}`, employee);
    return response.data as Employee;
  },

  // Delete employee
  delete: async (id: string): Promise<void> => {
    await api.delete(`/employees/${id}`);
  },

  // Get employees by department
  getByDepartment: async (departmentId: string): Promise<Employee[]> => {
    const response = await api.get(`/employees/department/${departmentId}`);
    return response.data as Employee[];
  },
}; 