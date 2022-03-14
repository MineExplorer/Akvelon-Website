import { useNavigate } from "react-router";
import { Position } from "../../data";
import './PositionItem.css';

export interface PositionItemProps {
    position: Position;
}

export default function PositionItem({ position }: PositionItemProps) {
    let navigate = useNavigate();

    function redirectTo() { 
        let path = `../application/${position.id}`; 
        navigate(path);
      }

    return <section>
        <h3>{position.title}</h3>
        <a>Знание технологий: {position.techStack}</a>
        <a>Описание</a>
        <a>{position.description || 'Без описания'}</a>
        <button onClick={redirectTo}>Перейти к вакансии</button>
    </section>
}
