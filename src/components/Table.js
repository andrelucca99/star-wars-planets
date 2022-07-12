import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Table() {
  const {
    data,
    filterPlanet,
    setFilterPlanet,
    handleFilter,
    handleChange,
    filterByNumericValues,
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
      <div>
        <select
          data-testid="column-filter"
          name="column"
          onChange={ handleChange }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
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
