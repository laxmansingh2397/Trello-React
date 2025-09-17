import { useState, useEffect } from "react";
import { fetchBoards, createBoard } from "../../utils/board/board"
import "./Boards.css";
import { Link } from 'react-router-dom'
import ListPage from "../../pages/ListPage";

function Boards() {
    const [boards, setBoards] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [boardName, setBoardName] = useState("");
    const [adding, setAdding] = useState(false);

    const getBoardsData = async () => {
        try {
            const res = await fetchBoards();
            setBoards(res || [])
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
        }
    }
    useEffect(() => {
        getBoardsData();
    }, []);

    const createBoardHandler = async (boardName) => {
        if (boardName.trim().length <= 0) return;
        try {
            setAdding(true);
            await createBoard(boardName);
            await getBoardsData();
            setBoardName("");
            setAdding(false);
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong");
            setAdding(false);
        }
    }

    const cancelHandler = () => {
        setBoardName("");
        setAdding(false);
    }

    return (
        <div className="boards-page">
            <div className="boards-header">
                <div className="boards-title">
                    <div className="logo-dot" />
                    <h2>My Boards</h2>
                </div>
            </div>

            <div className="boards-wrap">
                {boards.map((board, i) => (
                    
                    <Link key={board.id} to={`/ListPage/${board.id}/${board.name}?image=${encodeURIComponent(board.prefs.backgroundImage)}`}>
                        <div
                            key={board.id}
                            className={`board-tile board-bg-${(i % 4) + 1}`}
                            role="button"
                        >
                            <div>
                                <div className="board-title">{board.name}</div>
                                <div className="board-meta">{board.desc || ""}</div>
                            </div>
                        </div>
                    </Link>
                ))}

                <div className="board-tile board-add">
                    {!adding ? (
                        <>
                            <div className="plus">+</div>
                            <div style={{ fontSize: "0.95rem", color: "var(--muted)", fontWeight: 700 }}>Create new board</div>
                            <button className="btn btn-primary" onClick={() => setAdding(true)} style={{ marginTop: 8 }}>Add board</button>
                        </>
                    ) : (
                        <div style={{ width: "100%" }} className="add-form">
                            <input
                                type="text"
                                value={boardName}
                                onChange={(e) => setBoardName(e.target.value)}
                                placeholder="Add board title *"
                            />
                            <div className="add-actions">
                                <button className="btn btn-primary" onClick={() => createBoardHandler(boardName)}>
                                    {adding ? "Adding..." : "+ Add"}
                                </button>
                                <button className="btn btn-muted" onClick={cancelHandler}>Cancel</button>
                            </div>
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Boards;