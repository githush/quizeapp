import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteQuoteById, getAllQuotes } from "../../Services/QuoteService";
import './Quotes.sass'

const Quotes = () => {
  
  const [quotes, setQuotes] = useState([])

  useEffect(()=>{
    getAllQuotes()
      .then(res => {
        setQuotes(res.data)
      })
      .catch(error=>{
        console.log(error.response)
      })
  }, [])


  const deleteQuote = (id)=>{
    deleteQuoteById(id)
      .then(() => {
        getAllQuotes()
          .then(res => {
            setQuotes(res.data)
          })
          .catch(error=>{
            console.log(error.response)
          })
      })
      .catch(error=>{
        console.log(error.response)
      })
  }

  return (
    <div className="quotes">
      <Link className="quotes__add" to="/addquote">Add Quote</Link>
      <ul className="quotes__list">
        {
          !!quotes.length && quotes.map(q => <li key={q.id} className="quotes__list-item">
            <q className="quotes__list-item-txt">{ q.text }</q>
            <div className="quotes__list-item-footer">
              <Link to={`/editquote/${q.id}`}>Edit</Link>
              <button onClick={ ()=>{ deleteQuote(q.id) } } >Delete</button>
            </div>
          </li>)
        }
      </ul>
    </div>
  );
}
 
export default Quotes;