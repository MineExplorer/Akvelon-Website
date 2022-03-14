import React from 'react';
import {NavLink} from 'react-router-dom';
import { Login } from '../../helpers';
import './LoginPage.css';

export default function LoginPage() {
	function authorize() {
		Login.setAuthorized(true);
	}

	return (
		<div className="LoginCard">
			<p>Логин</p>
			<input id="login"/>
			<p>Пароль</p>
			<input id="password"/>
			<NavLink to="/main" className="buttonEnter" onClick={authorize}>Вход</NavLink>
		</div>
	)
}