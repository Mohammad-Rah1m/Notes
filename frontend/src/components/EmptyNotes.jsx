import React from "react";
import CreateNotesBtn from "./CreateNotesBtn";
import { NotebookIcon } from "lucide-react";

const EmptyNotes = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="bg-gray-400/10 p-4 rounded-full">
        <NotebookIcon className="text-orange-300"/>
      </div>
      <p>You have not created any notes yet.</p>
      <CreateNotesBtn />
    </div>
  );
};

export default EmptyNotes;
