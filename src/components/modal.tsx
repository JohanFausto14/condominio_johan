import "./modal.css"; 
import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface ModalProps { isOpen: boolean; onClose: () => void; children: React.ReactNode; isSubmitting?: boolean; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, isSubmitting }) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition nodeRef={nodeRef} in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div ref={nodeRef} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative" onClick={(e) => e.stopPropagation()}>
          {/* Spinner en pantalla completa cuando se está procesando */}
          {isSubmitting && (
            <div className="fullscreen-spinner">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-blue-600" />
            </div>
          )}
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
