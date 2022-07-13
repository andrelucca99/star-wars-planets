import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Desenvolva testes para atingir 50% de cobertura total da aplicação', () => {
  
  it('Teste se são renderizados na tela os data-testid dos elementos.', () => {
    render(<App />);

    const titleEl = screen.getByText('Projeto Star Wars - Trybe');
    expect(titleEl).toBeInTheDocument();

    const inputText = screen.getByPlaceholderText('Digite um número');
    expect(inputText).toBeInTheDocument();

    const nameEl = screen.getByTestId('name-filter');
    expect(nameEl).toBeInTheDocument();

    const columnEl = screen.getByTestId('column-filter');
    expect(columnEl).toBeInTheDocument();

    const comparisonEl = screen.getByTestId('comparison-filter');
    expect(comparisonEl).toBeInTheDocument();

    const valueEl = screen.getByTestId('value-filter');
    expect(valueEl).toBeInTheDocument();

    const btn = screen.getByTestId('button-filter');
    expect(btn).toBeInTheDocument();
  });

  test('Digite no input de pesquisar, verifica se ao colocar duas letras "oo" filtar qual planeta possui essas letras ', () => {
    render(<App />);
    userEvent.type(screen.getByRole('textbox'), 'oo');

    expect(screen.getByRole('textbox')).toHaveValue('oo');
  });

  test('Teste se ao clicar no button ele executa a funcao Filtrar', () => {
    render(<App />);

    const btn = screen.getByTestId('button-filter');
    expect(btn).toBeInTheDocument();

    userEvent.click(btn)
  });

}) 