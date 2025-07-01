import React from "react";
import { createPopper } from "@popperjs/core";
import { useTranslation } from 'next-i18next';
import { useAuth } from '../../utils/AuthContext';
import { useRouter } from 'next/router';

const UserDropdown = () => {
  const { t } = useTranslation('common');
  const { user, userName, userAvatar, signOut } = useAuth();
  const router = useRouter();
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const handleLogout = async () => {
    await signOut();
    router.push('/auth/login');
  };
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            {userAvatar && <img src={userAvatar} alt="avatar" className="w-full rounded-full align-middle border-none shadow-lg" />}
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {user ? (
          <>
            <div className="px-4 py-2 text-sm text-blueGray-700 font-bold border-b border-blueGray-100 flex items-center">
              {userAvatar && <img src={userAvatar} alt="avatar" className="w-6 h-6 rounded-full mr-2" />}
              <i className="fas fa-user-circle mr-2"></i>
              {userName || user.email}
            </div>
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
              <i className="fas fa-sign-out-alt mr-2"></i> Logout
            </button>
          </>
        ) : (
          <>
            <a href="/auth/login" className="block px-4 py-2 text-sm text-blueGray-700 hover:bg-blueGray-50">
              <i className="fas fa-sign-in-alt mr-2"></i> Login
            </a>
            <a href="/auth/register" className="block px-4 py-2 text-sm text-blueGray-700 hover:bg-blueGray-50">
              <i className="fas fa-user-plus mr-2"></i> Register
            </a>
          </>
        )}
      </div>
    </>
  );
};

export default UserDropdown;
