import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import RateLimitedToast from "../components/RateLimitedToast";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import EmptyNotes from "../components/EmptyNotes";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
      setIsRateLimited(false);
    } catch (error) {
      toast.error("Error refreshing data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  //   useEffect(() => {
  //     const getNotes = async () => {
  //       try {
  //         // using fetch
  //         // const res = await fetch("http://localhost:5000/api/notes");
  //         // const data = await res.json();
  //         // console.log("data:", data);

  //         //using axios
  //         const res = await api.get("/notes");
  //         console.log("res:", res);
  //         console.log("data:", res.data);
  //         setNotes(res.data);
  //         setIsRateLimited(false);
  //       } catch (error) {
  //         console.log("error fetching notes");
  //         console.log("error:", error);
  //         if (error.response.status === 429) {
  //           setIsRateLimited(true);
  //         } else {
  //           toast.error("failed to load notes");
  //         }
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     getNotes();
  //   }, []);

  return (
    <div className="text-white px-40 py-10">
      {isRateLimited && <RateLimitedToast />}
      {/* <h1 className="text-2xl">Home page</h1> */}
      {/* <div>
        {isLoading && <p>loading notes...</p>}
        {notes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {notes.map((note) => (
              //   <NoteCard key={note._id} note={note} setNotes={setNotes} /> //with setter function we pass the setNotes down to child and update the state or we can update the ui by fetchign the notes again so we have to use another method to use get method outside the useeffect so we can pass it in the props and we call it in child componenet (NoteCard)

              <NoteCard
                key={note._id}
                note={note}
                onDeleteSuccess={fetchNotes}
              />
            ))}
          </div>
        ) : (
          <EmptyNotes />
        )}
      </div> */}

      <div>
      {/* 1. Show loader while waiting */}
      {isLoading ? (
        <p className="text-center">loading notes...</p>
      ) : (
        /* 2. Loading is finished, now check the data */
        <>
          {notes.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onDeleteSuccess={fetchNotes}
                />
              ))}
            </div>
          ) : (
            /* 3. Loading finished but no notes found */
            <EmptyNotes />
          )
          }
        </>
      )}
    </div>

    </div>
  );
};

export default Home;
