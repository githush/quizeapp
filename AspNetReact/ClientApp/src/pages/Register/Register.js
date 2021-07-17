import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VscLoading } from "react-icons/vsc";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllGenders } from "../../Services/GenderService";
import { registerUser } from "../../Services/RegisterService";
import './Register.sass'

const Register = () => {

  const [isPending, setIsPending] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ genders, setGenders ] = useState([])

  const history = useHistory()

  const formSubmitHandler = (data)=>{
    setIsPending(true)
    registerUser(data)
      .then(()=>{
        toast.success('Registered Successfully', {
          autoClose: 1500
        })
        history.replace('/noconfirmation')
      })
      .catch((error)=>{
        setIsPending(false)
        if(error.response.status === 400){
          toast.error('User already exists', {
            autoClose: 1500
          })
        }
      })
  }

  useEffect(()=>{
    getAllGenders()
      .then((response)=>{
        setGenders(response.data)
      })
      .catch((error)=>{
        console.log(error.response)
      })
  }, [])

  return (
    <main className="register">
      <div className="register__content">
        <h3 className="register__title">Register</h3>
        <form onSubmit={handleSubmit(formSubmitHandler) } className="register__form" autoComplete="off" spellCheck="false">
          <div className="register__inp-wr">
            <label>Email</label>
            <input type="text"  className={`${ errors.email && 'is-invalid' }`}  {...register("email", { required: true, minLength: 4, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g })} />
          </div>
          <div className="register__inp-wr">
            <label>Password</label>
            <input type="password"  className={`${ errors.password && 'is-invalid' }`} {...register("password", { required: true, minLength: 5 })} />
          </div>
          <div className="register__inp-wr">
            <label>Gender</label>
            <select className={`${ errors.genderId && 'is-invalid' }`} {...register("genderId", { required: true })}>
              <option value="" defaultChecked>Choose</option>
              { !!genders.length && genders.map((gender, index)=> <option key={index} value={ gender.id }>{ gender.genderType }</option>) }
            </select>
          </div>
          <button type="submit" className="register__submit" >Register{ isPending && <span className="register__spinner" ><VscLoading /></span> }</button>
        </form>
        <div className="register__footer"><Link to="/" className="register__back-lnk">Cancel</Link></div>
      </div>
    </main>
  );
}
 
export default Register;