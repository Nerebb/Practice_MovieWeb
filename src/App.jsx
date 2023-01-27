import React from "react";
import { BrowserRouter } from "react-router-dom";
import ModalProvider from "./contexts/ModalProvider";
import PlayListProvider from "./contexts/PlayListProvider";
import SearchProvider from "./contexts/SearchProvider";
import Router from "./routes";
import ThemeProvider from "./theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ModalProvider>
          <SearchProvider>
            <PlayListProvider>
              <Router />
            </PlayListProvider>
          </SearchProvider>
        </ModalProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
