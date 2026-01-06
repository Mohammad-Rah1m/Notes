import axios from "axios";
import { MoveLeft, SendToBack, SkipBack, StepBack } from "lucide-react";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("all fields are required");
      return;
    }
    setIsLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("note created");
      navigate("/");
    } catch (error) {
      console.log("error creating note", error);

      if (error.response.status === 429) {
        return toast.error("too many requests", {
          duration: 4000,
        });
      } else {
        toast.error("failed to create a note");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="text-white max-w-md mx-auto  my-4 ">
      <Link to={`/`} className="text-xs flex gap-2 items-center bg-gray-100/10 max-w-max px-4 py-2 rounded-full hover:bg-orange-400 hover:text-black">
        <MoveLeft className="size-4" />
        Back to Home
      </Link>
      <div className="p-4 rounded-md my-4 bg-gray-50/5 space-y-4 shadow-orange-100/5 shadow-3xl">
        <h3 className="text-white text-lg font-semibold">Create a new note</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-400">Title</label>
            <input
              type="text"
              placeholder="Write note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-700 rounded-sm p-2 text-sm focus:border-orange-200 focus:outline-0"
            ></input>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-400">Content</label>
            <input
              type="text"
              placeholder="Write note content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-gray-700 rounded-sm p-2 text-sm focus:border-orange-200 focus:outline-0"
            ></input>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-orange-400 rounded-full px-4 py-2 max-w-max text-black text-xs"
            >
              {isLoading ? "Creating..." : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
