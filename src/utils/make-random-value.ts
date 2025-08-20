export const makeRandomValue = () => {
  return Math.random().toString(36).substring(4, 10).trim();
};
