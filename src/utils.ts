export const createRange = (from: number, to: number) => {
  const length = to - from + 1;

  return Array.from({ length }, (_, i) => i + from);
};
