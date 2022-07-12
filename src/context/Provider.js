import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterPlanet, setFilterPlanet] = useState({
    filterByName: { name: 'Tatoo' },
  });
  const [filterByNumericValues, setfilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const getPlanets = () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((item) => setData(item.results));
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setfilterByNumericValues({
      ...filterByNumericValues,
      [name]: value,
    });
  };

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
  };

  const state = {
    data,
    filterPlanet,
    filterByNumericValues,
    setFilterPlanet,
    handleFilter,
    handleChange,
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
