import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
const CreateNotesBtn = () => {
  return (
    <Link
      to={"/create"}
      className="flex gap-1 items-center text-black bg-orange-400 rounded-full px-4 py-2 max-w-max"
    >
      <PlusIcon className="size-4" />
      <span className="text-xs">Add Note</span>
    </Link>
  );
};

export default CreateNotesBtn;
