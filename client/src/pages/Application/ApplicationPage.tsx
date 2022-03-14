import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { fetchFunctionApi, postFunctionApi, putFunctionApi } from '../../helpers';
import { Candidate } from '../../data';
import { Button, Typography } from '@mui/material';
import SelectSeniority from '../../components/SelectSeniority';
import SelectEnglish from '../../components/SelectEnglish';
import Header from '../../components/Header';

export default function ApplicationPage() {
	const candidateId = useParams().id;
	const [ data, setData ] = useState({} as Candidate);
	const [ state, setState ] = useState(candidateId === 'new' ? 'create' : 'loading');

  	useEffect(() => {
    	if (state !== 'loading') return;

		loadData()
		.then(
			(result) => {
				setData(result);
				setState('loaded');
			}
		)
		.catch(error => {
			alert(error);
		});
	});
  
	const loadData = async () => {
	  return await fetchFunctionApi<Candidate>(`/candidates/${candidateId}`);
	}
	
	function onChange (event: React.ChangeEvent<HTMLInputElement>) {
        setData({ ...data, [event.target.name]: event.target.value });
    };

	async function onSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
		if (state === 'create') {
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
			
			<Button type='submit'>{state === 'create' ? 'Отправить' : 'Сохранить'}</Button>
		</div>
		</form>
		</>
	)
}