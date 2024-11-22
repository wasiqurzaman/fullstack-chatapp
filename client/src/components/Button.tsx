type ButtonProps = {
  label: string;
  type: string;
};

const Button = ({ label, type }: ButtonProps) => {
  const bgColor = type === "primary" ? "bg-blue-700" : "bg-red-500";
  return (
    <button
      className={`font-rubik py-3 mt-4 border-0 rounded-lg text-xl text-white font ${bgColor}`}
    >
      {label}
    </button>
  );
};

export default Button;
