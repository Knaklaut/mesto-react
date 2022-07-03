import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button_visible' : ''}`
    );
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like-button ${isLiked ? 'card__like-button_active' : ''}`
    );

    function handleSelectCard() {
        props.onCardClick(props.card);
    }

    function handleLikeCard() {
        props.onCardLike(props.card);
    }

    function handleDeleteCard() {
        props.onCardDelete(props.card);
    }

    return (
        <li className="card">
            <img className="card__photo" src={ props.card.link } alt={ props.card.name } onClick={ handleSelectCard } />
            <button className={ cardDeleteButtonClassName } type="button" onClick={ handleDeleteCard } />
            <div className="card__description">
                <h2 className="card__place">{ props.card.name }</h2>
                <div className="card__like-section">
                    <button className={ cardLikeButtonClassName } type="button" onClick={ handleLikeCard } />
                    <p className="card__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;