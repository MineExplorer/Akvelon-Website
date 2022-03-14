import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Header from './components/Header';

var DataContainer: any;

export default function Dashboard() {
	let employee = DataContainer.getEmployee(0);
	let projects = DataContainer.getEmployeeProjects(employee.id);
	let projectId = 0;
	let dateStart = "8.11.2021";
	let dateEnd = "14.11.2021";
	let totalTime = 0;

	function generateOptions(): JSX.Element[] {
		const renderData = [];
		for (let project of projects) {
			renderData.push(<option id={project.id.toString()}>{project.name}</option>);
		}
		return renderData;
	}

	const userSessions = DataContainer.getUserSessions(employee.id, projectId);
	const statData = [];
	for (let session of userSessions) {
		const sessionDate = new Date(session.date);
		if (sessionDate >= new Date('2021.11.8')) {
			const timeHours = session.time;
			statData.push({name: sessionDate.toLocaleDateString(), hours: timeHours});
			totalTime += timeHours;
		}
	}

	const renderLineChart = (
		<LineChart width={700} height={380} data={statData} margin={{
			top: 20,
			left: 20,
			right: 20,
		}}>
			<Line type="monotone" dataKey="hours" stroke="#006eff" />
			<CartesianGrid stroke="#ccc" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
		</LineChart>
	);

	return (
		<div>
			<Header/>
			<div className="mainbox">
				<h3>Статистика сотрудника {employee.name}</h3>
				<div>
					<select className="selectMenu">
						{generateOptions()}
					</select>
					<div style={{position: "relative", top: -40}}>
						{renderLineChart}
						<p>Итоговое время: {totalTime} часов</p>
						<p>Ставка оплаты: {employee.hourlyRate}$/час</p>
						<p>Зарплата за период: {+(totalTime * employee.hourlyRate).toFixed(2)} $</p>
					</div>
				</div>
			</div>
		</div>
	);
}