import { defineStore } from 'pinia';
import { getEmployeeList } from '@/service/api/employee';
import type { Employee } from '@/types/employee';

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [] as Employee[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchEmployees() {
      this.loading = true;
      this.error = null;
      try {
        const response = await getEmployeeList();
        if (response.data && response.data.code === 200) {
          this.employees = response.data.data;
        } else {
          this.error = response.data.message || '获取员工列表失败';
        }
      } catch (err: any) {
        this.error = err.message || '网络错误';
      } finally {
        this.loading = false;
      }
    },
  },
});
