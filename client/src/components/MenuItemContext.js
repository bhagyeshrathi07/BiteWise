// Used for App.js Routes

import React, { createContext, useContext, useReducer } from 'react';

const MenuItemContext = createContext();

export const useMenuItemContext = () => useContext(MenuItemContext);

const initialState = {
  menuItem: null,
};

const menuItemReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_MENU_ITEM':
      return {
        ...state,
        menuItem: action.payload,
      };
    default:
      return state;
  }
};

export const MenuItemProvider = ({ children }) => {
  const [state, dispatch] = useReducer(menuItemReducer, initialState);

  return (
    <MenuItemContext.Provider value={{ state, dispatch }}>
      {children}
    </MenuItemContext.Provider>
  );
};
