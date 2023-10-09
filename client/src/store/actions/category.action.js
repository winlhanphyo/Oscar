import { useSelector } from 'react-redux';

export const persistCategories = () => ({
  type: "PERSIST_CATEGORIES"
});

export const addCategory = categories => ({
  type: "ADD_CATEGORY",
  payload: categories
});

export const deleteCategory = key => ({
  type: "DELETE_CATEGORY",
  payload: key
});

export const editCategory = key => ({
  type: "EDIT_CATEGORY",
  payload: key
});

export const editAddCategory = obj => ({
  type: "EDIT_ADD_CATEGORY",
  payload: obj
});

export const deleteAll = () => ({
  type: "DELETE_ALL"
});

export function useCategory() {
  return useSelector((state) => state.category.categories)
};