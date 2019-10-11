
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
