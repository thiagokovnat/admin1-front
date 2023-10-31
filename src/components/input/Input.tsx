import "./Input.scss"


interface Props{
    title: string;
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    accept?: string;
}

export const Input = ({title, onChange, type = "text", accept}: Props) => {

    return (
        <div className="Input__Container">
            <p className="Input__Title">{title}</p>
            <input className="Input__Input" onChange={(event) => onChange(event)} type={type} accept={accept}/>
        </div>
    )
}