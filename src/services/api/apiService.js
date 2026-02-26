import { apiCall, apiGet, apiPost, apiPut, apiDelete, apiPatch } from './api';

// Fetch all employees
export const getAllEmployees = async (path) => {
  return await apiGet(path);
};

// Fetch All employee List
export const getEmployeeById = async (employeeId) => {
  return await apiGet(`/employees/${employeeId}`);
};
// Fetch All Emp Attendence default for Today
export const getEmpAttendence= async (path)=>{
  return await apiGet(path)
}
// Fetch Attendence base on date
export const getEmpAttendenceBaseOndate= async (date)=>{
  return await apiGet(`/attendance/${date}`)
}
// Fetch Top Application Used By Particuler Employee
export const getTarackById = async (employeeId) => {
  return await apiGet(`/activities/top?employeeId=${employeeId}`);
};
// Fetch Windows tiles used by Particuler Employee
export const getWindowUsedByEmp = async (empId) => {
  return await apiGet(`/activities?employeeId=${empId}`);
};


// Create a new employee
export const createEmployee = async (employeeData, token) => {
  return await apiPost('/employees', employeeData, token);
};


// Update entire employee record
export const updateEmployee = async (employeeId, employeeData, token) => {
  return await apiPut(`/employees/${employeeId}`, employeeData, token);
};


// Update specific fields
export const updateEmployeeStatus = async (employeeId, statusData, token) => {
  return await apiPatch(`/employees/${employeeId}`, statusData, token);
};


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
