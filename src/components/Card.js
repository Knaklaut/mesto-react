function Card(props) {
    function handleCardClick() {
        props.onCardClick(props.card);
    }

    return (
        <li className="card">
            <img className="card__photo" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
            <button className="card__delete-button" type="button"></button>
            <div className="card__description">
                <h2 className="card__place">{props.card.name}</h2>
                <div className="card__like-section">
                    <button className="card__like-button" type="button"></button>
                    <p className="card__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;