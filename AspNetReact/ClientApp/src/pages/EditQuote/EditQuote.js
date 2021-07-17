import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getQuoteById, updateQuote } from "../../Services/QuoteService";
import './EditQuote.sass'

const EditQuote = () => {

  const { id } = useParams()
  const history = useHistory()
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(()=>{
    getQuoteById(id)
      .then(res => {
        reset(res.data);
      })
      .catch(error=>{
        console.log(error.response)
      })
  }, [id, reset])

  const formSubmitHandler = (data)=>{
    updateQuote(data)
      .then((res)=>{
        toast.success('Operation Completed Successfully', {autoClose: 1000})
        history.replace('/quotes')
      })
      .catch((res)=>{
        console.log(res)
      })
  }

  return (
    <div className="quoteedit">
      <form className="quoteedit__form" onSubmit={handleSubmit(formSubmitHandler) } autoComplete="off" spellCheck="false">
        <div className="quoteedit__inp-wr">
          <label>Edit Quote</label>
          <textarea type="text" className={`${ errors.text && 'is-invalid' }`} {...register("text", { required: true, minLength: 2 })}></textarea>
        </div>
        <button type="submit" className="quoteedit__save">Update</button>
        <Link to="/quotes" className="quoteedit__cancel">Back</Link> 
      </form>

    </div>
  );
}
 
export default EditQuote;