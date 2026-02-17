<script setup lang="ts">
// No imports needed due to auto-import (vue, vue-router, pinia)
import { useEmployeeStore } from '@/store/employee';
import type { Employee } from '@/types/employee';

const route = useRoute();
const router = useRouter();
const employeeStore = useEmployeeStore();

const isEdit = computed(() => route.params.id !== undefined);
const formTitle = computed(() => isEdit.value ? '编辑员工' : '新增员工');

const formData = reactive<Employee>({
  workId: '',
  name: '',
  jobTitle: '',
  gender: 'M',
  hireDate: '',
});

const loading = ref(false);
const errorMsg = ref('');

onMounted(async () => {
  if (isEdit.value) {
    const id = Number(route.params.id);
    await employeeStore.fetchEmployeeById(id);
    if (employeeStore.currentEmployee) {
      const { workId, name, jobTitle, gender, hireDate, id: empId } = employeeStore.currentEmployee;
      formData.id = empId;
      formData.workId = workId;
      formData.name = name;
      formData.jobTitle = jobTitle;
      formData.gender = gender;
      // Ensure date format YYYY-MM-DD
      formData.hireDate = hireDate ? hireDate.split('T')[0] : '';
    }
  }
});

const handleSubmit = async () => {
  if (!formData.workId || !formData.name) {
    errorMsg.value = '请填写必填项';
    return;
  }

  loading.value = true;
  let success = false;

  if (isEdit.value) {
    success = await employeeStore.editEmployee(formData);
  } else {
    success = await employeeStore.addEmployee(formData);
  }

  loading.value = false;

  if (success) {
    router.push('/');
  } else {
    errorMsg.value = employeeStore.error || '操作失败';
  }
};

const handleCancel = () => {
  router.back();
};
</script>

<template>
  <div class="form-container">
    <div class="form-header">
      <h2>{{ formTitle }}</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="employee-form">
      <div class="form-group">
        <label for="workId">工号 <span class="required">*</span></label>
        <input 
          id="workId" 
          v-model="formData.workId" 
          type="text" 
          placeholder="请输入工号"
          :disabled="isEdit"
          required
        />
      </div>

      <div class="form-group">
        <label for="name">姓名 <span class="required">*</span></label>
        <input 
          id="name" 
          v-model="formData.name" 
          type="text" 
          placeholder="请输入姓名"
          required
        />
      </div>

      <div class="form-group">
        <label for="jobTitle">职位</label>
        <input 
          id="jobTitle" 
          v-model="formData.jobTitle" 
          type="text" 
          placeholder="请输入职位"
        />
      </div>

      <div class="form-group">
        <label>性别</label>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" v-model="formData.gender" value="M" />
            <span>男 🚹</span>
          </label>
          <label class="radio-label">
            <input type="radio" v-model="formData.gender" value="F" />
            <span>女 🚺</span>
          </label>
        </div>
      </div>

      <div class="form-group">
        <label for="hireDate">入职日期</label>
        <input 
          id="hireDate" 
          v-model="formData.hireDate" 
          type="date" 
        />
      </div>

      <div v-if="errorMsg" class="error-message">
        {{ errorMsg }}
      </div>

      <div class="form-actions">
        <button type="button" @click="handleCancel" class="btn-cancel">取消</button>
        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? '提交中...' : '提交' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--color-bg);
  min-height: 100vh;
}

.form-header {
  margin-bottom: 24px;
  text-align: center;
}

.form-header h2 {
  color: var(--color-text-primary);
}

.employee-form {
  background: var(--color-surface);
  padding: 24px;
  border-radius: var(--card-radius);
  box-shadow: 0 4px 12px var(--color-shadow);
  border: 1px solid var(--color-border);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.required {
  color: #ff4d4f;
}

input[type="text"],
input[type="date"] {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--btn-radius);
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-size: 16px;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="date"]:focus {
  outline: none;
  border-color: var(--color-primary);
}

input:disabled {
  background-color: var(--color-border);
  cursor: not-allowed;
  opacity: 0.7;
}

.radio-group {
  display: flex;
  gap: 20px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: var(--color-text-primary);
}

.error-message {
  color: #ff4d4f;
  margin-bottom: 16px;
  text-align: center;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;
}

.form-actions button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: var(--btn-radius);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;
}

.btn-cancel {
  background-color: var(--color-border);
  color: var(--color-text-primary);
}

.btn-submit {
  background-color: var(--color-primary);
  color: white;
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Dark mode specific adjustments if needed */
[data-theme='dark'] input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>
