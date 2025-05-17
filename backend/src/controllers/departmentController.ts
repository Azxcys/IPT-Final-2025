import { Request, Response } from 'express';
import pool from '../config/database';
import { v4 as uuidv4 } from 'uuid';
import { QueryError, RowDataPacket } from 'mysql2';

interface DepartmentRow extends RowDataPacket {
  id: string;
  name: string;
  description: string;
}

export const getDepartments = async (req: Request, res: Response) => {
  try {
    pool.query<DepartmentRow[]>('SELECT * FROM departments', (error: QueryError | null, rows: DepartmentRow[]) => {
      if (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ message: 'Error fetching departments' });
        return;
      }
      res.json(rows);
    });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Error fetching departments' });
  }
};

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const id = uuidv4();

    pool.query(
      'INSERT INTO departments (id, name, description) VALUES (?, ?, ?)',
      [id, name, description],
      (error: QueryError | null) => {
        if (error) {
          console.error('Error creating department:', error);
          res.status(500).json({ message: 'Error creating department' });
          return;
        }
        res.status(201).json({ id, name, description });
      }
    );
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ message: 'Error creating department' });
  }
};

export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    pool.query(
      'UPDATE departments SET name = ?, description = ? WHERE id = ?',
      [name, description, id],
      (error: QueryError | null) => {
        if (error) {
          console.error('Error updating department:', error);
          res.status(500).json({ message: 'Error updating department' });
          return;
        }
        res.json({ id, name, description });
      }
    );
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ message: 'Error updating department' });
  }
};

export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    pool.query('DELETE FROM departments WHERE id = ?', [id], (error: QueryError | null) => {
      if (error) {
        console.error('Error deleting department:', error);
        res.status(500).json({ message: 'Error deleting department' });
        return;
      }
      res.json({ message: 'Department deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ message: 'Error deleting department' });
  }
}; 