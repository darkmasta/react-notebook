const textReducer = (state = "", action) => {
  switch (action.type) {
    case "SAVE_TEXT":
      console.log(action.payload);
      return state + action.payload;
    default:
      return state;
  }
};

export default textReducer;
