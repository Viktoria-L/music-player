import { useNavigate } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";

export const NavigationArrow = () => {
  const navigate = useNavigate();

  return (
    <span className="flex items-center ml-2 sm:ml-8">
      <MdChevronLeft
        onClick={() => navigate(-1)}
        className="text-2xl cursor-pointer rounded-full bg-orange"
      />
    </span>
  );
};
