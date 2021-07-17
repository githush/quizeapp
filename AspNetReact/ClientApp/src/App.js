import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/NavBar/Navbar';
import Login from './pages/Login/Login';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import './App.sass';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Register/Register';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import Profile from './pages/Profile/Profile';
import { ToastContainer } from 'react-toastify';
import Quotes from './pages/Quotes/Quotes';
import EditQuote from './pages/EditQuote/EditQuote';
import AddQuote from './pages/AddQuote/AddQuote';
import Quiz from './pages/Quiz/Quiz';
import Settings from './pages/Settings/Settings';
import ReviewGames from './pages/ReviewGames/ReviewGames';
import Confirmation from './pages/Confirmation/Confirmation';

const App = ()=>{ 

  const { isLoggedIn, isAdmin } = useSelector(state => state.auth)

  return (
    <div className='app'>
       { isLoggedIn && <Navbar /> }
      
        <Switch>
          {
            !isLoggedIn &&
              <Route path='/' exact>
                <Login />
              </Route>
          }

          {
            !isLoggedIn &&
              <Route path='/adminLogin'>
                <AdminLogin />
              </Route>
          }

          { 
            isLoggedIn && isAdmin && 
              <Route path='/' exact>
                <Redirect to="/adminPanel" />
              </Route> 
          }

          { 
            isLoggedIn && isAdmin && 
              <Route path='/reviewgames/:id' exact>
                <ReviewGames />
              </Route> 
          }

          { 
            isLoggedIn && !isAdmin && 
              <Route path='/' exact>
                <Quiz />
              </Route> 
          }

          { 
            isLoggedIn && !isAdmin && 
              <Route path='/settings'>
                <Settings />
              </Route> 
          }


          { 
            isLoggedIn && isAdmin && 
              <Route path='/quotes'>
                <Quotes />
              </Route> 
          }

          { 
            isLoggedIn && isAdmin && 
              <Route path='/editquote/:id'>
                <EditQuote />
              </Route> 
          }

          { 
            isLoggedIn && isAdmin && 
              <Route path='/addquote'>
                <AddQuote />
              </Route> 
          }

          { 
            isLoggedIn && isAdmin && 
              <Route path='/adminPanel'>
                <AdminPanel />
              </Route> 
          }

          { 
            isLoggedIn && !isAdmin && 
              <Route path="/profile">
                <Profile />
              </Route>
          }      

          <Route path="/noconfirmation">
            <Confirmation />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path='*'>
            <NotFound />
          </Route>

        </Switch>

        <ToastContainer />
      
    </div>
  );
}

export default App;