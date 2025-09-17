import { fetchAllListsOnBoard, createList, deleteList } from '../../utils/list/lists';
import { useState, useEffect } from 'react';
import './Lists.css';
import Cards from '../cards/Cards';

const Lists = (props) => {
    const defaultBackground = 'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/rainbow.svg';
    const backgroundImage = props.backgroundImage && props.backgroundImage !== "null" && props.backgroundImage !== "undefined"
    ? props.backgroundImage
    : defaultBackground;
    
    const [lists, getLists] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [listName, setListName] = useState("");
    const [openNewList, setOpenNewList] = useState(false);
    const getAllList = async () => {
        try {
            const res = await fetchAllListsOnBoard(props.boardId)
            console.log(res);

            getLists(res)
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    }

    const createListHandler = async () => {
        if (listName.trim().length <= 0) return;

        try {
            await createList(listName, props.boardId);
            await getAllList();
            setListName("")
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }

    }

    const deleteListHandler = async (listId) => {
        try {
            await deleteList(listId)
            await getAllList();
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    }


    useEffect(() => {
        getAllList();
    }, [])

    return (
        <div className="lists-board" style={{backgroundImage:`url(${backgroundImage})`}}>
            <div className="board-header">
                <div>
                    <div className="board-title">{props.boardName || 'Board'}</div>
                </div>
            </div>

            <div className="lists-wrap">
                {lists.map(item => (
                    <div className="list-column" key={item.id}>
                        <div className="list-header">
                            <div>
                                <div className="list-title">{item.name}</div>
                            </div>
                            <div>
                                <button className="btn btn-muted delete-btn" onClick={() => deleteListHandler(item.id)}>Delete</button>
                            </div>
                        </div>
                        <div>
                            <Cards listId={item.id} />
                        </div>
                    </div>
                ))}

                <div className="list-column">
                    <div className="list-header">
                    </div>
                    <div className="list-add">
                        {openNewList ? (
                            <>
                                <input type="text" value={listName} onChange={(e) => setListName(e.target.value)} placeholder='Enter list title' />
                                <div className="list-actions">
                                    <button className="btn btn-primary" onClick={() => { createListHandler(listName, props.boardId); setOpenNewList(false); }}>Add List</button>
                                    <button className="btn btn-muted" onClick={() => { setListName(''); setOpenNewList(false); }}>Cancel</button>
                                </div>
                            </>
                        ) : (
                            <button className="btn btn-muted" onClick={() => setOpenNewList(true)}>+ Add another list</button>
                        )}
                    </div>
                </div>
            </div>
            {errorMessage && <div style={{ color: '#b00020', padding: '8px 24px' }}>{errorMessage}</div>}
        </div>
    )
}

export default Lists
