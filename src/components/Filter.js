import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import OrdeneColuna from './OrdeneColuna';

function Filter() {
  const {
    handleChange,
    filterByNumericValues,
    newFilter,
    filters,
    verificaFilters,
    setData,
    setNewFilter,
    setFilters,
    setFilterByNumericValues,
    data,
    dataInicial,
  } = useContext(Context);

  const filtersNoRepeat = () => {
    const pegaFilters = newFilter.filter((el) => el !== filterByNumericValues.column);
    setNewFilter(pegaFilters);
    setFilterByNumericValues({
      ...filterByNumericValues,
      column: pegaFilters[0],
    });
    setFilters([...filters, filterByNumericValues]);
  };

  const handleFilter = ({ column, comparison, value }, local) => {
    let localFilter = [];

    if (comparison === 'maior que') {
      localFilter = local.filter((el) => Number(el[column]) > Number(value));
    }
    if (comparison === 'menor que') {
      localFilter = local.filter((el) => Number(el[column]) < Number(value));
    }
    if (comparison === 'igual a') {
      localFilter = local.filter((el) => Number(el[column]) === Number(value));
    }

    return localFilter;
  };

  const appFilters = () => {
    let dadosIniciais = dataInicial;

    filters.forEach((el) => {
      dadosIniciais = handleFilter(el, dadosIniciais);
    });

    return dadosIniciais;
  };

  useEffect(() => {
    setData(appFilters());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const deleteFilter = ({ target }) => {
    const { value } = target;
    setNewFilter([...newFilter, value]);
    setFilters(filters.filter((filter) => filter.column !== value));
  };

  const deletaAllFilters = () => {
    setNewFilter([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setFilters([]);
    setData(dataInicial);
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
          <option key={ el }>{ el }</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChange }
        value={ filterByNumericValues.comparison }
      >
        {verificaFilters.map((el) => (
          <option key={ el }>{ el }</option>
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
        onClick={ () => {
          setData(handleFilter(filterByNumericValues, data));
          filtersNoRepeat();
        } }
      >
        Filtrar
      </button>

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ deletaAllFilters }
      >
        Remover todas filtragens
      </button>

      {filters.map((el) => (
        <div data-testid="filter" key={ el.column }>
          {el.column}
          {el.comparison}
          {el.value}
          <button
            type="button"
            onClick={ deleteFilter }
            value={ el.column }
            data-testid="filter-btn"
          >
            remove
          </button>
        </div>
      ))}
      <OrdeneColuna />
    </div>
  );
}

export default Filter;
