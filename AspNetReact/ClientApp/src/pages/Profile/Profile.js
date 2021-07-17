import Modal from "../../components/UI/Modal/Modal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { logOut } from "../../redux/authSlice/authSlice";
import { deleteAccount, getProfileInfo, updateProfile } from "../../Services/AccountService";
import './Profile.sass'

const Profile = () => {

  const dispatch = useDispatch()
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [modal, setModal] = useState()
  const history = useHistory()

  const [isDataLoaded, setIsDataLoaded] = useState(false) 

  const formSubmitHandler = (data)=>{
    updateProfile(data)
      .then(()=>{
        history.push("/profile")
        toast.success('Profile Updated Successfully', {autoClose: 1000})
      })
      .catch(()=>{
        toast.error("Invalid Password!", {autoClose: 1000})
      })
  }


  useEffect(()=>{
    getProfileInfo()
      .then((res)=>{
        reset(res.data);
        setIsDataLoaded(true)
      })
      .catch((error)=>{
        console.log(error.response) 
      })
  }, [reset])


  const removeAccount = ()=>{
    deleteAccount()
      .then((res)=>{
        dispatch(logOut())
        history.replace('/')
        toast.success("Account Deleted!", {autoClose: 1000})
      })
      .catch(()=>{
        toast.error("Invalid Password!", {autoClose: 1000})
      })
  }

  const deleteAccountHandler = ()=>{
    setModal({
      title: 'Delete Account',
      description: 'Do you want to delete account?',
      closeFunc: ()=> setModal(null),
      deletePatient: removeAccount,
    })
    
  }

  return (
    <div className="profile">
      { modal && <Modal {...modal} /> }
      <button className="profile__delete-btn" onClick={ deleteAccountHandler }>Delete Account</button>
      {
        isDataLoaded && 
        <form onSubmit={handleSubmit(formSubmitHandler) } autoComplete="off" spellCheck="false">
          <input type="hidden"  className={`form-control disabled ${ errors.username && 'is-invalid' }`} {...register("username", { required: true, minLength: 4, pattern: /^[\S]+$/i })} />
          <div className="profile__inp-wr">
            <label className="form-label">FirstName</label>
            <input type="text" className={`form-control ${ errors.firstname && 'is-invalid' }`} {...register("firstname", { required: true, minLength: 2 })} />
          </div>
          <div className="profile__inp-wr">
            <label className="form-label">LastName</label>
            <input type="text" className={`form-control ${ errors.lastname && 'is-invalid' }`}  {...register("lastname", { required: true, minLength: 4 })} />
          </div>
          <div className="profile__inp-wr">
            <label className="form-label">Confirm Password</label>
            <input type="password" className={`form-control ${ errors.password && 'is-invalid' }`}  {...register("password", { required: true, minLength: 5 })} />
          </div>
          <button type="submit" className="profile-save">Update</button>
          <Link to="/" className="profile-cancel">Cancel</Link> 
        </form>
        }
    </div>
  );
}
 
export default Profile;