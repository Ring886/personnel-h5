<script setup lang="ts">
import { useEmployeeStore } from '@/store/employee';
import { formatDate } from '@/utils/formatDate';
import { useTheme } from '@/composables/useTheme';

const router = useRouter();
const employeeStore = useEmployeeStore();
// Use storeToRefs for state properties to keep reactivity
const { employees, loading, error } = storeToRefs(employeeStore);
const { isDark, toggleTheme } = useTheme();

onMounted(() => {
  // Always fetch fresh data when mounting to ensure updates are reflected
  employeeStore.fetchEmployees();
});

const handleRefresh = () => {
  employeeStore.fetchEmployees();
};

const navigateToAdd = () => {
  router.push('/add');
};

const navigateToEdit = (id?: number) => {
  if (id) {
    router.push(`/edit/${id}`);
  }
};

const handleDelete = async (id?: number, name?: string) => {
  if (!id) return;
  
  if (window.confirm(`确定要删除员工 "${name || '未知'}" 吗？此操作不可恢复。`)) {
    const success = await employeeStore.removeEmployee(id);
    if (success) {
      // Optional: show a toast notification
    } else {
      alert(employeeStore.error || '删除失败');
    }
  }
};
</script>

<template>
  <div class="container">
    <header class="app-header">
      <div class="header-left">
        <h1>人员管理</h1>
      </div>
      <div class="header-right">
        <button @click="toggleTheme" class="icon-btn" :title="isDark ? '切换亮色' : '切换暗色'">
          {{ isDark ? '🌞' : '🌙' }}
        </button>
        <button @click="handleRefresh" class="icon-btn refresh-btn" :title="'刷新列表'" :disabled="loading">
          🔄
        </button>
        <button @click="navigateToAdd" class="primary-btn add-btn">
          + 新增
        </button>
      </div>
    </header>

    <main class="content">
      <!-- Loading State -->
      <div v-if="loading && employees.length === 0" class="loading-state">
        <div class="spinner"></div>
        <p>正在加载数据...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <div class="error-icon">⚠️</div>
        <p>{{ error }}</p>
        <button @click="handleRefresh" class="retry-btn">重试</button>
      </div>

      <!-- List State -->
      <div v-else class="employee-list">
        <div v-for="emp in employees" :key="emp.id" class="employee-card">
          <div class="card-content" @click="navigateToEdit(emp.id)">
            <div class="card-left">
              <div class="avatar" :class="{ 'female': emp.gender === 'F' }">
                {{ emp.name.charAt(0) }}
              </div>
            </div>
            <div class="card-right">
              <div class="card-header">
                <h3 class="name">{{ emp.name }}</h3>
                <span class="job-tag">{{ emp.jobTitle || '无职位' }}</span>
              </div>
              <div class="card-info">
                <span class="info-item">🆔 {{ emp.workId }}</span>
                <span class="info-item">📅 {{ emp.hireDate ? formatDate(emp.hireDate) : '--' }}</span>
              </div>
            </div>
          </div>
          <div class="card-actions">
            <button class="action-btn edit-btn" @click.stop="navigateToEdit(emp.id)">
              ✏️ 编辑
            </button>
            <button class="action-btn delete-btn" @click.stop="handleDelete(emp.id, emp.name)">
              🗑️ 删除
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !error && employees.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <p>暂无数据</p>
        <button @click="navigateToAdd" class="primary-btn">立即添加</button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.container {
  padding: 0 16px;
  padding-bottom: 80px; /* Space for FAB if we had one, or just bottom spacing */
  max-width: 800px;
  margin: 0 auto;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  background-color: var(--color-bg);
  /* Glassmorphism effect */
  background: rgba(var(--color-bg-rgb), 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 16px;
}

.header-right {
  display: flex;
  gap: 12px;
  align-items: center;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover {
  background-color: var(--color-hover);
}

.primary-btn {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.primary-btn:hover {
  opacity: 0.9;
}

.employee-list {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.employee-card {
  background: var(--color-surface);
  border-radius: var(--card-radius);
  box-shadow: 0 4px 12px var(--color-shadow);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.employee-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--color-shadow);
}

.card-content {
  display: flex;
  padding: 16px;
  cursor: pointer;
}

.card-left {
  margin-right: 16px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}

.avatar.female {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
}

.card-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.name {
  margin: 0;
  font-size: 18px;
  color: var(--color-text-primary);
}

.job-tag {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.card-info {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.card-actions {
  display: flex;
  border-top: 1px solid var(--color-border);
}

.action-btn {
  flex: 1;
  background: none;
  border: none;
  padding: 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: var(--color-text-secondary);
}

.action-btn:first-child {
  border-right: 1px solid var(--color-border);
}

.edit-btn:hover {
  background-color: var(--color-hover);
  color: var(--color-primary);
}

.delete-btn:hover {
  background-color: #fff1f0;
  color: #ff4d4f;
}

[data-theme='dark'] .delete-btn:hover {
  background-color: rgba(255, 77, 79, 0.1);
}

/* Loading & Error States */
.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  color: var(--color-text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-icon, .empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.retry-btn {
  margin-top: 16px;
  padding: 8px 24px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
</style>
