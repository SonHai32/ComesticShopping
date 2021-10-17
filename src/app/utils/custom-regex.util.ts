export const isUrlValid = (text: string): boolean => {
  const urlRegex = new RegExp(
    `(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})`
  );
  return urlRegex.test(text);
};

export const isNumberValid = (text: string): boolean => {
  const numRegex = /^-?\d+\.?\d*$/;
  return numRegex.test(text);
};
