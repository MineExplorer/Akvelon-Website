import { useEffect, useState } from "react";
import { Position } from "../../data";
import { fetchFunctionApi } from "../../helpers";

export function SelectPosition(props: {value: number, onChange: any}) {
    const [ items, setItems ] = useState([] as Position[]);
    const [ loaded, setLoaded ] = useState(false);

    useEffect(() => {
    	if (loaded) return;

		loadData()
			.then(
				(result) => {
					setItems(result);
                    setLoaded(true);
				}
			)
			.catch(error => {
				alert(error);
			});
	});
    	
	async function loadData() {
		return await fetchFunctionApi<Position[]>("/positions");
	}

    const positionsList = items.map(item => {
        return <option value={item.id}>{item.title}</option>
    });

    return <select name="positionId" value={props.value} onChange={props.onChange}>
        <option value={0}>Не указано</option>
        {positionsList}
    </select>
}