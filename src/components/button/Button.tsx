import "./Button.scss";

interface ButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const Button = ({
  title,
  onClick,
  disabled = false,
  style,
}: ButtonProps) => {
  if (disabled) {
    return null;
  }
  return (
    <div className="Button__Container" style={style} onClick={onClick}>
      {title}
    </div>
  );
};
