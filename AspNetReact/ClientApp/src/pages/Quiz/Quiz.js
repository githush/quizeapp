import BinaryMode from "../../components/BinaryMode/BinaryMode";
import { useSelector } from "react-redux";
import MultipleMode from "../../components/MultipleMode/MultipleMode";
import './Quiz.sass'

const Quiz = () => {

  const isMultipleModeEnabled = useSelector(state => state.gameMode.isMultipleModeEnabled)

  return (
    <div className="quiz">
      { isMultipleModeEnabled ? <MultipleMode /> : <BinaryMode /> }
    </div>
  );
}
 
export default Quiz;