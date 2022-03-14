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

    return <section className="positionItem">
        <h3>{position.title}</h3>
        <a>Знание технологий: {position.techStack}</a>
        <a>{position.description || 'Нет описания'}</a>
        <button onClick={redirectTo}>Перейти к вакансии</button>
    </section>
}
