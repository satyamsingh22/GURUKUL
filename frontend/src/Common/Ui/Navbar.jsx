/* eslint-disable react/prop-types */
import { FaGraduationCap } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";

export default function Navbar({ setSideBar }) {
  return (
    <div className="flex bg-blue-700  text-lg md:text-3xl font-bold text-slate-50 p-3 w-full justify-between items-center">
      <div className="px-4 flex items-center">
        <FaGraduationCap />
        <p className="px-2 md:text-3xl text-xl ">Mediversal Gurukul</p>
      </div>
      <div
        className="px-4 text-4xl hidden md:flex"
        onClick={() => {
          setSideBar((value) => !value);
        }}
      >
        <IoReorderThree />
      </div>
    </div>
  );
}
