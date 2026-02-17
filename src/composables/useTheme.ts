export function useTheme() {
  const isDark = ref(false);

  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  watch(isDark, (newValue) => {
    document.documentElement.setAttribute('data-theme', newValue ? 'dark' : 'light');
    localStorage.setItem('theme', newValue ? 'dark' : 'light');
  });

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDark.value = savedTheme === 'dark';
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
  });

  return {
    isDark,
    toggleTheme,
  };
}
