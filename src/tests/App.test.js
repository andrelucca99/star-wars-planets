import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import testData from "../../cypress/mocks/testData";

describe("Desenvolva testes para atingir 50% de cobertura total da aplicação", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });
  test("Teste se aparece o titulo do projeto", () => {
    render(<App />);

    const titleEl = screen.getByText("Projeto Star Wars - Trybe");
    expect(titleEl).toBeInTheDocument();
  });

  test("Testa se os inputs de nome e email aparecem na tela", () => {
    render(<App />);

    const inputText = screen.getByPlaceholderText("Digite um número");
    expect(inputText).toBeInTheDocument();
  });

  test("Teste se são renderizados na tela os data-testid dos elementos.", () => {
    render(<App />);

    const nameEl = screen.getByTestId("name-filter");
    expect(nameEl).toBeInTheDocument();

    const comparisonEl = screen.getByTestId("comparison-filter");
    expect(comparisonEl).toBeInTheDocument();

    const valueEl = screen.getByTestId("value-filter");
    expect(valueEl).toBeInTheDocument();
  });

  test('Digite no input de pesquisar, verifica se ao colocar duas letras "oo" filtar qual planeta possui essas letras ', () => {
    render(<App />);
    const textbox = screen.getByRole("textbox");
    userEvent.type(textbox, "oo");

    expect(textbox).toHaveValue("oo");
  });

  test("Teste se o Botão filtrar funciona", () => {
    render(<App />);

    const columnEl = screen.getByTestId("column-filter");
    expect(columnEl).toBeInTheDocument();

    userEvent.click(columnEl);

    userEvent.selectOptions(columnEl, "orbital_period");

    userEvent.click(columnEl);

    const comparisonEl = screen.getByTestId("comparison-filter");
    expect(comparisonEl).toBeInTheDocument();

    userEvent.click(comparisonEl);

    userEvent.selectOptions(comparisonEl, "maior que");
    userEvent.click(comparisonEl);
    expect(comparisonEl).toBeInTheDocument();

    const valueEl = screen.getByTestId("value-filter");
    expect(valueEl).toBeInTheDocument();

    userEvent.type(valueEl, '20');

    const btn = screen.getByTestId("button-filter");
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);

    let response = screen.getByTestId('filter');
    response = screen.getByText('orbital_periodmaior que020');
    expect(response).toBeInTheDocument();

    const filterBtn = screen.getByTestId('filter-btn');

    expect(filterBtn).toBeInTheDocument();

  });

  test('Teste se os seletores de menor que ao selecionar nas opções aparecem', () => {
    render(<App />);

    const columnEl = screen.getByTestId("column-filter");
    expect(columnEl).toBeInTheDocument();

    userEvent.click(columnEl);

    userEvent.selectOptions(columnEl, "orbital_period");

    userEvent.click(columnEl);

    const comparisonEl = screen.getByTestId("comparison-filter");
    expect(comparisonEl).toBeInTheDocument();

    userEvent.click(comparisonEl);

    userEvent.selectOptions(comparisonEl, "menor que");
    userEvent.click(comparisonEl);
    expect(comparisonEl).toBeInTheDocument();

    const valueEl = screen.getByTestId("value-filter");
    expect(valueEl).toBeInTheDocument();

    userEvent.type(valueEl, '20');

    const btn = screen.getByTestId("button-filter");
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);

    let response = screen.getByTestId('filter');
    response = screen.getByText('orbital_periodmenor que020');
    expect(response).toBeInTheDocument();

    const filterBtn = screen.getByTestId('filter-btn');

    expect(filterBtn).toBeInTheDocument();

  });

  test('Teste se os seletores de igual a ao selecionar nas opções aparecem', () => {
    render(<App />);

    const columnEl = screen.getByTestId("column-filter");
    expect(columnEl).toBeInTheDocument();

    userEvent.click(columnEl);

    userEvent.selectOptions(columnEl, "orbital_period");

    userEvent.click(columnEl);

    const comparisonEl = screen.getByTestId("comparison-filter");
    expect(comparisonEl).toBeInTheDocument();

    userEvent.click(comparisonEl);

    userEvent.selectOptions(comparisonEl, "igual a");
    userEvent.click(comparisonEl);
    expect(comparisonEl).toBeInTheDocument();

    const valueEl = screen.getByTestId("value-filter");
    expect(valueEl).toBeInTheDocument();

    userEvent.type(valueEl, '20');

    const btn = screen.getByTestId("button-filter");
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);

    let response = screen.getByTestId('filter');
    response = screen.getByText('orbital_periodigual a020');
    expect(response).toBeInTheDocument();

    const filterBtn = screen.getByTestId('filter-btn');

    expect(filterBtn).toBeInTheDocument();

  });

  test('Teste se o btn de remover filter funciona', () => {
    render(<App />);

    const filtrar = screen.getByTestId('button-filter');
    expect(filtrar).toBeInTheDocument();

    userEvent.click(filtrar);

    const response = screen.getByTestId('filter');
    expect(response).toBeInTheDocument();

    const btnFilter = screen.getByTestId('filter-btn');
    expect(btnFilter).toBeInTheDocument();

    userEvent.click(btnFilter);

    expect(btnFilter).not.toBeInTheDocument()

  });

  test('Teste se o btn de remover todos filters funciona', () => {
    render(<App />);

    const filtrar = screen.getByTestId('button-filter');
    expect(filtrar).toBeInTheDocument();

    userEvent.click(filtrar);

    let response = screen.getByTestId('filter');
    response = screen.getByText('populationmaior que0');
    expect(response).toBeInTheDocument();

    const btnExcluir = screen.getByTestId('button-remove-filters');
    expect(btnExcluir).toBeInTheDocument();

    userEvent.click(btnExcluir);

  });

  test('Teste se é renderizado a linhas da tabela', async () => {
    render(<App />);

    const tableEl = screen.getByTestId('table');
    expect(tableEl).toBeInTheDocument();

    const table = await screen.findAllByRole('cell');
    expect(table).toHaveLength(130);
  });
});
