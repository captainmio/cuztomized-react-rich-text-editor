interface SelectProps {
  items: string[];
  className: string;
  onSelect: (value: string) => void;
}

function Select(props: SelectProps) {
  const { items, className, onSelect } = props;
  return (
    <select
      className={className}
      onChange={(event: React.FormEvent<HTMLSelectElement>) =>
        onSelect(event.currentTarget.value)
      }
    >
      {items.map((item, index) => {
        return (
          <option key={index} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
}

export default Select;
