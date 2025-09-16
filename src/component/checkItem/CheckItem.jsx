import { useState, useEffect } from "react";
import { fetchCheckItem, createCheckItem, deleteCheckItem, updateCheckItem } from "../../utils/checkItem/checkItem";
import '../checkItem/CheckItem.css'

const CheckItem = (props) => {
    const [checkItem, setCheckItem] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [checkItemName, setCheckItemName] = useState("");
    // const [checked, setChecked] = useState("");
    console.log(props.cardId,props.checklistId);
    

    const getAllCheckItem = async () => {
        try {
            const res = await fetchCheckItem(props.checklistId)
            setCheckItem(res);
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    }

    const createCheckItemHandler = async () => {
        try {
            await createCheckItem(props.checklistId, checkItemName);
            await getAllCheckItem();
            setCheckItemName("");
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong")
        }
    }

    const deleteCheckItemHandler = async (checklistId, checkItemId) => {
        try {
            await deleteCheckItem(checklistId, checkItemId);
            await getAllCheckItem();
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong")
        }
    }

    const updateCheckItemHandler = async (checkItemId,newState) => {
        try {
            await updateCheckItem(props.cardId,props.checklistId,checkItemId,newState)
            await getAllCheckItem();
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    }

    useEffect(() => {
        getAllCheckItem();
    }, []);

    return (
        <>
            <div className="add-item-div">
                <div>
                    <input type="text" value={checkItemName} onChange={(e) => setCheckItemName(e.target.value)} placeholder="Add an item*" />
                </div>
                <div>
                    <button onClick={createCheckItemHandler}>+ Add Item</button>
                    <button>Cancle</button>
                </div>
            </div>
            {checkItem.map(item =>
                <div key={item.id} className="checkItem-div">
                    <div>
                        <input
                            type="checkbox"
                            checked={item.state === "complete"}
                            onChange={() => {
                                const newState = item.state === "complete" ? "incomplete" : "complete";
                                updateCheckItemHandler(item.id,newState)}
                            }/>{item.name}</div>
                    <div>
                        <button onClick={() => deleteCheckItemHandler(props.checklistId, item.id)}>Delete</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default CheckItem;