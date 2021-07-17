import { useEffect, useState } from "react"
import { getRandQuote, sendAnswer } from "../../Services/QuizService"
import { BsArrowRightShort } from 'react-icons/bs'
import './MultipleMode.sass'

const MultipleMode = () => {

  const [quote, setQuote] = useState()
  const [authors, setAuthors] = useState()
  const [isAuthorSelected, setIsAuthorSelected] = useState()

  useEffect(()=>{
    getRandQuote()
      .then((res)=>{
        setQuote(res.data.quote)
        setAuthors(res.data.authors)
      })
      .catch((res)=>{
        console.log(res)
      })
  }, [])

  const showNextQuoteHandler = ()=>{
    getRandQuote()
      .then((res)=>{
        setQuote(res.data.quote)
        setAuthors(res.data.authors)
        setIsAuthorSelected(null)
      })
      .catch((res)=>{
        console.log(res)
      })

  }

  const clickAuthorHandler = (id)=>{
    if(isAuthorSelected)
      return

    const data = {
      quoteId: quote.id,
      selectedAuthorsId: id,
    }

    sendAnswer(data)
      .then((res)=>{
        const newData = {
          authorName: res.data.realAuthorName,
          authorId: res.data.realAuthorId,
          selectedAuthorsId: id,
        }
        if(res.data.isAnswerCorrect){
          newData.isCorrect = true;
          newData.message = `Correct! The right answer is: ${res.data.realAuthorName}`;
        } else {
          newData.isCorrect = false;
          newData.message = `Sorry, you are wrong! The right answer is: ${res.data.realAuthorName}`;
        }
        setIsAuthorSelected(newData)
      })
  }

  return (
    <div className="multiple-mode">
       <h3 className="multiple-mode__title">Who said it?</h3>
       { isAuthorSelected ? <p className={`multiple-mode__message ${ !isAuthorSelected.isCorrect ? 'incorrect': ''}`}>{ isAuthorSelected ? isAuthorSelected.message : null }</p> : null }
        { quote && <q className="multiple-mode__text">{quote.text}</q> }
        {
          authors && <ul className="multiple-mode__options">
            { authors.map(a => <li key={a.id} className={ `multiple-mode__option 
            ${ isAuthorSelected && (isAuthorSelected.authorId === a.id) ? 'correct-answer' : '' } 
            ${ isAuthorSelected && (isAuthorSelected.selectedAuthorsId === a.id) && !isAuthorSelected.isCorrect ? 'incorrect-answer' : '' }`} onClick={()=> clickAuthorHandler(a.id)}><BsArrowRightShort /> { a.fullName }</li>) }
          </ul>
        }
      { isAuthorSelected ? <p className="multiple-mode__author">Author: <span>{isAuthorSelected.authorName}</span></p>  : null }
      { isAuthorSelected && <div className="multiple-mode__nextbtn-wr"><button className="multiple-mode__nextbtn" onClick={ showNextQuoteHandler }>Next</button></div>  } 
    </div>
  );
}
 
export default MultipleMode;