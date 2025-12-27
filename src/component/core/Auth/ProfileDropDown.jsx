import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";
import { setUserauth } from "../../../Slices/authSlice"; // Import setUserauth action from authSlice
import { VscSignOut } from "react-icons/vsc";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard } from "react-icons/vsc";

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.auth); // Use state from authSlice
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false); // Close dropdown if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Restore user from localStorage on component mount
  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        dispatch(setUserauth(JSON.parse(storedUser))); // Update Redux store with user data
      }
    }
  }, [user, dispatch]);

  // Show a placeholder if user data is not available
  if (!user) return <div className="text-3xl text-white">au</div>;

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-x-1 py-2 px-3 rounded-md hover:bg-richblack-700 transition-all"
        onClick={() => setOpen((prev) => !prev)} // Toggle dropdown visibility
      >
        <img
          src={user?.image || "/default-avatar.png"}
          alt={`profile-${user?.firstName || "user"}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </button>
      {open && (
        <div className="absolute top-[118%] mt-1 right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 flex flex-col gap-1 py-2 transition-all opacity-100">
          <div className="flex flex-col gap-1">
            {user?.accountType !== "Student"?
            <Link
              to="/dashboard/instructor"
              className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:text-richblack-25 transition-all"
              onClick={() => setOpen(false)} // Close dropdown when link clicked
            >
              <VscDashboard className="text-lg" />
              Dashboard
            </Link> : <Link
              to="/dashboard/my-profile"
              className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:text-richblack-25 transition-all"
              onClick={() => setOpen(false)} // Close dropdown when link clicked
            >
              <VscDashboard className="text-lg" />
              Dashboard
            </Link>}
            <button
              onClick={() => {
                dispatch(logout(navigate)); // Dispatch logout action
                setOpen(false); // Close dropdown after logout
              }}
              className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 transition-all"
            >
              <VscSignOut className="text-lg" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
