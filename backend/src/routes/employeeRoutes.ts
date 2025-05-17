import express from 'express';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeesByDepartment
} from '../controllers/employeeController';

const router = express.Router();

// Base route
router.get('/', getEmployees);

// Department specific route (must come before :id route)
router.get('/department/:departmentId', getEmployeesByDepartment);

// ID specific routes
router.get('/:id', getEmployeeById);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router; 