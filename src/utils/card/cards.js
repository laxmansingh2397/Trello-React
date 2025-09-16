import getBoard from '../../api/posts'

export const fetchAllCards = async (listId) => {
    try {
        const response = await getBoard.get(`lists/${listId}/cards`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const createCard = async (listId,cardName) => {
    try {
        const response = await getBoard.post(`cards?name=${cardName}&idList=${listId}`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const deleteCard = async (cardId) => {
    try {
        const response = await getBoard.delete(`cards/${cardId}`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}