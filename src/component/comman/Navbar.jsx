

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import NavbarLinks from "../../data/navbar-links";
import { Link } from "react-router-dom";
import { matchPath, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/api";
import { MdKeyboardArrowDown} from "react-icons/md";
import { PiDotsThreeOutlineVerticalDuotone } from "react-icons/pi";
import { setUserauth } from "../../Slices/authSlice";
import '../../App.css'
function Navbar() {
    let { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useOnClickOutside(ref, () => setOpen(false));

    useEffect(() => {
        if (!user) {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            dispatch(setUserauth(JSON.parse(storedUser))); // Update Redux store with user data
          }
        }
      }, [user, dispatch]);

    const { token } = useSelector((state) => state.auth);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();

    const [sublinks, setSubLinks] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result?.data?.data || []);
        } catch (error) {
            console.error("Could not fetch the category list:", error.message);
        }
    };

    useEffect(() => {
        fetchSublinks();
    }, []);

    const matchRoute = (route) => matchPath({ path: route }, location.pathname);

    return (
        <div className="w-full bg-[#000814] border-b border-[#2C333F] fixed z-50">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <Link to="/" className="h-8 w-40">
                    <img src={logo} alt="Logo" />
                </Link>

                {/* Mobile Hamburger Icon */}
                <div className="min-850:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-[#DBDDEA] transition-transform duration-300"
                    >
                        <PiDotsThreeOutlineVerticalDuotone
                            size={24}
                            className={`${isMobileMenuOpen ? "rotate-90 duration-700" : "rotate-0 duration-700"}`}
                        />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav
                    className={`flex items-center gap-6 ${isMobileMenuOpen
                            ? "flex flex-col absolute top-16 left-0 w-full bg-gradient-to-br from-[#0052D4] to-[#65C7F7] z-40 py-6 px-4"
                            : "hidden min-850:flex"
                        }`}
                >
                    <ul className="flex flex-row min-850:flex-row gap-4 text-richblack-900 min-850:text-[#DBDDEA]">
                        {NavbarLinks.map((item, idx) => (
                            <li key={idx} className="relative group">
                                {item.title === "Catalog" ? (
                                    <div className="flex items-center gap-1 cursor-pointer">
                                        <p className="hover:text-[#FFD60A]">{item.title}</p>
                                        <MdKeyboardArrowDown />
                                        <div className="absolute top-8 left-0 w-[200px] rounded-md z-50 bg-richblack-5 p-2 shadow-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            {sublinks.length ? (
                                                sublinks.map((subLink, index) => (
                                                    <Link
                                                        key={index}
                                                        to={`/catalog/${subLink.name.replace(
                                                            " ",
                                                            "-"
                                                        )}`}
                                                        className="block hover:text-richblack-700 text-richblack-500 py-1 px-2"
                                                    >
                                                        {subLink.name}
                                                    </Link>
                                                ))
                                            ) : (
                                                <p>No categories available</p>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={item?.path}
                                        className={`${matchRoute(item?.path)
                                                ? "text-[#FFD60A]"
                                                : "text-richblack-900 min-850:text-[#DBDDEA]"
                                            } hover:text-[#FFD60A] transition-all duration-200`}
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            </li>
                        ))}


                    </ul>
                </nav>

                {/* User Actions */}
                <div className="flex items-center gap-4">
                    {token && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className="relative">
                            <AiOutlineShoppingCart size={24} className="text-[#DBDDEA]" />
                            {totalItems > 0 && (
                                <span className="absolute -bottom-[5px] -right-[12px] font-bold bg-red-600 text-caribbeangreen-50 text-xs rounded-full px-1">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}
                    {!token ? (
                        <>
                            <Link to="/login">
                                <button className="btn-primary">Log in</button>
                            </Link>
                            <Link to="/signup" className="max-500:hidden">
                                <button className="btn-primary">Sign Up</button>
                            </Link>
                        </>
                    ) : (
                        <div className="text-4xl text-white">
                            <ProfileDropDown />
                            
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;











