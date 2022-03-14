import React from 'react';
import Header from '../../components/Header';
import mapImage from '../../images/map.png'; 

const ContactsText: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    position: 'relative',
    marginLeft: '20px'
}

export default function ContactsPage() {
	return (
		<>
			<Header/>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <img src={mapImage} style={{maxWidth: '500px'}}></img>
                <div style={ContactsText}>
                    <p>Адрес: Россия, г. Иваново, пр. Ленина, 12Б</p>
                    <br/>
                    <a href='tel:+74932581343'>+7 (4932) 581-343</a>
                    <a href='tel:+74932264340'>+7 (4932) 264-340</a>
                    <br/>
                    <a href='mailto:job@akvelon.com'>job@akvelon.com</a>
                </div>
            </div>
        </>
    );
}