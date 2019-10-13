// import React from 'react'
const Modal = {

    open(){
        document.querySelector('#exampleModal').classList.add('show');
        document.querySelector('#exampleModal').style.display = "block";
      },

      close(){
        document.querySelector('#exampleModal').classList.remove('show');
        document.querySelector('#exampleModal').style.display = "none";
      }

}
export default Modal
// export default class Modal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       response: props.response,
//       modalBtnAction: props.modalBtnAction,
//       activatemodal: props.activeModal
//     }
//   }
//   render() {
//     if (this.state.activatemodal) {
//       return (
//         <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//           <div className="modal-dialog modal-dialog-centered" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="exampleModalLabel">{this.state.response[0]}</h5>
//                 <button type="button" className="close" aria-label="Close" onClick={Modal.close}>
//                   <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-warning btn-md button" onClick={this.state.modalBtnAction[1]}>{this.state.response[1]}</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )
//     }else{
//       <div></div>
//     }
//   }
// }