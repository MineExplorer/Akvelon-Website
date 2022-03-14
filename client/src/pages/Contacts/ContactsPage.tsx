import React from 'react';
import Header from '../../components/Header';

export default function ContactsPage() {
	return (
		<>
			<Header/>
            <>
                <p>Адрес: Россия, г. Иваново, пр. Ленина, 12Б</p>
                <a href='tel:+74932581343'>+7 (4932) 581-343</a>
                <a href='tel:+74932264340'>+7 (4932) 264-340</a>
                <a href='mailto:job@akvelon.com'>job@akvelon.com</a>
            </>
        </>
    );
}