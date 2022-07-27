import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function OrdeneColuna() {
  const { data, setData } = useContext(Context);
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const recebeNumero = -1;
  data.sort((a, b) => (a.name > b.name ? 1 : recebeNumero));

  const handleOrdenar = () => {
    const recebeTable = [...data];
    if (order.sort === 'ASC') {
      recebeTable.sort((a, b) => parseFloat(a[order.column])
      - parseFloat(b[order.column]));
      setData(recebeTable);
    }
    if (order.sort === 'DESC') {
      recebeTable.sort((a, b) => ((parseFloat(b[order.column]) || 0)
      - (parseFloat(a[order.column]) || 0)));
      setData(recebeTable);
    }
  };

  return (
    <div>
      <select
        data-testid="column-sort"
        name="column-sort"
        onChange={ (e) => setOrder({
          ...order,
          column: e.target.value,
        }) }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

      <input
        type="radio"
        name="Ordenar"
        value="ASC"
        data-testid="column-sort-input-asc"
        onChange={ () => setOrder({ ...order, sort: 'ASC' }) }
      />
      Ascendente
      <input
        type="radio"
        name="Ordenar"
        value="DESC"
        data-testid="column-sort-input-desc"
        onChange={ () => setOrder({ ...order, sort: 'DESC' }) }
      />
      Descendente
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleOrdenar() }
      >
        Ordenar
      </button>

    </div>
  );
}

export default OrdeneColuna;
