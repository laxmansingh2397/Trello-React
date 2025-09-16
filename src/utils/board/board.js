import getBoard from '../../api/posts';

export const fetchBoards = async () => {
    try {
        const response = await getBoard.get("members/me/boards");
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const createBoard = async (boardName) => {
    try {
        const response = await getBoard.post(`boards/?name=${encodeURIComponent(boardName)}`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }    
}