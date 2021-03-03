let initialState = [{ id: 0, docName: "hello.txt", text: "" }];

const documentListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_DOC_LIST":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default documentListReducer;
