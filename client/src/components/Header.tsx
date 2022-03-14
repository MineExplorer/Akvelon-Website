import React from "react";
import { NavLink } from "react-router-dom";

export default function AppHeader() {
	return (
		<>
			<ul className="header" style={{
				backgroundColor: "#2452e6",
				padding: 0,
				userSelect: "none",
				display: "inline-block"
			}}>
				<li><NavLink to="/main">О компании</NavLink></li>
				<li><NavLink to="/positions">Вакансии</NavLink></li>
				<li><NavLink to="/candidates">Кандидаты</NavLink></li>
				<li><NavLink to="/contacts">Контакты</NavLink></li>
			</ul>
		</>
	);
}