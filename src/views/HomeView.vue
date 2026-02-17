<script setup lang="ts">
import { onMounted } from 'vue';
import { useEmployeeStore } from '@/store/employee';
import { storeToRefs } from 'pinia';
import { formatDate } from '@/utils/formatDate';

const employeeStore = useEmployeeStore();
const { employees, loading, error } = storeToRefs(employeeStore);

onMounted(() => {
  employeeStore.fetchEmployees();
});

const handleRefresh = () => {
  employeeStore.fetchEmployees();
};
</script>

<template>
  <div class="container">
    <header>
      <h1>👨‍💼 人员管理系统</h1>
      <button @click="handleRefresh" class="refresh-btn">🔄 刷新列表</button>
    </header>

    <div v-if="loading" class="status-box">
      <div class="loader"></div>
      <p>正在从数据库读取数据...</p>
    </div>

    <div v-else-if="error" class="error-box">
      ⚠️ {{ error }}
    </div>

    <div v-else class="card-grid">
      <div v-for="emp in employees" :key="emp.id" class="card">
        <div class="card-header">
          <span class="avatar">{{ emp.name.charAt(0) }}</span>
          <div>
            <h3>{{ emp.name }}</h3>
            <span class="job-title">{{ emp.jobTitle || '暂无职位' }}</span>
          </div>
        </div>
        
        <div class="card-body">
          <p><strong>工号:</strong> {{ emp.workId }}</p>
          <p><strong>性别:</strong> {{ emp.gender === 'M' ? '男 🚹' : '女 🚺' }}</p>
          <p><strong>入职:</strong> {{ emp.hireDate ? formatDate(emp.hireDate) : '未知' }}</p>
        </div>
      </div>
    </div>
    
    <div v-if="!loading && !error && employees.length === 0" class="empty-box">
      📭 暂无员工数据，快去数据库添加一条吧！
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
  padding-bottom: 20px;
}

h1 {
  color: #2c3e50;
  margin: 0;
}

/* --- 刷新按钮 --- */
.refresh-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.refresh-btn:hover {
  background-color: #3aa876;
}

/* --- 状态提示 --- */
.status-box, .error-box, .empty-box {
  text-align: center;
  padding: 40px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
}

.error-box {
  background: #fff0f0;
  color: #d8000c;
  border: 1px solid #ffbaba;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* --- 卡片网格 --- */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

/* --- 卡片样式 --- */
.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #eee;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.15);
}

.card-header {
  background: #f8f9fa;
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.avatar {
  width: 50px;
  height: 50px;
  background: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin-right: 15px;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  color: #2c3e50;
}

.job-title {
  font-size: 14px;
  color: #7f8c8d;
}

.card-body {
  padding: 15px;
}

.card-body p {
  margin: 8px 0;
  font-size: 14px;
  color: #555;
}

.card-body strong {
  color: #333;
}
</style>
