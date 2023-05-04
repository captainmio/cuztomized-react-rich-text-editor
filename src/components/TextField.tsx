interface TextFieldProps {
  type: string;
  className?: string;
  onChange: (value: string) => void;
}

function TextField(props: TextFieldProps) {
  const { type, className, onChange } = props;
  return (
    <input
      type={type}
      className={className}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

export default TextField;
