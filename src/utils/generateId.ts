const generateId = (): string => {
  let result: string = "";
  const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const CHARACTERS_LENGTH = CHARACTERS.length;

  for (let i = 0; i < 5; i++) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS_LENGTH));
  }

  return result;
};

export default generateId;
