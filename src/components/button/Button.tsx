import './Button.scss'

interface ButtonProps {
    title: string;
    onClick: () => void;
    disabled?: boolean;
}

export const Button = ({title, onClick, disabled = false}: ButtonProps) => {
    return (
        <div className="Button__Container" onClick={onClick} >
            {title}
        </div>
    )
}