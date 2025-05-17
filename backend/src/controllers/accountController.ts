import { Request, Response } from 'express';
import pool from '../config/database';
import { v4 as uuidv4 } from 'uuid';
import { RowDataPacket } from 'mysql2';

interface AccountRow extends RowDataPacket {
  id: string;
  username: string;
  password: string;
  role: string;
  status: string;
}

export const getAccounts = async (req: Request, res: Response) => {
  try {
    pool.query<AccountRow[]>('SELECT * FROM accounts', (error, rows) => {
      if (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({ message: 'Error fetching accounts' });
        return;
      }
      res.json(rows);
    });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ message: 'Error fetching accounts' });
  }
};

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { username, password, role, status } = req.body;
    const id = uuidv4();

    pool.query(
      'INSERT INTO accounts (id, username, password, role, status) VALUES (?, ?, ?, ?, ?)',
      [id, username, password, role, status],
      (error) => {
        if (error) {
          console.error('Error creating account:', error);
          res.status(500).json({ message: 'Error creating account' });
          return;
        }
        res.status(201).json({ id, username, role, status });
      }
    );
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Error creating account' });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password, role, status } = req.body;

    pool.query(
      'UPDATE accounts SET username = ?, password = ?, role = ?, status = ? WHERE id = ?',
      [username, password, role, status, id],
      (error) => {
        if (error) {
          console.error('Error updating account:', error);
          res.status(500).json({ message: 'Error updating account' });
          return;
        }
        res.json({ id, username, role, status });
      }
    );
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({ message: 'Error updating account' });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    pool.query('DELETE FROM accounts WHERE id = ?', [id], (error) => {
      if (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ message: 'Error deleting account' });
        return;
      }
      res.json({ message: 'Account deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Error deleting account' });
  }
}; 