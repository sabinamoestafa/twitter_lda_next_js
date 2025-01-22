"use client";
import Link from "next/link";
import { useState } from "react";
import { IoHomeOutline, IoPowerSharp, IoSettingsOutline } from "react-icons/io5";
import { TbUsers } from "react-icons/tb";
import { MdOutlineIncompleteCircle, MdOutlinePending, MdOutlinePerson } from "react-icons/md";
import { FaList } from "react-icons/fa";
const Sidebar = () => {
  const [close, setClose] = useState(false);
  const handleCloseOpen = () => {
    setClose(!close);
  };
  return (
    <div className=" h-[100vh] shadow-xl">
      <h3 className="flex justify-center font-semibold m-2 text-2xl">
        Dashboard
      </h3>

      <ul className="flex flex-col items-center text-[15px] text-left space-y-10 mt-10">
        <Link href="/admin">
          <li className="flex items-center text-left hover:text-slate-200 cursor-pointer font-semibold ">
          <IoHomeOutline className="text-2xl mr-2" />
            Home
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
