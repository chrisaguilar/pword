export const b: string = '\x1B[1m';
export const cols: number = Math.min((process as any).stdout.columns - 4, 80);
export const green: string = '\x1b[32m';
export const hr: string = '-'.repeat(cols);
export const r: string = '\x1B[0m';
export const red: string = '\x1B[31m';
