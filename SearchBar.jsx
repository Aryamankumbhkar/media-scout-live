import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/features/SearchSlice";

const SearchBar = () => {
  const [text, setText] = useState("");

     const dispatch = useDispatch()




     const formHandler = (e)=>{
      e.preventDefault()
        dispatch(setQuery(text));

        setText("")
     }
  return (
    <div className="sticky top-0 z-50">
      <form onSubmit={formHandler} className="flex bg-emerald-900 p-10 gap-5">
        <input
          required
          value={text}
          onChange={(e)=>{
           setText(e.target.value)
          }}
          className=" w-full border-1 
          outline-none
           py-2 
           px-5 
           rounded "
          type="text"
          placeholder="Search"
        />
        <button
          className="border-1 
          active:scale-95
        outline-none
         py-2
          px-10 
          rounded 
          cursor-pointer "
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
