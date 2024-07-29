import { createContext, useRef, useState, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import "./App.css";
import { AppContextType } from "./interfaces";
import MainLayout from "./components/MainLayout";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));

export const AppContext = createContext<AppContextType>({
  mainContentHeight: "",
  isLoggedIn: false,
  darkMode: false,
});

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const mainContentRef = useRef(null);
  const appRef = useRef(null);
  const [mainContentHeight, setMainContentHeight] = useState(null);
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);

  return (
    <AppContext.Provider
      value={{
        mainContentHeight,
        setMainContentHeight,
        mainContentRef,
        isLoggedIn,
        setIsLoggedIn,
        appRef,
        darkMode,
        setDarkMode,
      }}
    >
      <ThemeProvider theme={darkMode}>
        <BrowserRouter basename="/techsavvy">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
