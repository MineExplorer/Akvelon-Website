import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { fetchFunctionApi, postFunctionApi } from '../../helpers';
import { Position } from '../../data';
import { Button, Typography } from '@mui/material';
import SelectSeniority from '../../components/SelectSeniority';

export default function CreatePositionPage() {
	const positionId = useParams().id;
	const url = `/positions/${positionId}`;
	const [ data, setData ] = useState({} as Position);
	const [ loaded, setLoaded ] = useState(false);

	useEffect(() => {
		if (loaded) return;

		loadData()
		.then(
			(result) => {
				setData(result);
				setLoaded(true);
			}
		)
	});
  
	const loadData = async () => {
	  return await fetchFunctionApi<Position>(url);
	}
	
	function onChange (event: React.ChangeEvent<HTMLInputElement>) {
        setData({ ...data, [event.target.name]: event.target.value });
    };

	async function onSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await postFunctionApi('/positions', JSON.stringify(data));
    };

	if (!loaded) {
		return <p>Loading...</p>
	}

	return (
		<form onSubmit={onSubmit}>
		<div>
			<Typography>Название</Typography>
			<input name="title" value={data.title} onChange={onChange}/>	
			<Typography>Описание</Typography>
			<input name="description" value={data.description} onChange={onChange}/>
			<Typography>Квалификация</Typography>
			<SelectSeniority value={data.seniority} onChange={onChange}/>
			<Typography>Стак технологий</Typography>
			<input name="techStack" value={data.techStack} onChange={onChange}/>
			
			<Button type='submit'>Подать</Button>
		</div>
		</form>
	)
}