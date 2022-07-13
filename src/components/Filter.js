import React, { useContext } from 'react';
import Context from '../context/Context';

function Filter() {
  const {
    handleFilter,
    handleChange,
    filterByNumericValues,
    newFilter,
  } = useContext(Context);

  return (
    <div>
      <select data-testid="column-filter" name="column" onChange={ handleChange }>
        {newFilter.map((el) => (
          <option key={ el }>{el}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChange }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ handleChange }
        value={ filterByNumericValues.value }
        placeholder="Digite um número"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filter;
