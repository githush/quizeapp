import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsers, lockUsersProfile } from '../../Services/UserService';
import './AdminPanel.sass'

const sortArrayByGender = (array)=>{
  const sorted = array.sort(function(a,b){
    if(a.gender < b.gender){
      return -1;
    }
    else if(a.gender > b.gender){
      return 1;
    }
    else {
      return 0;
    }
  })
  return sorted;
}

const AdminPanel = () => {

  const { token } = useSelector(state => state.auth)
  const [doctors, setDoctors] = useState([])
  const [filterWord, setFilterWord] = useState('')
  const isSortedByGender = useRef(false)

  useEffect(()=>{
    getAllUsers()
      .then(res => {
        setDoctors(res.data)
      })
      .catch(error=>{
        console.log(error.response)
      })
  }, [token])

  const lockDoctorsProfile = (id) => {
    lockUsersProfile(id)
      .then((res) => {
        getAllUsers()
          .then(res => {
            setDoctors(isSortedByGender.current ? sortArrayByGender(res.data) : res.data)
          })
          .catch(error=>{
            console.log(error.response)
          })
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const sortByGender = ()=>{
    setDoctors(prev => sortArrayByGender([...prev]))
    isSortedByGender.current = true 
  }

  return (
    <div className="admin-panel-wr">
    
    <div className='admin-panel'>

      <div className="admin-bottom">
        {
          !!doctors.length && <>
            <div className="admin-input-wr">
              <input spellCheck="false" type="text" placeholder="Filter Users..." value={filterWord} onChange={ (e)=> setFilterWord(e.target.value.trim()) } />
              <button className="admin__clear-btn" onClick={ () => setFilterWord('') }>Clear Input</button>
              <button className="admin__sort-btn" onClick={ sortByGender }>Sort By Gender{ isSortedByGender.current ? '(sorted)' : '' }</button>
            </div>
            <ul className="admin-list">
              { doctors.filter(d => d.username.includes(filterWord)).map((doctor)=> (
                <li className="admin-list-item" key={ doctor.id }>
                  <div className="admin-list-item-lnk">
                    <h5 className="admin-list-item-name">{ doctor.username }</h5>
                    <span>{ doctor.gender }</span>
                    <Link to={`/reviewgames/${doctor.id}`}>Review user's game</Link>
                    <button onClick={ ()=> lockDoctorsProfile(doctor.id)} className={ `admin-list-item-status ${ doctor.isLocked ? 'inactive' : ''}`}>{ doctor.isLocked ? 'Enable Account' : 'Disable Account' }</button>
                  </div>
                </li>)) 
              }
            </ul>
          </>
        }
      </div>
    </div>
    </div> 
  );
} 
 
export default AdminPanel;