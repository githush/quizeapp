import { useEffect, useState } from "react"
import { getRandQuote, sendAnswerBinary } from "../../Services/QuizService"
import './BinaryMode.sass'

const BinaryMode = () => {
  const [quote, setQuote] = useState()
  const [suggestedAuthor, setSuggestedAuthor] = useState()
  const [isAuthorSelected, setIsAuthorSelected] = useState()
  
  useEffect(()=>{
    getRandQuote()
      .then((res)=>{
        setQuote(res.data.quote)
        setSuggestedAuthor(res.data.authors[Math.floor(Math.random()*3)])
      })
      .catch((res)=>{
        console.log(res)
      })
  }, [])
 

  const selectAnswerHandler = (answer)=>{
    if(isAuthorSelected)
      return
    const data = {
      quoteId: quote.id,
      suggestedAuthorsId: suggestedAuthor.id,
    }
    data.IsAnswerYes = answer
    sendAnswerBinary(data)
      .then(res => {
        const newData = {
          authorName: res.data.realAuthorName,
        }
        if(res.data.isAnswerCorrect){
          newData.isCorrect = true;
          newData.message = `Correct! The right answer is: "${res.data.realAuthorName}"`;
        } else {
          newData.isCorrect = false;
          newData.message = `Sorry, you are wrong! The right answer is: "${res.data.realAuthorName}"`;
        }
        setIsAuthorSelected(newData)
      })
      .catch(res => {
        console.log(res)
      })
  }

  const getNextQuoteHandler = ()=>{
    getRandQuote()
      .then((res)=>{
        setQuote(res.data.quote)
        setSuggestedAuthor(res.data.authors[Math.floor(Math.random()*3)])
        setIsAuthorSelected(null)
      })
      .catch((res)=>{
        console.log(res)
      })
  }

  return (
    <div className="binary-mode">
      <h3 className="binary-mode__title">Who said it?</h3>
      { isAuthorSelected ? <p className={`binary-mode__message ${ !isAuthorSelected.isCorrect ? 'incorrect': ''}`}>{ isAuthorSelected ? isAuthorSelected.message : null }</p> : null }
      { quote && <q className="binary-mode__text">{quote.text}</q> }
      { !isAuthorSelected ? <h3 className="binary-mode__question">{ suggestedAuthor && suggestedAuthor.fullName }?</h3> : null } 
      { !isAuthorSelected ? <div className="binary-mode__btns">
          <button className="binary-mode__yesbtn" onClick={()=>{ selectAnswerHandler(true) }}>Yes</button>
          <button className="binary-mode__nobtn" onClick={()=>{ selectAnswerHandler(false) }}>No</button>
        </div> : null
      }
      { isAuthorSelected ? <p className="binary-mode__author">Author: <span>{isAuthorSelected.authorName}</span></p>  : null }
      { isAuthorSelected && <div className="binary-mode__nextbtn-wr"><button className="binary-mode__nextbtn" onClick={ getNextQuoteHandler }>Next</button></div>  } 
    </div>
  );
}
 
export default BinaryMode;