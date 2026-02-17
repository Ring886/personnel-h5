import service from '../request';
import type { Employee, EmployeeResponse } from '@/types/employee';

export const getEmployeeList = () => {
  return service.get<EmployeeResponse>('/employee/list');
};

export const getEmployeeById = (id: number) => {
  return service.get<EmployeeResponse>(`/employee/${id}`);
};

export const createEmployee = (data: Employee) => {
  return service.post<EmployeeResponse>('/employee/add', data);
};

export const updateEmployee = (data: Employee) => {
  return service.put<EmployeeResponse>('/employee/update', data);
};

export const deleteEmployee = (id: number) => {
  return service.delete<EmployeeResponse>(`/employee/delete/${id}`);
};
