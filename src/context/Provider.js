import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterPlanet, setFilterPlanet] = useState({
    filterByName: { name: 'Tatoo' },
  });

  const getPlanets = () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((item) => setData(item.results));
  };

  useEffect(() => {
    getPlanets();
  }, []);

  return (
    <Context.Provider value={ { data, filterPlanet, setFilterPlanet } }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape([]).isRequired,
};

export default Provider;
