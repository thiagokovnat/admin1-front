import "./Input.scss";

interface Props {
  title: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  accept?: string;
  style?: React.CSSProperties;
  errorMessage?: string;
}

export const Input = ({
  title,
  onChange,
  type = "text",
  accept,
  style,
  errorMessage = "",
}: Props) => {
  return (
    <div className="Input__Container" style={style}>
      <p className="Input__Title">{title}</p>
      <input
        className={
          errorMessage !== "" ? "Input__ErrorContainer" : "Input__Input"
        }
        onChange={(event) => onChange(event)}
        type={type}
        accept={accept}
      />
      <p className="Input__Error">{errorMessage}</p>
    </div>
  );
};
