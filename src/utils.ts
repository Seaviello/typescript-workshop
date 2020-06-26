export const log = <T extends object>(s: string | T) => console.log('\x1b[34m%s\x1b[0m', JSON.stringify(s));  //cyan
