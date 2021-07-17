import { useDispatch, useSelector } from "react-redux";
import { toggleGameMode } from "../../redux/gameSlice/gameModeSlice";
import './Settings.sass'

const Settings = () => {
  const isMultipleModeEnabled = useSelector(state => state.gameMode.isMultipleModeEnabled)
  const dispatch = useDispatch()

  return (
    <div className="settings">
      <h3 className="settings__title">Change Game Mode</h3>
      <div className="settings__switch-options">
        <span className={`settings__switch-option ${ !isMultipleModeEnabled ? 'active' : '' }`}>Binary</span>
        <div className="settings__switch" onClick={()=>{ dispatch(toggleGameMode()) }}>
          <span className={`settings__switch-slider ${ isMultipleModeEnabled ? 'multiple' : '' }`}></span>
        </div>
        <span className={`settings__switch-option ${ isMultipleModeEnabled ? 'active' : '' }`}>Multiple</span>
      </div>
    </div>
  );
}
 
export default Settings;