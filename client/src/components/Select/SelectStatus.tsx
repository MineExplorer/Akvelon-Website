import { CandidateStatus } from "../../data";

export function SelectStatus(props: {value: number, onChange: any}) {
    return <select name="status" value={props.value} onChange={props.onChange}>
        <option value={CandidateStatus.Proposed}>Предложен</option>
        <option value={CandidateStatus.Rejected}>Отклонён</option>
        <option value={CandidateStatus.Hired}>Нанят</option>
    </select>
}