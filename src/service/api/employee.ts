import service from '../request';
import type { Employee } from '@/types/employee';
import { EMPLOYEE_URLS } from '../urls';

export const getEmployeeList = () => {
  return service.get(EMPLOYEE_URLS.getEmployeeList);
};

export const getEmployeeDetail = (data: any) => {
  return service.get(EMPLOYEE_URLS.getEmployeeDetail, data);
};

export const createEmployee = (data: Employee) => {
  return service.post(EMPLOYEE_URLS.addEmployee, data);
};

export const updateEmployee = (data: Employee) => {
  return service.post(EMPLOYEE_URLS.updateEmployee, data);
};

export const deleteEmployee = (data: any) => {
  return service.post(EMPLOYEE_URLS.deleteEmployee, data);
};
