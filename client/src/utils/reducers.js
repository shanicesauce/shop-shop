import { useReducer } from 'react';

import {
  UPDATE_PRODUCTS,
  UPDATE_CURRENT_CATEGORY,
  UPDATE_CATEGORIES,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    //if action type value us the vaule of update products return a new state object with an updated array
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
      case UPDATE_CATEGORIES: 
      return {
        ...state,
        categories: [...action.categories]
      };
      case UPDATE_CURRENT_CATEGORY: 
      return {
        ...state,
        currentCategory: action.currentCategory
      };

// if its none of these actions do not update state and keep the same 
    default:
      return state;
  }
};

export function useProductReducer(initalState) {
    return useReducer(reducer, initalState);
}