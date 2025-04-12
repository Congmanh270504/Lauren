export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
export function convertToVNDay(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return date.toLocaleDateString("vi-VN", options).replace(/\//g, "/");
}
