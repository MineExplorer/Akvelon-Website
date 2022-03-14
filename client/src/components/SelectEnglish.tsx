import { EnglishLevel } from "../data";

export default function (props: {value: number, onChange: any}) {
    return <select name="english" value={props.value} onChange={props.onChange}>
        <option value={EnglishLevel.A1}>A1</option>
        <option value={EnglishLevel.A2}>A2</option>
        <option value={EnglishLevel.B1}>B1</option>
        <option value={EnglishLevel.B2}>B2</option>
        <option value={EnglishLevel.C1}>C1</option>
        <option value={EnglishLevel.C2}>C2</option>
    </select>
}