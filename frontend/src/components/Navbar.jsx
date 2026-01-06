import React from "react";
import CreateNotesBtn from "./CreateNotesBtn";


const Navbar = () => {
  return (
    <header className="flex justify-between items-center bg-gray-950 py-3 px-40 border-b border-gray-800">
      <div>
        <h1 className="text-orange-400 text-xl font-semibold">Notes App</h1>
      </div>
      <CreateNotesBtn/>
    </header>
  );
};

export default Navbar;
