import { useState, useEffect } from 'react';
import '../checklist/CheckList.css';
import { fetchAllChecklist, createChecklist, deleteChecklist } from '../../utils/checklist/checklist';
import CheckItem from '../checkItem/CheckItem';

const ChecklistModal = (props) => {
    const [checklist, setChecklist] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [checklistName, setChecklistName] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    

    const getAllChecklists = async () => {
        try {
            const res = await fetchAllChecklist(props.cardId);
            setChecklist(res);
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    };

    const createChecklistHandler = async () => {
        if (checklistName.trim().length <= 0) return;
        try {
            await createChecklist(props.cardId, checklistName);
            await getAllChecklists();
            setChecklistName("");
            setIsAdding(false);
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    };

    const deleteChecklistHandler = async (checklistId) => {
        try {
            await deleteChecklist(checklistId);
            await getAllChecklists();
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    };

    useEffect(() => {
        getAllChecklists();
    }, []);

    const handleModalClick = (e) => {
        // prevent closing when clicking inside content
        e.stopPropagation();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={handleModalClick}>
                <div className="modal-header">
                    <h4>{props.cardName}</h4>
                    <button className="close-btn" onClick={() => props.closeModal(false)} >✕</button>
                </div>

                <div className="add-item-section">
                    <button className="show-add-btn" onClick={() => setIsAdding(true)}>+ Add Checklist</button>
                    {isAdding && (
                        <div className="add-item-form">
                            <input
                                type="text"
                                value={checklistName}
                                onChange={(e) => setChecklistName(e.target.value)}
                                placeholder="Add a checklist"
                                autoFocus
                            />
                            <div className="add-item-buttons">
                                <button className="add-btn" onClick={createChecklistHandler}>+ Add Checklist</button>
                                <button className="cancel-btn" onClick={() => { setIsAdding(false); setChecklistName(""); }}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="checklist-items">
                    {checklist.map(item => (
                        <div key={item.id} className="checklist-item">
                            <div className="checklist-div">
                                <div>{item.name}</div>
                                <button className="delete-btn" onClick={() => deleteChecklistHandler(item.id)}>✕</button>
                            </div>
                            <CheckItem checklistId={item.id} cardId={props.cardId} />
                        </div>
                    ))}
                </div>

                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
};

export default ChecklistModal;
