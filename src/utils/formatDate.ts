/**
 * 格式化日期
 * @param date - 日期对象或字符串
 * @param format - 格式化字符串 (默认 'YYYY-MM-DD')
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: Date | string | number): string => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};
