import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllAuthors } from "../../Services/AuthorService";
import { addNewQuote } from "../../Services/QuoteService";
import './AddQuote.sass'


const AddQuote = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [authors, setAuthors] = useState([])
  const history = useHistory()


  const formSubmitHandler = (data)=>{
    addNewQuote(data)
      .then(()=>{
        toast.success('Operation Completed Successfully', {autoClose: 1000})
        history.replace('/quotes')
      })
      .catch((res)=>{
        console.log(res)
      })
  }

  useEffect(()=>{
    getAllAuthors()
      .then(res => {
        setAuthors(res.data);
      })
      .catch(error=>{
        console.log(error.response)
      }) 
  }, [])
  

  return (
    <div className="addquote">
      <form className="addquote__form" onSubmit={handleSubmit(formSubmitHandler) } autoComplete="off" spellCheck="false">
        <div className="addquote__inp-wr">
          <label>Add New Quote</label>
          <textarea type="text" className={`${ errors.text && 'is-invalid' }`} {...register("text", { required: true, minLength: 2 })}></textarea>
        </div>
        <div className="addquote__inp-wr">
          <label>Author</label>
          <select className={`${ errors.authorId && 'is-invalid' }`} {...register("authorId", { required: true })}>
            <option value="" defaultChecked>Choose</option>
            { !!authors.length && authors.map((author, index)=> <option key={index} value={ author.id }>{ author.fullName }</option>) }
          </select>
        </div>
        <button type="submit" className="addquote__save">Add</button>
        <Link to="/quotes" className="addquote__cancel">Cancel</Link> 
      </form>

    </div>
  );
}
 
export default AddQuote;