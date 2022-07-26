import React from 'react';

function OrdeneColuna() {
  return (
    <div>
      <select
        data-testid="column-sort"
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

      <input
        type="radio"
        data-testid="column-sort-input-asc"
        value="ASC"
      />

      <input
        type="radio"
        data-testid="column-sort-input-desc"
        value="DESC"
      />

      <button
        type="button"
        data-testid="column-sort-button"
      >
        Ordenar
      </button>

    </div>
  );
}

export default OrdeneColuna;
