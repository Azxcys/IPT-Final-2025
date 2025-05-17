import { Request, Response, NextFunction } from 'express';
import pool from '../config/database';
import { v4 as uuidv4 } from 'uuid';
import { QueryError, RowDataPacket } from 'mysql2';

interface EmployeeRow extends RowDataPacket {
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
    pool.query<EmployeeRow[]>(`
      SELECT e.*, a.username, d.name as department_name 
      FROM employees e
      LEFT JOIN accounts a ON e.account_id = a.id
      LEFT JOIN departments d ON e.department_id = d.id
    `, (error: QueryError | null, rows: EmployeeRow[]) => {
      if (error) {
        next(error);
        return;
      }
      res.json(rows);
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    pool.query<EmployeeRow[]>(`
      SELECT e.*, a.username, d.name as department_name 
      FROM employees e
      LEFT JOIN accounts a ON e.account_id = a.id
      LEFT JOIN departments d ON e.department_id = d.id
      WHERE e.id = ?
    `, [id], (error: QueryError | null, rows: EmployeeRow[]) => {
      if (error) {
        next(error);
        return;
      }
      if (rows.length === 0) {
        res.status(404).json({ message: 'Employee not found' });
        return;
      }
      res.json(rows[0]);
    });
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

    pool.query(
      `INSERT INTO employees (
        id, account_id, department_id, position, 
        first_name, last_name, email, phone, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, account_id, department_id, position, first_name, last_name, email, phone, status],
      (error: QueryError | null) => {
        if (error) {
          next(error);
          return;
        }
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
      }
    );
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

    pool.query<EmployeeRow[]>(
      'SELECT id FROM employees WHERE id = ?',
      [id],
      (error: QueryError | null, existing: EmployeeRow[]) => {
        if (error) {
          next(error);
          return;
        }
        if (existing.length === 0) {
          res.status(404).json({ message: 'Employee not found' });
          return;
        }

        pool.query(
          `UPDATE employees 
           SET department_id = ?, position = ?, first_name = ?, 
               last_name = ?, email = ?, phone = ?, status = ?
           WHERE id = ?`,
          [department_id, position, first_name, last_name, email, phone, status, id],
          (error: QueryError | null) => {
            if (error) {
              next(error);
              return;
            }
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
          }
        );
      }
    );
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    pool.query('DELETE FROM employees WHERE id = ?', [id], (error: QueryError | null) => {
      if (error) {
        next(error);
        return;
      }
      res.json({ message: 'Employee deleted successfully' });
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployeesByDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { departmentId } = req.params;
    pool.query<EmployeeRow[]>(`
      SELECT e.*, a.username 
      FROM employees e
      LEFT JOIN accounts a ON e.account_id = a.id
      WHERE e.department_id = ?
    `, [departmentId], (error: QueryError | null, rows: EmployeeRow[]) => {
      if (error) {
        next(error);
        return;
      }
      res.json(rows);
    });
  } catch (error) {
    next(error);
  }
}; 