import React from "react";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
// components

import PagesDropdown from "components/Dropdowns/PagesDropdown.js";

export default function AuthNavbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { t } = useTranslation('common');
  return (
    <nav className="w-full z-40 sticky top-0 bg-white shadow-lg border-b-2 border-blue-200">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-3 px-4">
        {/* Logo and Brand */}
        <Link href="/">
          <span className="font-extrabold text-xl text-blue-800 tracking-tight flex items-center gap-2">
            <img src="/img/cleaning_world_logo_transparent.png" alt="logo" className="w-10 h-10 mr-2" />
            عالم النظافة
          </span>
        </Link>
        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          <Link href="/landing"><span className="text-blue-800 font-bold px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-900 focus:bg-blue-100 transition">الرئيسية</span></Link>
          <Link href="/profile"><span className="text-blue-800 font-bold px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-900 focus:bg-blue-100 transition">حسابي</span></Link>
          <Link href="/auth/login"><span className="text-blue-800 font-bold px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-900 focus:bg-blue-100 transition">تسجيل الدخول</span></Link>
        </div>
      </div>
    </nav>
  );
}
