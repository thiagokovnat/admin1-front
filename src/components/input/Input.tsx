import "./Input.scss";

interface Props {
  title: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  accept?: string;
  style?: React.CSSProperties;
  errorMessage?: string;
  value?: any;
}

export const Input = ({
  title,
  onChange,
  type = "text",
  accept,
  style,
  errorMessage = "",
  value
}: Props) => {
  return (
    <div className="Input__Container" style={style}>
      <p className="Input__Title">{title}</p>
      <input
        className={
          errorMessage !== "" ? "Input__ErrorContainer" : "Input__Input"
        }
        value={value}
        onChange={(event) => onChange(event)}
        type={type}
        accept={accept}
      />
      <p className="Input__Error">{errorMessage}</p>
    </div>
  );
};
