interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}
const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <>
      <div
        className="border-2 p-3 cursor-pointer w-36 text-center bg-slate-900 border-slate-950 rounded-md flex justify-center items-center"
        onClick={onClick}
      >
        {children}
      </div>
    </>
  );
};

export default Button;
