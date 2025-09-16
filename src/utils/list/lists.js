import getBoard from '../../api/posts'


export const fetchAllListsOnBoard = async (boardId) => {
  try {
    const response = await getBoard.get(`boards/${boardId}/lists`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createList = async (listName, boardId) => {
    try {
        const response = await getBoard.post(`lists?name=${listName}&idBoard=${boardId}`);
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const deleteList = async (listId) => {
    try {
        const response = await getBoard.put(`lists/${listId}/closed`, {value : true});
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};