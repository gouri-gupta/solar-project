import { useContext, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AdminContext } from '../context/AdminAuthContext'
import logo_cropped from "../assets/logo/logo_cropped.png"

const Navbar = () => {
    const { t, i18n } = useTranslation()
    const { isLogged, logoutAdmin } = useContext(AdminContext)

    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="bg-[#003366] text-white">

            <div className="flex items-center justify-between px-6 h-20">

                {/* Logo */}
                <Link to="/">
                    <img src={logo_cropped} alt="logo" className="h-14 w-auto object-contain"/>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-8">
                    <li>
                        <NavLink to="/services" className="hover:text-[#FDB813] hover:underline">
                            {t("services")}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/walloftrust" className="hover:text-[#FDB813] hover:underline">
                            {t("wallOfTrust")}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/faq" className="hover:text-[#FDB813] hover:underline">
                            {t("faq")}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/calculator" className="hover:text-[#FDB813] hover:underline">
                            {t("calculator")}
                        </NavLink>
                    </li>

                    <li>
                        {
                            isLogged ? (
                                <NavLink to="/admindashboard" className="hover:text-[#FDB813] hover:underline">
                                    Admin Dashboard
                                </NavLink>
                            ) : (
                                <NavLink to="/contact" className="hover:text-[#FDB813] hover:underline">
                                    {t("contact")}
                                </NavLink>
                            )
                        }
                    </li>
                </ul>

                {/* Right Section */}
                <div className="hidden md:flex items-center gap-6">

                    {/* Language Switch */}
                    <div className="flex items-center gap-2">
                        <button onClick={() => i18n.changeLanguage("en")} className="hover:text-[#FDB813]">
                            EN
                        </button>

                        <span>|</span>

                        <button onClick={() => i18n.changeLanguage("hi")} className="hover:text-[#FDB813]">
                            हिन्दी
                        </button>
                    </div>

                    {/* Login / Logout */}
                    {
                        isLogged ? (
                            <button
                                onClick={logoutAdmin}
                                className="px-3 py-2 bg-[#FDB813] rounded-lg text-[#003366] font-bold hover:bg-[#003366] hover:text-white border border-transparent hover:border-white transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="px-3 py-2 bg-[#FDB813] rounded-lg text-[#003366] font-bold hover:bg-[#003366] hover:text-white border border-transparent hover:border-white transition"
                            >
                                Login
                            </Link>
                        )
                    }
                </div>

                {/* Hamburger Button */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-[#003366]">

                    <NavLink to="/services">{t("services")}</NavLink>
                    <NavLink to="/walloftrust">{t("wallOfTrust")}</NavLink>
                    <NavLink to="/faq">{t("faq")}</NavLink>
                    <NavLink to="/calculator">{t("calculator")}</NavLink>

                    {
                        isLogged ? (
                            <NavLink to="/admindashboard">Admin Dashboard</NavLink>
                        ) : (
                            <NavLink to="/contact">{t("contact")}</NavLink>
                        )
                    }

                    {/* Language */}
                    <div className="flex gap-4 pt-2">
                        <button onClick={() => i18n.changeLanguage("en")}>EN</button>
                        <button onClick={() => i18n.changeLanguage("hi")}>हिन्दी</button>
                    </div>

                    {/* Login / Logout */}
                    {
                        isLogged ? (
                            <button
                                onClick={logoutAdmin}
                                className="px-3 py-2 bg-[#FDB813] rounded-lg text-[#003366] font-bold "
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="px-3 py-2 bg-[#FDB813] rounded-lg text-[#003366] font-bold"
                            >
                                Login
                            </Link>
                        )
                    }

                </div>
            )}

        </nav>
    )
}

export default Navbar