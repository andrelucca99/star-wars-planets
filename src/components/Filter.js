import React, { useContext } from 'react';
import Context from '../context/Context';

function Filter() {
  const {
    handleChange,
    filterByNumericValues,
    newFilter,
    filters,
    verificaFilters,
    data,
    setData,
    setNewFilter,
    setFilters,
    setFilterByNumericValues,
  } = useContext(Context);

  const handleFilter = () => {
    const { column, comparison, value } = filterByNumericValues;

    if (comparison === 'maior que') {
      const filter = data.filter((item) => (Number(item[column]) > Number(value)));
      setData(filter);
    }
    if (comparison === 'menor que') {
      const filter = data.filter((item) => (Number(item[column]) < Number(value)));
      setData(filter);
    }
    if (comparison === 'igual a') {
      const filter = data.filter((item) => (Number(item[column]) === Number(value)));
      setData(filter);
    }

    const filteredOpt = newFilter.filter((el) => el !== filterByNumericValues.column);
    setNewFilter(filteredOpt);
    setFilterByNumericValues({ ...filterByNumericValues, column: filteredOpt[0] });
    setFilters([...filters, filterByNumericValues]);
  };

  return (
    <div>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleChange }
        value={ filterByNumericValues.column }
      >
        {newFilter.map((el) => (
          <option key={ el }>{el}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChange }
        value={ filterByNumericValues.comparison }
      >
        {verificaFilters.map((el) => (
          <option key={ el }>{el}</option>
        ))}
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
      {filters.map((el) => (
        <p key={ el.column }>
          {el.column}
          {el.comparison}
          {el.value}
        </p>
      )) }
    </div>
  );
}

export default Filter;
