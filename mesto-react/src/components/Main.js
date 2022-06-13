import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js';

function Main(props) {
    const [userName, setUserName] = React.useState('');
    const [userAbout, setUserAbout] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCard] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo()
        .then(userInfo => {
            setUserName(userInfo.name);
            setUserAbout(userInfo.about);
            setUserAvatar(userInfo.avatar);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
        .then(el => {
            setCard(el);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <main className="content">

            <section className="profile">
                <div className="profile__avatar-section">
                    <img className="profile__avatar" src={userAvatar} alt="Аватар пользователя" />
                    <button className="profile__change-button" type="button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <div className="profile__edit">
                        <h1 className="profile__title">{userName}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__subtitle">{userAbout}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>

            <section className="photobook">
                <ul className="photobook__elements">
                    {cards.map((el) => (
                        <Card key={el['_id']} card={el} onCardClick={props.onCardClick} />)
                    )}
                </ul>
            </section>

        </main>
    );
}

export default Main;