import "./Input.scss";

interface Props {
  title: string;
  onChange:
    | ((value: React.ChangeEvent<HTMLInputElement>) => void)
    | ((value: React.ChangeEvent<HTMLTextAreaElement>) => void);
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
  value,
}: Props) => {
  return (
    <div className="Input__Container" style={style}>
      <p className="Input__Title">{title}</p>
      {type === "longtext" ? (
        <textarea
          className="Input__Input"
          style={{ height: 200 }}
          onChange={(event) => onChange(event as any)}
        />
      ) : (
        <>
          <input
            className={
              errorMessage !== "" ? "Input__ErrorContainer" : "Input__Input"
            }
            value={value}
            onChange={(event) => onChange(event as any)}
            type={type}
            accept={accept}
            multiple={type === "longtext"}
          />
          <p className="Input__Error">{errorMessage}</p>
        </>
      )}
    </div>
  );
};
