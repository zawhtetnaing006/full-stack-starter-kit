export function IsEmailString(email: string): boolean {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

export function IsPositiveInteger(value) {
  const num = Number(value);
  return Number.isInteger(num) && num > 0 && value.trim() !== '';
}

export function Isset(value) {
  return typeof value !== 'undefined';
}

export function IsEmptyString(value) {
  return value.trim() === '';
}

export function IsEmptyFile(file: any): boolean {
  return !file || file.size === 0;
}
