export interface Employee {
  id?: number;
  workId: string;
  name: string;
  jobTitle?: string;
  gender: 'M' | 'F';
  hireDate?: string;
}

export interface EmployeeResponse {
  code: number;
  message: string;
  data: Employee[];
}
