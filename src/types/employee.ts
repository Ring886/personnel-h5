export interface Employee {
  id?: number;
  workId: string;
  name: string;
  jobTitle?: string;
  gender: 'M' | 'F';
  hireDate?: string;
}

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export type EmployeeListResponse = ApiResponse<Employee[]>;
export type EmployeeDetailResponse = ApiResponse<Employee>;
