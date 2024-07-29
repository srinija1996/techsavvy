export type Theme = {
  darkMode: "dark" | "light";
};

export type AppContextType = {
  mainContentHeight: any;
  setMainContentHeight?: any;
  mainContentRef?: any;
  isLoggedIn: boolean;
  setIsLoggedIn?: any;
  appRef?: any;
  darkMode: boolean;
  setDarkMode?: any;
};
