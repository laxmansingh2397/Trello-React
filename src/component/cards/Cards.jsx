import { useState, useEffect } from 'react';
import { fetchAllCards, createCard, deleteCard } from '../../utils/card/cards';
import './Cards.css';
import '../lists/Lists.css'
import CheckList from '../checklist/CheckList';

const Cards = (props) => {
    const [cards, setCards] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [cardName, setCardName] = useState("");
    const [openAddFor, setOpenAddFor] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [closeModal, setCloseModal] = useState(false);
    const [cardId, setCardId] = useState(null);
    

    const getAllCards = async () => {
        try {
            const res = await fetchAllCards(props.listId);
            setCards(res);
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    }

    const createCardHandler = async () => {
        if (cardName.trim().length <= 0) return;
        try {
            await createCard(props.listId, cardName);
            await getAllCards();
            setCardName("");
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    }

    const deleteCardHandler = async (cardId) => {
        try {
            await deleteCard(cardId);
            await getAllCards();
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    }

    useEffect(() => {
        getAllCards();
    }, [])

    return (
        <>
            
            <div className="cards-list">
                {cards.map(item =>
                    <div onClick={() => {setOpenModal(true),setCardId(item.id),setCardName(item.name)}} className="card-item" key={item.id}>
                        <div className="card-top">
                            <div className="card-title">{item.name}</div>
                            <div>
                                <button className="card-delete" onClick={(e) => {
                                    e.stopPropagation();
                                    deleteCardHandler(item.id)}
                                }>Delete</button>
                            </div>
                        </div>
                    </div>
                )}
                {errorMessage && <div style={{ color: '#b00020' }}>{errorMessage}</div>}
            </div>
            {/* per-list add area - toggle open */}
            <div className={`list-add ${openAddFor === props.listId ? 'add-open' : ''}`}>
                {openAddFor === props.listId ? (
                    <>
                        <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder='Enter card title' />
                        <div className="list-actions">
                            <button className="btn btn-primary" onClick={() => { createCardHandler(cardName, props.listId); setOpenAddFor(null); }}>+ Add</button>
                            <button className="btn btn-muted" onClick={() => { setCardName(''); setOpenAddFor(null); }}>Cancel</button>
                        </div>
                    </>
                ) : (
                    <button className="btn btn-muted" onClick={() => setOpenAddFor(props.listId)}>+ Add Card</button>
                )}
            </div>
            {openModal && <CheckList cardId={cardId} cardName={cardName}/>}
        </>
    )
}

export default Cards;
