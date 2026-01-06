import { LoaderIcon, MoveLeft, Trash2Icon } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteDetail = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setisSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  console.log({ id });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        console.log("Result:", res.data);
        setNote(res.data);
        setIsLoading(true);
      } catch (error) {
        toast.error("Failed to fetch note");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  console.log("Note", note);

  const handleDelete = async () => {
    if (!window.confirm("are you sure to delete")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      toast.error("Error deleting note");
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please provider title or content");
      return;
    }
    setisSaving(true);
    try {
      await api.put(`notes/${id}`, note);
      toast.success("Note updated");
      navigate("/");
    } catch {
      toast.error("Error updating note");
    } finally {
      setisSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-40 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-white" />
      </div>
    );
  }

  return (
    <div className="max-w-xl py-10 mx-auto space-y-8">
      <div className="flex justify-between text-white">
        <Link
          to={`/`}
          className="text-xs flex gap-2 items-center bg-gray-100/10 max-w-max px-4 py-2 rounded-full hover:bg-orange-400 hover:text-black"
        >
          <MoveLeft className="size-4" />
          Back to Home
        </Link>
        <button
          // onClick={(e) => handleDelete(e, note._id)}
          onClick={handleDelete}
          className="rounded-full hover:bg-red-500 p-2 cursor-pointer bg-red-400 flex items-center gap-1 px-4"
        >
          <Trash2Icon size={15} className="" />
          <span className="text-sm"> Delete</span>
        </button>
      </div>
      <div className="p-4 rounded-md my-4 bg-gray-50/5 space-y-4 shadow-orange-100/5 shadow-3xl">
        <div className="form-control flex flex-col gap-2">
          <label className="text-gray-400">Title</label>
          <input
            type="text"
            placeholder="Note Title"
            value={note.title}
            // value={note?.title || ""}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            className="border border-gray-700 rounded-sm p-2 text-sm focus:border-orange-200 focus:outline-0 text-white"
          />
        </div>
        <div className="form-control flex flex-col gap-2">
          <label className="text-gray-400">Content</label>
          <input
            type="text"
            placeholder="Note Content"
            value={note.content}
            // value={note?.title || ""}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
            className="border border-gray-700 rounded-sm p-2 text-sm focus:border-orange-200 focus:outline-0 text-white"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-orange-400 rounded-full px-4 py-2 max-w-max text-black text-xs"
            onClick={handleSave}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
