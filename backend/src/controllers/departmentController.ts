import { Request, Response } from 'express';
import pool from '../config/database';
import { v4 as uuidv4 } from 'uuid';

interface Department {
  id: string;
  name: string;
  description: string;
}

export const getDepartments = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM departments');
    const departments = rows as Department[];
    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Error fetching departments' });
  }
};

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const id = uuidv4();

    await pool.execute(
      'INSERT INTO departments (id, name, description) VALUES (?, ?, ?)',
      [id, name, description]
    );

    res.status(201).json({ id, name, description });
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ message: 'Error creating department' });
  }
};

export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    await pool.execute(
      'UPDATE departments SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );

    res.json({ id, name, description });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ message: 'Error updating department' });
  }
};

export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.execute('DELETE FROM departments WHERE id = ?', [id]);
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ message: 'Error deleting department' });
  }
}; 