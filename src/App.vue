<script setup lang="ts">
// No imports needed due to auto-import (vue-router)
import { useTheme } from '@/composables/useTheme';

// Initialize theme logic globally
useTheme();
</script>

<template>
  <RouterView />
</template>
