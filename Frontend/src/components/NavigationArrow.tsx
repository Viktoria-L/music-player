import React from "react";
import { useNavigate } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";

export const NavigationArrow = () => {
  const navigate = useNavigate();

  return (
    <span className="flex items-center ml-6">
      <MdChevronLeft
        onClick={() => navigate(-1)}
        className="text-3xl cursor-pointer rounded-full bg-teal"
      />
    </span>
  );
};
