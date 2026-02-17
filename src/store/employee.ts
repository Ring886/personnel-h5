// No imports needed due to auto-import (vue, pinia)
import { 
  getEmployeeList, 
  getEmployeeDetail, 
  createEmployee, 
  updateEmployee, 
  deleteEmployee 
} from '@/service/api/employee';
import type { Employee } from '@/types/employee';

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [] as Employee[],
    currentEmployee: null as Employee | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchEmployees() {
      this.loading = true;
      this.error = null;
      
      const minDelay = new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        const [response] = await Promise.all([
          getEmployeeList(),
          minDelay
        ]);
        
        if (response.data && response.data.code === 200) {
          this.employees = response.data.data;
        } else {
          this.error = response.data.message || '获取员工列表失败';
        }
      } catch (err: any) {
        try { await minDelay; } catch (e) {}
        this.error = err.message || '网络错误';
      } finally {
        this.loading = false;
      }
    },

    async fetchEmployeeById(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const response = await getEmployeeDetail({ id });
        if (response.data && response.data.code === 200) {
          this.currentEmployee = response.data.data;
        } else {
          this.error = response.data.message || '获取员工详情失败';
        }
      } catch (err: any) {
        this.error = err.message || '网络错误';
      } finally {
        this.loading = false;
      }
    },

    async addEmployee(employee: Employee) {
      this.loading = true;
      this.error = null;
      try {
        const response = await createEmployee(employee);
        if (response.data && response.data.code === 200) {
          // Ideally, we should fetch the list again or push the new employee
          // await this.fetchEmployees();
          return true;
        } else {
          this.error = response.data.message || '添加员工失败';
          return false;
        }
      } catch (err: any) {
        this.error = err.message || '网络错误';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async editEmployee(employee: Employee) {
      this.loading = true;
      this.error = null;
      try {
        const response = await updateEmployee(employee);
        if (response.data && response.data.code === 200) {
          return true;
        } else {
          this.error = response.data.message || '更新员工失败';
          return false;
        }
      } catch (err: any) {
        this.error = err.message || '网络错误';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async removeEmployee(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const response = await deleteEmployee({ id });
        if (response.data && response.data.code === 200) {
          this.employees = this.employees.filter(emp => emp.id !== id);
          return true;
        } else {
          this.error = response.data.message || '删除员工失败';
          return false;
        }
      } catch (err: any) {
        this.error = err.message || '网络错误';
        return false;
      } finally {
        this.loading = false;
      }
    }
  },
});
