import React from "react";
import "./modal.css";


const Modal = ({close , children}) => {
  return (
    <>
    
    <div>
      <div className="parent-modal">
        <form action="" className={`modal`}>
          <div className="all">
          <i
            onClick={() => {
              close();
            }}
            class="fa-solid fa-xmark close"
          ></i>

          {children}
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Modal;



