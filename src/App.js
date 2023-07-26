import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Index from "./pages";
import "./App.css";
export default class App extends Component {
  state = {
    theme: "dark",
  };
  render() {
    return (
      <>
        <BrowserRouter>
          <Route component={ScrollToTop} />
          <ThemeProvider
            value={{
              data: this.state,
              update: () => {
                this.setState((state) => ({
                  theme:
                    state.theme === "dark"
                      ? (this.theme = "dark")
                      : (this.theme = "dark"),
                }));
              },
            }}
          >
            <Index />
          </ThemeProvider>
        </BrowserRouter>
      </>
    );
  }
}

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};
