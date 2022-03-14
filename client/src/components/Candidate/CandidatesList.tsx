import React, { useEffect, useState } from 'react';
import { Box } from 'grommet';
import MaterialUIBox from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CandidateItem from './CandidateItem';
import { fetchFunctionApi } from '../../helpers';
import { Candidate, Seniority, State } from '../../data';
import { SelectSort, SelectSeniority, SelectPosition } from '../Select';

type SortMode = 'AZ' | 'ZA' | 'New' | 'Old';

export default function CandidatesList() {
  const [data, setData] = useState([]);
  const [sortMode, setSortMode] = useState('AZ' as SortMode);
  const [filterSeniority, setFilterSeniority] = useState(Seniority.NotAvailable);
  const [filterPosition, setFilterPosition] = useState(0);
  const [state, setState] = useState(State.Loading);

  useEffect(() => {
    if (state === State.Loaded) return;

    loadData()
    .then(
        (result) => {
            setData(result);
            setState(State.Loaded);
        }
    )
    .catch(error => {
      setState(State.Error);
    });
  });

  const loadData = async () => {
    return await fetchFunctionApi<Candidate[]>(`/candidates`);
  }

  if (state === State.Loading) {
    return <Typography>Loading...</Typography>
  }
  
  if (state === State.Error) {
    return <Typography>Server unavailable</Typography>
  }

  if (data.length === 0) {
    return (
      <MaterialUIBox display="flex" justifyContent="center" padding={2}>
        <Typography>No Candidates</Typography>
      </MaterialUIBox>
    );
  }

  function compareCandidateNames(name1: string, name2: string, reverseOrder: boolean) {
    if (name1 > name2) {
      return reverseOrder ? -1 : 1;
    }
    if (name1 < name2) {
      return reverseOrder ? 1 : -1;
    }
    return 0;
  }

  function compareCandidateCreated(dateStr1: string, dateStr2: string, reverseOrder: boolean) {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    if (date1 < date2) {
      return reverseOrder ? -1 : 1;
    }
    if (date1 > date2) {
      return reverseOrder ? 1 : -1;
    }
    return 0;
  }

  function compareCandidates(candidate1: Candidate, candidate2: Candidate) {
    if (sortMode === 'AZ') {
      return compareCandidateNames(candidate1.fullName, candidate2.fullName, false);
    }
    if (sortMode === 'ZA') {
      return compareCandidateNames(candidate1.fullName, candidate2.fullName, true);
    }
    if (sortMode === 'New') {
      return compareCandidateCreated(candidate1.created, candidate2.created, false);
    }
    if (sortMode === 'Old') {
      return compareCandidateCreated(candidate1.created, candidate2.created, true);
    }
    return 0;
  }

  function filterCandidates(candidate: Candidate) {
    let validSeniority: boolean;
    let validPosition: boolean;
    if (filterSeniority === Seniority.NotAvailable) {
      validSeniority = true;
    } else {
      validSeniority = candidate.seniority == filterSeniority;
    }

    if (filterPosition === 0) {
      validPosition = true;
    } else {
      validPosition = candidate.positionId == filterPosition;
    }

    return validSeniority && validPosition;
  }

  const candidatesList = data.filter(filterCandidates).sort(compareCandidates).map(item => (
    <React.Fragment key={item.id}>
      <CandidateItem candidate={item} />
    </React.Fragment>
  ));

  function onSortChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSortMode(event.target.value as SortMode);
  }

  function onSeniorityFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilterSeniority(parseInt(event.target.value));
  }

  function onPositionFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilterPosition(parseInt(event.target.value));
  }

  const listHeaderItemStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '10px',
    position: 'relative'
  };

  return (
    <div style={{width: '900px'}}>
      <div style={{float: 'left'}}>
        <Typography style={listHeaderItemStyle}>Сортировка:</Typography>
        <SelectSort value={sortMode} onChange={onSortChange}/>
        <Typography style={listHeaderItemStyle}>Квалификация:</Typography>
        <SelectSeniority value={filterSeniority} onChange={onSeniorityFilterChange}/>
        <Typography style={listHeaderItemStyle}>Вакансия:</Typography>
        <SelectPosition value={filterPosition} onChange={onPositionFilterChange}/>
      </div>
      <Box fill overflow={{ vertical: 'auto', horizontal: 'hidden' }} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {candidatesList}
      </Box>
    </div>
  );
}