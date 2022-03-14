import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

import { fetchFunctionApi } from '../../helpers';
import { Position, State } from '../../data';
import PositionItem from './PositionItem';
import React from 'react';

const PositionsBox = styled.div` {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    position: relative;
    min-width: 800px;
}`

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
        <PositionsBox>
            {positionsList}
        </PositionsBox>
    );
}