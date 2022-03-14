import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

import { fetchFunctionApi } from '../../helpers';
import { Position, State } from '../../data';
import PositionItem from './PositionItem';
import React from 'react';

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

    const positionsList = items.map(item => (
        <React.Fragment key={item.id}>
          <PositionItem position={item} />
        </React.Fragment>
      ));

    return (
        <>
            {positionsList}
        </>
    );
}