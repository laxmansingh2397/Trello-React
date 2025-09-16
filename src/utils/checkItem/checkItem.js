import getBoard from '../../api/posts'


export const fetchCheckItem = async (checkListId) => {
    try {
        const response = await getBoard.get(`checklists/${checkListId}/checkItems`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const createCheckItem = async (checkListId, CheckItemName) => {
    try {
        const response = await getBoard.post(`checklists/${checkListId}/checkItems?name=${CheckItemName}`);
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const deleteCheckItem = async (checklistId, checkItemId) => {
    try {
        const response = await getBoard.delete(`checklists/${checklistId}/checkItems/${checkItemId}`);
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const updateCheckItem = async (cardId, checkListId, checkItemId, state) => {
    try {
        const response = await getBoard.put(`cards/${cardId}/checklist/${checkListId}/checkItem/${checkItemId}?state=${state}`);
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
