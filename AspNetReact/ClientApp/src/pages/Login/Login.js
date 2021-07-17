import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logIn } from '../../redux/authSlice/authSlice';
import { VscLoading } from 'react-icons/vsc'
import { useState } from 'react';
import { login } from '../../Services/LoginService';
import './Login.sass'


const Login = () => {

  const [isPending, setIsPending] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();

  const history = useHistory()
  const dispatch = useDispatch()

  const formSubmitHandler = (data)=>{
    setIsPending(true)
    login(data)
      .then((response)=>{
        dispatch(logIn({ username: response.data.username, isAdmin: response.data.isAdmin, token: response.data.token }))
        history.replace('/')
      })
      .catch((error)=>{
        setIsPending(false)
        toast.error(error.response.data, {
          autoClose: 1500
        })
      })
  }


  return (
    <main className="login">
      <div className="login__content">
        <h3 className="login__title">Sign In</h3>
        <form onSubmit={handleSubmit(formSubmitHandler) } className="login__form" autoComplete="off" spellCheck="false">
          <div className="login__inp-wr">
            <input type="text" defaultValue="khvicha@gmail.com" placeholder="Email" className={`${ errors.email && 'is-invalid' }`} {...register("email", { required: true, minLength: 4, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g })}  />
          </div>
          <div className="login__inp-wr">
            <input type="password" defaultValue="abc123" placeholder="Password" className={`${ errors.password && 'is-invalid' }`}  {...register("password", { required: true, minLength: 5 })} />
          </div>
          <button type="submit" className="login__submit" >Log In{ isPending && <span className="login__spinner"><VscLoading /></span> }</button>
        </form>
        <div className="login__footer">
          <Link to="/adminlogin" className="login__admin-lnk">Login as Admin</Link>
          <Link to="/register" className="login__register-lnk">Register</Link>
        </div>
      </div>
    </main>
  );
}
 
export default Login;