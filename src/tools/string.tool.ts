function isNil(value: string | undefined | null): boolean {
  return value === '' || value === undefined || value === null;
}

function encode(text: string) {
  return text.replace(/[!^\W]/gi, '_').toLocaleLowerCase();
}

export const StringTool = {
  isNil,
  encode,
};
