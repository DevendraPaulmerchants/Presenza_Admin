/**
 * API Service Usage Examples
 *
 * This file shows how to use the generic API service across your application
 */

import { apiCall, apiGet, apiPost, apiPut, apiDelete, apiPatch } from './api';

// ===== EXAMPLE 1: GET Request =====
// Fetch all employees
export const getAllEmployees = async (path) => {
  return await apiGet(path);
};

// Fetch employee with auth token
export const getEmployeeById = async (employeeId) => {
  return await apiGet(`/employees/${employeeId}`);
};
export const getTarackById = async (employeeId) => {
  return await apiGet(`/activities/top?employeeId=${employeeId}`);
};
export const getWindowUsedByEmp = async (empId) => {
  return await apiGet(`/activities?employeeId=${empId}`);
};
// ===== EXAMPLE 2: POST Request =====
// Create a new employee
export const createEmployee = async (employeeData, token) => {
  return await apiPost('/employees', employeeData, token);
};

// ===== EXAMPLE 3: PUT Request =====
// Update entire employee record
export const updateEmployee = async (employeeId, employeeData, token) => {
  return await apiPut(`/employees/${employeeId}`, employeeData, token);
};

// ===== EXAMPLE 4: PATCH Request =====
// Update specific fields
export const updateEmployeeStatus = async (employeeId, statusData, token) => {
  return await apiPatch(`/employees/${employeeId}`, statusData, token);
};

// ===== EXAMPLE 5: DELETE Request =====
// Delete an employee
export const deleteEmployee = async (employeeId, token) => {
  return await apiDelete(`/employees/${employeeId}`, token);
};

// ===== EXAMPLE 6: Generic API Call with Custom Headers =====
export const uploadEmployeeFile = async (employeeId, file, token) => {
  const formData = new FormData();
  formData.append('file', file);

  return await apiCall({
    endpoint: `/employees/${employeeId}/upload`,
    method: 'POST',
    payload: formData,
    token,
    headers: {
      // Don't set Content-Type for FormData - browser will set it automatically
    },
  });
};
