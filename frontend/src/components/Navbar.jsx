import { Link } from "react-router";
import "../App.css";
import useUser from "../hooks/useUser";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import UpdateProfile from "./UpdateProfile";
import Loader from "./Loader";

const Navbar = () => {
  const { user, loadingUser } = useUser();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [openLogout, setOpenLogout] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="z-50 flex items-center shadow-2xl justify-between lg:py-4 py-3 border-b border-gray-800 lg:px-30 sm:px-10 px-3 bg-gray-900 sticky top-0 w-full">
      <Link to="/">
        <h1 className="font-semibold lg:text-xl text-base custom-font flex items-center gap-2 text-gray-100">
          Task Manager
        </h1>
      </Link>
      <div className="flex items-center lg:gap-10 gap-5">
        {!token && (
          <Link
            className="p-1 hover:text-blue-600 transition-all text-xs lg:text-base text-gray-100"
            to="/login"
          >
            Login
          </Link>
        )}

        {token && (
          <div>
            {!loadingUser ? (
              <img
                onClick={() => setOpen(true)}
                src={user?.avatar}
                className="w-10 h-10 cursor-pointer object-cover active:scale-95 rounded-full hover:ring-2 ring-gray-400 transition-all cursor-pointer"
                alt=""
              />
            ) : (
              <Loader/>
            )}
          </div>
        )}
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute top-17 lg:right-10 right-1 bg-gray-800 py-2 rounded-lg lg:w-70 w-60 transition-all z-50"
        >
          <div
            onClick={() => setOpenUpdateModel(true)}
            className="flex items-center gap-2 p-3 hover:bg-gray-500/20 transition-all cursor-pointer"
          >
            <img
              src={user?.avatar}
              className="w-10 h-10 rounded-full object-cover"
              alt=""
            />
            <div className="flex flex-col">
              <p className="text-gray-200">{user?.username}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>
          <p
            onClick={() => setOpenLogout(true)}
            className="mt-1 ps-4 p-2 font-semibold text-sm text-gray-100 hover:bg-red-500/20 hover:text-red-500 transition-all cursor-pointer w-full"
          >
            Logout
          </p>
        </div>
      )}

      {openUpdateModel && (
        <UpdateProfile setOpenUpdateModel={setOpenUpdateModel} />
      )}

      {openLogout && (
        <div className="absolute top-0 backdrop-blur-sm right-0 w-full h-screen flex items-center justify-center bg-black/10 z-50">
          <div className="bg-gray-800 p-5 rounded-lg space-y-5 lg:w-100 w-[95%] max-h-[95%] sm:w-[60%] overflow-auto">
            <div>
              <p className="lg:text-lg text-base text-gray-200 font-semibold">
                Are you sure you want to logout?
              </p>
              <p className="text-xs mt-1 text-gray-400">
                You will be redirected to the login page.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                className="bg-gray-700 text-sm active:scale-95 hover:bg-gray-600 transition-all text-white px-4 py-2 rounded-lg"
                onClick={() => setOpenLogout(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-700 text-sm active:scale-95 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
