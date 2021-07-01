import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import configureStore from "redux-mock-store";
import Menu from "./Menu";
import { render, screen } from "@testing-library/react";

const mockStore = configureStore([]);

describe("Menu Component", () => {

  test("renders the word Buscar for search", () => {
    let store = mockStore({
      genres: [],
      filters: {},
      videogames: []
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Buscar')).toBeInTheDocument();
  });

  test("renders the word Crear for create", () => {
    let store = mockStore({
      genres: [],
      filters: {},
      videogames: []
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Crear/)).toBeInTheDocument();
  });

})
