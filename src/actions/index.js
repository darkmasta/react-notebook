export const saveDocList = (doc) => {
  return {
    type: "SAVE_DOC_LIST",
    payload: doc,
  };
};
