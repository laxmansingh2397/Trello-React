import { useState, useEffect } from 'react';
import '../checklist/CheckList.css'
import { fetchAllChecklist, createChecklist, deleteChecklist } from '../../utils/checklist/checklist';
import CheckItem from '../checkItem/CheckItem';

const CheckList = (props) => {
    const [checklist, setChecklist] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [checklistName, setChecklistName] = useState("");

    const getAllChecklists = async () => {
        try {
            const res = await fetchAllChecklist(props.cardId);
            setChecklist(res);
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong")
        }
    }

    const createChecklistHandler = async () => {
        if (checklistName.trim().length <= 0) return;
        try {
            await createChecklist(props.cardId, checklistName);
            getAllChecklists();
            setChecklistName("");
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    }

    const deleteChecklistHandler = async (checklistId) => {
        try {
            await deleteChecklist(checklistId);
            await getAllChecklists();
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    }

    useEffect(() => {
        getAllChecklists();
    }, [])

    return (
        <>
            <div className="modal">
                <div>
                    <div>
                        <input type="text" value={checklistName} onChange={(e) => setChecklistName(e.target.value)} placeholder='Add a checklist*' />
                    </div>
                    <div>
                        <div>
                            <button onClick={createChecklistHandler} className='add-checklist-btn'>+ Add Checklist</button>
                        </div>
                        <div>
                            <button>Cancle</button>
                        </div>
                    </div>
                </div>
                <div>

                    {checklist?.map(item =>
                        <div key={item.id}>
                            <div className='checklist-div'>
                                <div>{item.name}</div>
                                <div>
                                    <button onClick={() => deleteChecklistHandler(item.id)}>Delete</button>
                                </div>
                            </div>
                            <div>
                                {<CheckItem checklistId={item.id} cardId={props.cardId}/>}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default CheckList;