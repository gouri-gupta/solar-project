import {useContext} from 'react'
import { NavLink,Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RiLoginBoxFill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";
import logo from "../assets/logo/logo.png"
import { AdminContext } from '../context/AdminAuthContext';

const Navbar = () => {
    const { t, i18n } = useTranslation();

    let {isLogged,logoutAdmin}=useContext(AdminContext)

    return (
        <>
        <Link to="/"><img src={logo} alt="" /></Link>
        {/*Here Logo of the business will appear.Whenever user clicks on this logo then user will be navigated to Home page */}
        <ul>
            <li>
                <NavLink to="/services">{t("services")}</NavLink>
            </li>
            <li>
                <NavLink to="/walloftrust">{t("wallOfTrust")}</NavLink>
            </li>
            <li>
                <NavLink to="/faq">{t("faq")}</NavLink>
            </li>
            <li>
                <NavLink to="/calculator">{t("calculator")}</NavLink>
            </li>
            <li>
                {
                    isLogged ? (
                        <NavLink to="#">Admin Dashboard</NavLink>
                    ) :
                    (
                        <NavLink to="/contact">{t("contact")}</NavLink>
                    )
                }
            </li>
        </ul>

        {/*The below given are the log in and log out options for ADMIN Initially RiLoginBoxFill with red colour will appear when 
        the admin  has not logged in When the Admin logs in then  RiLogoutBoxFill with green colour for a logout option for Admin */}
         {
            isLogged ? (
                <button onClick={logoutAdmin}>Logout</button>
            ) : 
            (
                <button><Link to="/login">Login</Link></button>
            )
         }
         
        </>
    )
}

export default Navbar
