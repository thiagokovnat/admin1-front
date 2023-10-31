import { PropsWithChildren } from 'react'
import fiubaLogo from '/Logo-fiuba_big.png'
import './Layout.scss'
import { Link } from "react-router-dom"

interface Props extends PropsWithChildren{}

export const Layout = (props: Props) => {

    return <div className="Layout__Background">
        <div className="Layout__Navigator">
            <img src={fiubaLogo} alt="fiuba_logo" className="Layout__Logo"/>
            <Link to={'/'}>Home</Link>
            <div className="Layout__Separator" />
            <Link to={'/courses'}>My Courses</Link>
            <div className="Layout__Separator" />
        </div>
        {props.children}
    </div>
}