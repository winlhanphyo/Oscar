const initState = {
  categories: [],
  text: "",
  selected: undefined
};

const setPersist = categories =>
  window.localStorage.setItem("categories2", JSON.stringify(categories));

export const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case "PERSIST_CATEGORIES":
      const categories = JSON.parse(window.localStorage.getItem("categories2"));
      return { ...state, categories: categories ? categories : [] };
    case "ADD_TEXT":
      return { ...state, text: action.payload };
    case "ADD_CATEGORY":
      // const categories2 = state.categories.concat(action.payload);
      const categories2 = action.payload.categories;

      window.localStorage.setItem("categories2", JSON.stringify(categories2));
      console.log('category reducer-------------', categories2);
      return { ...state, categories: categories2, text: "" };
    case "DELETE_CATEGORY":
      const category3 = state.categories.filter((category, i) => i !== action.payload);
      setPersist(category3);
      return {
        ...state,
        categories: category3
      };
    case "EDIT_CATEGORY":
      return {
        ...state,
        text: state.categories[action.payload],
        selected: action.payload
      };
    case "EDIT_ADD_CATEGORY":
      const category4 = state.categories.map((category, i) =>
        i !== action.payload.selected ? category : action.payload.value
      );
      setPersist(category4);
      return {
        ...state,
        categories: category4,
        selected: undefined,
        text: ""
      };
    case "DELETE_ALL":
      setPersist([]);
      return { ...state, categories: [], text: "" };
    default:
      return state;
  }
};

export default categoryReducer;