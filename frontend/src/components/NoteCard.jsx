import { PenSquareIcon, Trash2, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formateDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes, onDeleteSuccess }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of navigation
    console.log("dlt btn pressed");
    if (!window.confirm("are you sure to delete")) return;
    try {
      // console.log("deleted note")
      await api.delete(`/notes/${id}`);
      // setNotes((prev)=> prev.filter(note=>note._id!==id)) //get rid of deleted one and does not require us to refresh the page the another way is to refetch again
      onDeleteSuccess();
      toast.success("note deleted successfully");
    } catch (error) {
      console.log("error deleting");
      toast.error("failed to delete note");
    }
  };
  return (
    <Link to={`note/${note._id}`} className="p-4 rounded-md border-t-2 border-amber-400 bg-gray-50/5 space-y-4">
      <div>
        <h3 className="text-lg">{note.title}</h3>
        <p className="text-sm text-gray-400">{note.content}</p>
      </div>
      <div className="flex justify-between">
        {/* <p>{note.createdAt}</p> */}
        <p className="text-sm text-gray-400">{formateDate(new Date(note.createdAt))}</p>
        <div className="flex items-center gap-2">
          <PenSquareIcon size={15}/>
          <button onClick={(e) => handleDelete(e, note._id)} className="rounded-full hover:bg-gray-100/10 p-2 cursor-pointer">
            <Trash2Icon size={15} className="text-red-400"/>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
