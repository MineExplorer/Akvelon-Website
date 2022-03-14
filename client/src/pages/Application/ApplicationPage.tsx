import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { fetchFunctionApi, postFunctionApi, putFunctionApi } from '../../helpers';
import { Candidate, Position } from '../../data';
import { Button, Typography } from '@mui/material';
import { SelectSeniority, SelectEnglish, SelectStatus } from '../../components/Select';
import Header from '../../components/Header';
import { SelectPosition } from '../../components/Select/SelectPosition';

export default function ApplicationPage(props: {mode: 'create' | 'edit'}) {
	const urlId = parseInt(useParams().id);
	let candidateId = props.mode == 'edit' ? urlId : 0;
	let positionId = props.mode == 'create' ? urlId : 0;

	const [ data, setData ] = useState({positionId: positionId} as Candidate);
	const [ loaded, setLoaded ] = useState(false);

  	useEffect(() => {
    	if (loaded || props.mode !== 'edit') return;

		loadData()
		.then(
			(result) => {
				setData(result);
				setLoaded(true);
			}
		)
		.catch(error => {
			alert(error);
		});
	});
  
	async function loadData () {
		return await fetchFunctionApi<Candidate>(`/candidates/${candidateId}`);
	}
	
	function onChange (event: React.ChangeEvent<HTMLInputElement>) {
        setData({ ...data, [event.target.name]: event.target.value });
    };

	async function onSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
		if (props.mode === 'create') {
        	await postFunctionApi('/candidates', JSON.stringify(data));
		} else {
			await putFunctionApi(`/candidates/${candidateId}`, JSON.stringify(data));
		}
    };

	return (
		<>
		<Header/>
		<form onSubmit={onSubmit}>
		<div style={{
			display: 'inline-grid'
		}}>
			<Typography>Имя</Typography>
			<input name="fullName" value={data.fullName} onChange={onChange}/>
			<Typography>Позиция</Typography>
			<SelectPosition value={data.positionId} onChange={onChange}/>
			<Typography>Город</Typography>
			<input name="city" value={data.city} onChange={onChange}/>
			<Typography>Email</Typography>
			<input name="email" value={data.email} onChange={onChange}/>
			<Typography>Phone</Typography>
			<input name="phone" value={data.phone} onChange={onChange}/>
			<Typography>Skype</Typography>
			<input name="skype" value={data.skype} onChange={onChange}/>
			<Typography>Опыт (лет)</Typography>
			<input name="experience" value={data.experience} onChange={onChange}/>
			<Typography>Стак технологий</Typography>
			<input name="techStack" value={data.techStack} onChange={onChange}/>
			<Typography>Квалификация</Typography>
			<SelectSeniority value={data.seniority} onChange={onChange}/>
			<Typography>Уровень английского языка</Typography>
			<SelectEnglish value={data.english} onChange={onChange}/>
			<div style={{display: props.mode === 'create' ? 'none' : 'inline'}}>
				<Typography>Статус</Typography>
				<SelectStatus value={data.status} onChange={onChange}/>
			</div>
			
			<Button type='submit'>{props.mode === 'create' ? 'Отправить' : 'Сохранить'}</Button>
		</div>
		</form>
		</>
	)
}