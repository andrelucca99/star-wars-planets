import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import Filter from './Filter';

function Table() {
  const {
    data,
    filterPlanet,
    titleHead,
    setFilterPlanet,
  } = useContext(Context);
  const [filterText, setFilterText] = useState('');

  const handleFilters = ({ target }) => {
    const { name, value } = target;
    setFilterPlanet({ ...filterPlanet, filterByName: { [name]: value } });
    setFilterText(value);
  };

  return (
    <div>
      <h1>Projeto Star Wars - Trybe</h1>
      <input
        type="text"
        data-testid="name-filter"
        value={ filterText }
        placeholder="Digite o nome do planeta"
        onChange={ handleFilters }
      />
      <Filter />
      <table>
        <thead>
          <tr>
            {titleHead.map((el) => (
              <th key={ el }>{el}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data
            .filter((el) => el.name.includes(filterText))
            .map((planet) => (
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
