import React, { useState, useEffect } from 'react';
import { departmentService, Department } from '../services/departmentService';

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newDepartment, setNewDepartment] = useState({ name: '', description: '' });

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const data = await departmentService.getAll();
      setDepartments(data);
      setError('');
    } catch (err) {
      setError('Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await departmentService.create(newDepartment);
      setDepartments([...departments, created]);
      setNewDepartment({ name: '', description: '' });
      setError('');
    } catch (err) {
      setError('Failed to create department');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await departmentService.delete(id);
      setDepartments(departments.filter(dept => dept.id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete department');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="department-list">
      <h2>Departments</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleCreate}>
        <h3>Add New Department</h3>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={newDepartment.name}
            onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={newDepartment.description}
            onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
            required
          />
        </div>
        <button type="submit">Add Department</button>
      </form>

      <div className="departments">
        {departments.map(dept => (
          <div key={dept.id} className="department-item">
            <h3>{dept.name}</h3>
            <p>{dept.description}</p>
            <button onClick={() => handleDelete(dept.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList; 