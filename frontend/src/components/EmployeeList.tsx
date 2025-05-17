import React, { useState, useEffect } from 'react';
import { employeeService, Employee } from '../services/employeeService';
import { departmentService, Department } from '../services/departmentService';
import { accountService, Account } from '../services/accountService';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [newEmployee, setNewEmployee] = useState({
    account_id: '',
    department_id: '',
    position: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    status: 'active' as 'active' | 'inactive'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [employeesData, departmentsData, accountsData] = await Promise.all([
        employeeService.getAll(),
        departmentService.getAll(),
        accountService.getAll()
      ]);
      setEmployees(employeesData);
      setDepartments(departmentsData);
      setAccounts(accountsData);
      setError('');
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await employeeService.create(newEmployee);
      setEmployees([...employees, created]);
      setNewEmployee({
        account_id: '',
        department_id: '',
        position: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        status: 'active'
      });
      setError('');
    } catch (err) {
      setError('Failed to create employee');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEmployee) return;
    
    try {
      const updated = await employeeService.update(editingEmployee.id, editingEmployee);
      setEmployees(employees.map(emp => emp.id === updated.id ? updated : emp));
      setEditingEmployee(null);
      setError('');
    } catch (err) {
      setError('Failed to update employee');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeService.delete(id);
        setEmployees(employees.filter(emp => emp.id !== id));
        setError('');
      } catch (err) {
        setError('Failed to delete employee');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="employee-list">
      <h2>Employees</h2>
      {error && <div className="error">{error}</div>}
      
      {editingEmployee ? (
        <form onSubmit={handleUpdate}>
          <h3>Edit Employee</h3>
          <div>
            <label>Department:</label>
            <select
              value={editingEmployee.department_id}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, department_id: e.target.value })}
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Position:</label>
            <input
              type="text"
              value={editingEmployee.position}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
              required
            />
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              value={editingEmployee.first_name}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, first_name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              value={editingEmployee.last_name}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, last_name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={editingEmployee.email}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="tel"
              value={editingEmployee.phone}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, phone: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              value={editingEmployee.status}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, status: e.target.value as 'active' | 'inactive' })}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button type="submit">Update Employee</button>
          <button type="button" onClick={() => setEditingEmployee(null)}>Cancel</button>
        </form>
      ) : (
        <form onSubmit={handleCreate}>
          <h3>Add New Employee</h3>
          <div>
            <label>Account:</label>
            <select
              value={newEmployee.account_id}
              onChange={(e) => setNewEmployee({ ...newEmployee, account_id: e.target.value })}
              required
            >
              <option value="">Select Account</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>
                  {acc.username}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Department:</label>
            <select
              value={newEmployee.department_id}
              onChange={(e) => setNewEmployee({ ...newEmployee, department_id: e.target.value })}
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Position:</label>
            <input
              type="text"
              value={newEmployee.position}
              onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
              required
            />
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              value={newEmployee.first_name}
              onChange={(e) => setNewEmployee({ ...newEmployee, first_name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              value={newEmployee.last_name}
              onChange={(e) => setNewEmployee({ ...newEmployee, last_name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="tel"
              value={newEmployee.phone}
              onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              value={newEmployee.status}
              onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value as 'active' | 'inactive' })}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button type="submit">Add Employee</button>
        </form>
      )}

      <div className="employees">
        {employees.map(emp => (
          <div key={emp.id} className="employee-item">
            <h3>{emp.first_name} {emp.last_name}</h3>
            <p>Position: {emp.position}</p>
            <p>Email: {emp.email}</p>
            <p>Phone: {emp.phone}</p>
            <p>Status: <span className={`status-badge status-${emp.status}`}>{emp.status}</span></p>
            <button onClick={() => setEditingEmployee(emp)}>Edit</button>
            <button onClick={() => handleDelete(emp.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList; 