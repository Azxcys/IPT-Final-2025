import { Request, Response, NextFunction } from 'express';
import pool from '../config/database';
import { v4 as uuidv4 } from 'uuid';

interface Employee {
  id: string;
  account_id: string;
  department_id: string;
  position: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  username?: string;
  department_name?: string;
}

export const getEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [rows] = await pool.execute(`
      SELECT e.*, a.username, d.name as department_name 
      FROM employees e
      LEFT JOIN accounts a ON e.account_id = a.id
      LEFT JOIN departments d ON e.department_id = d.id
    `);
    const employees = rows as Employee[];
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(`
      SELECT e.*, a.username, d.name as department_name 
      FROM employees e
      LEFT JOIN accounts a ON e.account_id = a.id
      LEFT JOIN departments d ON e.department_id = d.id
      WHERE e.id = ?
    `, [id]);
    
    const employees = rows as Employee[];
    if (employees.length === 0) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    
    res.json(employees[0]);
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      account_id,
      department_id,
      position,
      first_name,
      last_name,
      email,
      phone,
      status
    } = req.body;

    const id = uuidv4();

    await pool.execute(
      `INSERT INTO employees (
        id, account_id, department_id, position, 
        first_name, last_name, email, phone, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, account_id, department_id, position, first_name, last_name, email, phone, status]
    );

    res.status(201).json({
      id,
      account_id,
      department_id,
      position,
      first_name,
      last_name,
      email,
      phone,
      status
    });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      department_id,
      position,
      first_name,
      last_name,
      email,
      phone,
      status
    } = req.body;

    // Check if employee exists
    const [existing] = await pool.execute('SELECT id FROM employees WHERE id = ?', [id]);
    const existingEmployees = existing as Employee[];
    if (existingEmployees.length === 0) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    await pool.execute(
      `UPDATE employees 
       SET department_id = ?, position = ?, first_name = ?, 
           last_name = ?, email = ?, phone = ?, status = ?
       WHERE id = ?`,
      [department_id, position, first_name, last_name, email, phone, status, id]
    );

    res.json({
      id,
      department_id,
      position,
      first_name,
      last_name,
      email,
      phone,
      status
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await pool.execute('DELETE FROM employees WHERE id = ?', [id]);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getEmployeesByDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { departmentId } = req.params;
    const [rows] = await pool.execute(`
      SELECT e.*, a.username 
      FROM employees e
      LEFT JOIN accounts a ON e.account_id = a.id
      WHERE e.department_id = ?
    `, [departmentId]);
    const employees = rows as Employee[];
    res.json(employees);
  } catch (error) {
    next(error);
  }
}; 