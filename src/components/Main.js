import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">

            <section className="profile">
                <div className="profile__avatar-section">
                    <img className="profile__avatar" src={ currentUser.avatar } alt="Аватар пользователя" />
                    <button className="profile__change-button" type="button" onClick={ props.onChangeAvatar } />
                </div>
                <div className="profile__info">
                    <div className="profile__edit">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={ props.onChangeProfile } />
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={ props.onAddPlace } />
            </section>

            <section className="photobook">
                <ul className="photobook__elements">
                    {props.cards.map((item) => (
                        <Card key={ item['_id'] } card={ item } onCardClick={ props.onCardClick } onCardLike={ props.onCardLike } onCardDelete={ props.onDeletePlace } />)
                    )}
                </ul>
            </section>

        </main>
    );
}

export default Main;