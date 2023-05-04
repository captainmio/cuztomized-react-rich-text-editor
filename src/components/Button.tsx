interface ButtonProps {
  name: string;
  id: number;
  isActive?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick: (name: string, id: number) => void;
}

function Button(props: ButtonProps) {
  const { name, id, isActive, className, children, onClick } = props;
  return (
    <button
      className={"btn " + (className ? className : "btn-default")}
      onClick={() => onClick(name, id)}
    >
      {children}
    </button>
  );
}

export default Button;
