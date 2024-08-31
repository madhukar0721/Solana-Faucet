import { Dispatch, SetStateAction, useState } from "react";

interface DropdownProps {
  isWalletProfileClicked: Boolean;
  setIsWalletProfileClicked: Dispatch<SetStateAction<Boolean>>;
  isWalletConnected: Boolean;
  setIsWalletConnected: Dispatch<SetStateAction<Boolean>>;
}
const Dropdown: React.FC<DropdownProps> = ({
  isWalletProfileClicked,
  setIsWalletProfileClicked,
  isWalletConnected,
  setIsWalletConnected,
}) => {
  const handleDisconnect = () => {
    setIsWalletConnected(false);
    console.log("hi");
  };
  return (
    <div className="relative inline-block text-left">
      {isWalletProfileClicked && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
        >
          <div
            className="py-1 text-black "
            onClick={() => {
              handleDisconnect();
            }}
          >
            Disconnect
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
