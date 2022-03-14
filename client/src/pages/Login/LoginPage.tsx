import React from 'react';
import {NavLink} from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
	return (
		<div className="LoginCard">
			<p>Логин</p>
			<input id="login"/>
			<p>Пароль</p>
			<input id="password"/>
			<NavLink to="/Main" className="buttonEnter">Вход</NavLink>
		</div>
	)
}