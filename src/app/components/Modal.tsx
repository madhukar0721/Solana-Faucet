import React, { Dispatch, SetStateAction } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void; 
  solAirdrop?: number;
  setSolAirdrop?: Dispatch<SetStateAction<number>>;
  children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({
    children,
    isOpen,
    onClose,
    onSubmit,
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-1/3">
          <div className="p-4 text-black">{children}</div>
          <div className="flex justify-end p-4">
            {onSubmit && (
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={onSubmit}
              >
                Submit
              </button>
            )}
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 ml-2"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
export default Modal;
