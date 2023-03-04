import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import Filter from './Filter';
import './css/Table.css';

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
    <div className="container">
      <h1>Star Wars Planets - Trybe</h1>
      <input
        className="text_input"
        type="text"
        data-testid="name-filter"
        value={ filterText }
        placeholder="Digite o nome do planeta"
        onChange={ handleFilters }
      />
      <Filter />
      <table className="table_container">
        <thead className="thead_container">
          <tr>
            {titleHead.map((el) => (
              <th key={ el }>{ el }</th>
            ))}
          </tr>
        </thead>
        <tbody data-testid="table" className="tbody_container">
          {data.length > 0
            && data.filter((el) => el.name.includes(filterText))
              .map((planet) => (
                <tr key={ planet.name }>
                  <td data-testid="planet-name">{planet.name}</td>
                  <td className="column-white">{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td className="column-white">{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td className="column-white">{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td className="column-white">{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td className="column-white"><span>{planet.films}</span></td>
                  <td>{planet.created}</td>
                  <td className="column-white">{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
