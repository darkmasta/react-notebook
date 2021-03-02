export const saveText = (text) => {
  return {
    type: "SAVE_TEXT",
    payload: text,
  };
};
