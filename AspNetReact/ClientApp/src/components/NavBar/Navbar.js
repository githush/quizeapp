import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logOut } from '../../redux/authSlice/authSlice';
import { FiLogOut, FiMenu } from 'react-icons/fi'
import './Navbar.sass'

const Navbar = () => {

  const [isNavBarOpen, setIsNavbarOpen] = useState(false)
  const { isLoggedIn, isAdmin } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()

  const logOutHandler = ()=>{
    history.replace('/')
    dispatch(logOut()) 
  }

  return (
    <nav className="navb">
      <div className="nav__container">
        <Link to={ `/${isAdmin ? 'adminpanel' : 'profile'}` } className="navb-logo" >
          Quote Quiz Game
        </Link>
        <button className={`nav-toggler ${isNavBarOpen ? 'show' : ''}`} type="button" onClick={ ()=>{ setIsNavbarOpen(p => !p) } } >
          <FiMenu />
        </button>
        <div className={`nav__content ${isNavBarOpen ? 'show' : ''}`}>
          <ul className="navbar-list">
            {
              !isLoggedIn && <li className="nav-item">
                <NavLink to="/login" className="nav-link" >Login</NavLink>
              </li>
            }
            {
              !isLoggedIn && <li className="nav-item">
                <NavLink to="/adminlogin" className="nav-link" >AdminLogin</NavLink>
              </li>
            }
            {
              isLoggedIn && isAdmin && <>
                <li className="nav-item">
                  <NavLink to="/quotes" className="nav-link" >Quotes</NavLink>
                </li>
              </>
            }
            {
              isLoggedIn && isAdmin && <>
                <li className="nav-item">
                  <NavLink to="/adminpanel" className="nav-link" >Users</NavLink>
                </li>
              </>
            }
            {
              isLoggedIn && <>
                {
                  !isAdmin && <li className="nav-item">
                    <NavLink to="/" exact className="nav-link">Quiz</NavLink>
                  </li>
                }
                {
                  !isAdmin && <li className="nav-item">
                    <NavLink to="/settings" className="nav-link">Settings Page</NavLink>
                  </li>
                }
                {
                  !isAdmin && <li className="nav-item">
                    <NavLink to="/profile" className="nav-link">Profile</NavLink>
                  </li>
                }
                <li className="nav-item">
                  <button className="logout-btn" title="LogOut" onClick={ logOutHandler }>
                  <FiLogOut /> Logout</button>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}
 
export default Navbar;