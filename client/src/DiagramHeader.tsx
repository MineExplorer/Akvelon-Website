import React from "react";

export default function DiagramHeader(props: {dateStart: string, dateEnd: string}) {
	return (
		<div style={{position: "relative", display: "flex", padding: 10}}>
			<p style={{fontWeight: "bold"}}>{props.dateStart} - {props.dateEnd}</p>
			<div className="setDate">
				От:
				<input id="inDate1" size={9}/>
				До:
				<input id="inDate2" size={9}/>
			</div>
			<select style={{position: "absolute", right: 0}}>
				<option>Последняя неделя</option>
				<option>Последний месяц</option>
				<option>Настраиваемый диапозон</option>
			</select>
		</div>
	);
}