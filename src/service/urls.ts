// 使用 /api 前缀触发 vite.config.ts 中的代理配置，解决本地开发的跨域问题
// 生产环境或自定义域名时，可修改为 'https://www.ringsora.com' 等
export const BASE_URL = '/api';

export const EMPLOYEE_URLS = {
  getEmployeeList: `${BASE_URL}/employee/list`,
  getEmployeeDetail: `${BASE_URL}/employee/detail`,
  addEmployee: `${BASE_URL}/employee/add`,
  updateEmployee: `${BASE_URL}/employee/update`,
  deleteEmployee: `${BASE_URL}/employee/delete`
};
