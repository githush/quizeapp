import './Confirmation.sass'
import { ImWarning } from 'react-icons/im';
import { Link } from 'react-router-dom';

const Confirmation = () => {
  return (
    <div className="confir">
      <div className="confir__content">
        <div className="confir__icon"><ImWarning /></div>
        <p className="confir__message"><span>Please Note:</span> Email Confirmation is not Implemented. You Can Log In without Email Confirmation.</p>
        <Link className="confir__login" to="/">Login</Link>
      </div>
    </div>
  );
}
 
export default Confirmation;