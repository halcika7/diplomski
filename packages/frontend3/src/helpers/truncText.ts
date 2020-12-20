export const truncText = (value: string) =>
  value.length < 50 ? value : value.slice(0, 50).concat('...');
