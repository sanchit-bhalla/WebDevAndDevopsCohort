interface PropType {
  size: "sm" | "lg";
  placeholder: string;
  type?: string;
  value: string;
  onChange: (room: string) => void;
}

export function TextInput({
  placeholder,
  type,
  size,
  value,
  onChange,
}: PropType) {
  return (
    <input
      type={type ? type : "text"}
      placeholder={placeholder}
      style={{
        padding: size === "lg" ? 20 : 10,
        margin: size === "lg" ? 20 : 10,
        borderColor: "black",
        borderWidth: 1,
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    ></input>
  );
}
