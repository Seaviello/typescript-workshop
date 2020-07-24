export const log = <T extends Record<string, unknown>>(s: string | T) =>
  console.error('\x1b[34m%s\x1b[0m', JSON.stringify(s)); //cyan
