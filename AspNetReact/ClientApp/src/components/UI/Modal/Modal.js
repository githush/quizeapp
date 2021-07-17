import ReactDom from 'react-dom'
import './Modal.sass'

import { FaTimes } from 'react-icons/fa'


const Modal = ({ description, closeFunc, deletePatient }) => {
  return (
    <>
      {
        ReactDom.createPortal(<div className="modal show fade">
        <div className="modal" >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button onClick={ closeFunc } type="button" className="close" data-dismiss="modal" aria-label="Close"><FaTimes /></button>
                {/* <button type="button" className="btn-close" onClick={ closeFunc }>&times;</button> */}
              </div>
              <div className="modal-body">
                <p>{ description }</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="modal-footer-delete" onClick={ deletePatient }>Yes</button>
                <button type="button" className="modal-footer-cancel" onClick={ closeFunc }>Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show"></div></div>,
        document.getElementById("patient-modal"))
      }
    </>
  );
}
 
export default Modal;