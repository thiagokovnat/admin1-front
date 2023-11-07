import "./Input.scss";

interface Props {
  title: string;
  onChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
  errorMessage?: string;
  value?: any;
}

export const Textarea = ({
  title,
  onChange,
  style,
  errorMessage = "",
  value,
}: Props) => {
  return (
    <div className="Input__Container" style={style}>
      <p className="Input__Title">{title}</p>
      <textarea
        className={
          errorMessage !== "" ? "Input__ErrorContainer" : "Input__Input"
        }
        value={value}
        onChange={(event) => onChange(event as any)}
      />

      <p className="Input__Error">{errorMessage}</p>
    </div>
  );
};
