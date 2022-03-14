import React from 'react';
import Header from '../../components/Header';
import officeImage1 from '../../images/office1.png'; 
import officeImage2 from '../../images/office2.png'; 

export default function InfoPage() {
	return (
		<>
			<Header/>
			<div style={{maxWidth: '800px', textAlign: 'left'}}>
				<p>
					C 2000 года мы разрабатываем программное обеспечение для технологических и 
					телекоммуникационных гигантов по всему миру. Работаем с Microsoft, Intel, 
					HP, Reddit, Pinterest, AT&T, T-Mobile, Starbucks. Офис в Иванове открыт в 
					2006 году. Много лет подряд мы подтверждаем статус Microsoft Gold Certified 
					Partner. Все это позволяет нам постоянно быть на пике инновационных технологий в разработке.
				</p>
				<br/>
				<p>
					По версии «USA Today» компания Akvelon уже на протяжении нескольких лет входит в 
					список 50-ти лучших компаний в номинациях: «Best Leadership Teams», «Best Company Culture», 
					«Best Company Compensation».
				</p>
				<br/>
				<h3>Наш офис</h3>
				<img src={officeImage1} style={{maxWidth: '600px'}}></img>
				<img src={officeImage2} style={{maxWidth: '600px'}}></img>
			</div>
        </>
    );
}