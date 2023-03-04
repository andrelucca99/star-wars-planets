import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterPlanet, setFilterPlanet] = useState({
    filterByName: { name: 'Tatoo' },
  });

  const [titleHead] = useState([
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ]);

  const [newFilter, setNewFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [verificaFilters] = useState([
    'maior que',
    'menor que',
    'igual a',
  ]);

  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: newFilter[0],
    comparison: 'maior que',
    value: 0,
  });

  const [filters, setFilters] = useState([]);

  const [dataInicial, setDataInical] = useState([]);

  const getPlanets = () => {
    fetch('https://swapi.dev/api/planets/')
      .then((response) => response.json())
      .then((item) => {
        setData(item.results);
        setDataInical(item.results);
      });
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilterByNumericValues({
      ...filterByNumericValues,
      [name]: value,
    });
  };

  const state = {
    data,
    filterPlanet,
    filterByNumericValues,
    newFilter,
    filters,
    verificaFilters,
    titleHead,
    setFilterPlanet,
    handleChange,
    setFilterByNumericValues,
    setNewFilter,
    setFilters,
    setData,
    dataInicial,
    setDataInical,
  };

  return (
    <Context.Provider value={ state }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape([]).isRequired,
};

export default Provider;
