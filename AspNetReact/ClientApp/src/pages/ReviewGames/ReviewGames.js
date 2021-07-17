import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getGameHistory } from "../../Services/GameHistoryService";
import './ReviewGames.sass'

const ReviewGames = () => {

  const { id } = useParams()
  const [history, setHistory] = useState([])
  const isDataLoaded = useRef(false)

  useEffect(()=>{
    getGameHistory(id)
      .then(res =>{
        isDataLoaded.current = true;
        setHistory(res.data)
      })
  }, [id])

  return (
    <div className="review-game">
      <Link to="/adminpanel" className="review-game__back">Back</Link>
        {
          !!history.length && <ul className="review-game__list">
            {
              history.map(h => (
                <li key={ h.id } className={`review-game__list-item ${ h.isCorrectAnswer ? '' : 'incorrect' }`}>
                  <q className="review-game__txt">{ h.quoteText }</q>
                  <p className="review-game__author">Author: <span>{h.realAuthorName}</span></p>
                  <span className="review-game__mode">Mode: {h.selectedAuthorName ? 'Multiple' : "Binary"}</span>
                </li>)
              )
            }
            </ul> 
        }
        { isDataLoaded.current && !history.length && <h3 className="review-game__nohistory">No History</h3> }
    </div>
  );
}
 
export default ReviewGames;