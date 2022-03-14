import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';

import { SelectSeniority, SelectEnglish, SelectStatus, SelectPosition } from '../../components/Select';
import Header from '../../components/Header';
import { fetchFunctionApi, postFunctionApi, putFunctionApi } from '../../helpers';
import { Candidate } from '../../data';
import './ApplicaitonPage.css';

export const InputRow = styled.div`
  display: inline-box;
  padding-bottom: 10px;
`;

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
			alert("Отправлено");
		} else {
			await putFunctionApi(`/candidates/${candidateId}`, JSON.stringify(data));
			alert("Сохранено");
		}
    };

	return (
		<>
		<Header/>
		<form onSubmit={onSubmit}>
		<div className='formbox' style={{
			display: 'inline-grid',
			width: '400px'
		}}>
			<InputRow>
				<a>Имя</a>
				<input name="fullName" value={data.fullName} onChange={onChange}/>
			</InputRow>
			<InputRow>
				<a>Позиция</a>
				<SelectPosition value={data.positionId} onChange={onChange}/>
			</InputRow>
			<InputRow>
				<a>Город</a>
				<input name="city" value={data.city} onChange={onChange}/>
			</InputRow>
			<InputRow>
				<a>Email</a>
				<input name="email" value={data.email} onChange={onChange}/>
			</InputRow>
			<InputRow>
				<a>Phone</a>
				<input name="phone" value={data.phone} onChange={onChange}/>
			</InputRow>
			<InputRow>
				<a>Skype</a>
				<input name="skype" value={data.skype} onChange={onChange}/>
			</InputRow>
			<InputRow>
			<a>Опыт (лет)</a>
				<input name="experience" value={data.experience} onChange={onChange}/>
				</InputRow>
			<InputRow>
				<a>Стак технологий</a>
				<input name="techStack" value={data.techStack} onChange={onChange}/>
			</InputRow>
			<InputRow>
				<a>Квалификация</a>
				<SelectSeniority value={data.seniority} onChange={onChange}/>
			</InputRow>
			<InputRow>
				<a>Уровень английского языка</a>
				<SelectEnglish value={data.english} onChange={onChange}/>
			</InputRow>
			<InputRow style={{display: props.mode === 'create' ? 'none' : 'inline-box'}}>
				<a>Статус</a>
				<SelectStatus value={data.status} onChange={onChange}/>
			</InputRow>
			
			<div style={{display: 'inline-box', alignItems: 'center'}}>
				<Button type='submit' variant="contained" startIcon={<SaveIcon />}>
					{props.mode === 'create' ? 'Отправить' : 'Сохранить'}
				</Button>
				<Button
				style={{display: props.mode === 'create' ? 'none' : 'inline-box'}}
				variant="contained"
				startIcon={<DeleteIcon />}>
					Удалить
				</Button>
			</div>
		</div>
		</form>
		</>
	)
}