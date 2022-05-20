export const removeDuplicate = (string: string) => {
  const deleteWordIndex = string
    .split("")
    .findIndex(
      (item: string, pos: number, self: string[]) => self.indexOf(item) !== pos
    );

  return string.split("").map((item: string, pos: number, self: string[]) => {
    if (item === string[deleteWordIndex]) return "1";
    if (self.indexOf(item) === pos && item !== string[deleteWordIndex])
      return item;
    return item;
  });
};
