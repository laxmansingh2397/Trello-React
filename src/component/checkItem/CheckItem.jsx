import { useState, useEffect } from "react";
import { fetchCheckItem, createCheckItem, deleteCheckItem, updateCheckItem } from "../../utils/checkItem/checkItem";
import '../checkItem/CheckItem.css';

const CheckItem = (props) => {
    const [checkItem, setCheckItem] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [checkItemName, setCheckItemName] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    const getAllCheckItem = async () => {
        try {
            const res = await fetchCheckItem(props.checklistId);
            setCheckItem(res);
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    };

    const createCheckItemHandler = async () => {
        if (!checkItemName.trim()) return;
        try {
            await createCheckItem(props.checklistId, checkItemName);
            await getAllCheckItem();
            setCheckItemName("");
            setIsAdding(false);
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    };

    const deleteCheckItemHandler = async (checklistId, checkItemId) => {
        try {
            await deleteCheckItem(checklistId, checkItemId);
            await getAllCheckItem();
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    };

    const updateCheckItemHandler = async (checkItemId, newState) => {
        try {
            await updateCheckItem(props.cardId, props.checklistId, checkItemId, newState);
            await getAllCheckItem();
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    };

    useEffect(() => {
        getAllCheckItem();
    }, []);

    return (
        <div className="checklist-container">
            <div className="add-item-section">
                <button className="show-add-btn" onClick={() => setIsAdding(true)}>+ Add an item</button>
                {isAdding && (
                    <div className="add-item-form">
                        <input
                            type="text"
                            value={checkItemName}
                            onChange={(e) => setCheckItemName(e.target.value)}
                            placeholder="Add an item"
                            autoFocus
                        />
                        <div className="add-item-buttons">
                            <button className="add-btn" onClick={createCheckItemHandler}>+ Add Item</button>
                            <button className="cancel-btn" onClick={() => { setIsAdding(false); setCheckItemName(""); }}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            {checkItem.map(item => (
                <div key={item.id} className="checkItem-div">
                    <div className="checkItem-content">
                        <input
                            type="checkbox"
                            checked={item.state === "complete"}
                            onChange={() => {
                                const newState = item.state === "complete" ? "incomplete" : "complete";
                                updateCheckItemHandler(item.id, newState);
                            }}
                        />
                        <span className={item.state === "complete" ? "completed" : ""}>
                            {item.name}
                        </span>
                    </div>
                    <button className="delete-btn" onClick={() => deleteCheckItemHandler(props.checklistId, item.id)}>✕</button>
                </div>
            ))}

            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default CheckItem;
