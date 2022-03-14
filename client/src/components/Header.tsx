import { NavLink } from "react-router-dom";
import { Login } from "../helpers";

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
				<li><NavLink to="/contacts">Контакты</NavLink></li>
				<li style={{display: Login.authorized ? 'inline-block' : 'none'}}>
					<NavLink to="/candidates">Кандидаты</NavLink>
				</li>
				<li style={{display: Login.authorized ? 'none' : 'inline-block'}}>
					<NavLink to="/login">Вход</NavLink>
				</li>
			</ul>
		</>
	);
}