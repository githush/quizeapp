import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logIn } from '../../redux/authSlice/authSlice';
import { useState } from 'react';
import { VscLoading } from 'react-icons/vsc'
import { adminLogin } from '../../Services/LoginService';
import './AdminLogin.sass'


const AdminLogin = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isPending, setIsPending] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  const formSubmitHandler = data =>{
    setIsPending(true)
    adminLogin(data)
      .then((response)=>{
        dispatch(logIn({ username: response.data.username, isAdmin: response.data.isAdmin, token: response.data.token }))
        history.replace(response.data.isAdmin ? '/adminpanel' : '/')
      })
      .catch((error)=>{
        setIsPending(false)
        toast.error(error.response.data.message, {
          autoClose: 1500
        })
      })
  }



  return (
    <main className="adminlogin">
      <div className="adminlogin__content">
        <h3 className="adminlogin__title">Admin</h3>
        <form onSubmit={handleSubmit(formSubmitHandler) } className="adminglogin__form" autoComplete="off" spellCheck="false">
          <div className="adminlogin__inp-wr">
            <input type="text" defaultValue="admin@gmail.com" placeholder="Email" className={`${ errors.email && 'is-invalid' }`} {...register("email", { required: true, minLength: 4, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i })}  />
          </div>
          <div className="adminlogin__inp-wr">
            <input type="password" defaultValue="abc123" placeholder="Password" className={`${ errors.password && 'is-invalid' }`}  {...register("password", { required: true, minLength: 5 })} />
          </div>
          <button type="submit" className="adminlogin__submit-btn" >Log In{isPending && <span className="adminpanel__spinner" ><VscLoading /></span> }</button>
        </form>
        <div className="adminlogin__footer"><Link to="/" className="adminlogin__login-lnk">Back</Link></div>
      </div>
    </main>
  );
}
 
export default AdminLogin;