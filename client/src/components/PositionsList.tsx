import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

import { fetchFunctionApi } from '../helpers';
import { Position, State } from '../data';

export default function PositionsList() {
    const [items, setItems] = useState([]);
    const [state, setState] = useState(State.Loading);

    useEffect(() => {
        if (state === State.Loaded) return;
        
        loadData()
        .then(
            (result) => {
              setItems(result);
              setState(State.Loaded);
            }
        )
        .catch(error => {
            setState(State.Error);
        });
    });

    const loadData = async () => {
        return await fetchFunctionApi<Position[]>(`/positions`);
    }

    if (state === State.Loading) {
        return <Typography>Loading...</Typography>
    }
    
    if (state === State.Error) {
        return <Typography>Server unavailable</Typography>
    }

  return (
    <ul>
        {items.map((item: Position) => (
        <li key={item.id}>
            {item.id} {item.title}
        </li>
        ))}
    </ul>
  );
}