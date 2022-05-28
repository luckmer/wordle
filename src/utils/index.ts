export const LONG_ANIMATION_TIME = 500;

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

export const timer = (
  index: number,
  divider = 5,
  time = LONG_ANIMATION_TIME
) => {
  return (time * index) / divider;
};

export const matchTheSameElements = <T extends { acceptedWord: boolean }>(
  arr: Array<T>
) => {
  return arr
    .map(({ acceptedWord }: { acceptedWord: boolean }) => acceptedWord)
    .every((el: boolean) => el === false);
};
