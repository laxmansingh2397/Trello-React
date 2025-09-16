import getBoard from '../../api/posts'

export const fetchAllChecklist = async (cardId) => {
    try {
        const response = await getBoard.get(`cards/${cardId}/checklists`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const createChecklist = async (cardId, checklistName) => {
    try {
        const response = await getBoard.post(`checklists?idCard=${cardId}&name=${checklistName}`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const deleteChecklist = async (checlistId) => {
    try {
        const response = await getBoard.delete(`checklists/${checlistId}`);
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}