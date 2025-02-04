import React from "react";
import { Link } from "react-router-dom";
import { useNewsContext } from "../context/NewsContext";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";

const NewsCard = ({ title, description, urlToImage, id, section }) => {
  const { state, dispatch } = useNewsContext();
  const { favorites } = state;

  function toggleFavorites() {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: { id } });
    } else {
      dispatch({
        type: "ADD_FAVORITE",
        payload: { title, description, urlToImage, id, section },
      });
    }
  }

  const isFavorite = favorites.some((fav) => fav.id === id);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-[800px] h-[460px]">
      <img
        className="w-full h-[300px] object-cover rounded-md"
        src={urlToImage || "https://via.placeholder.com/800x460"}
        alt={title}
      />
      <h2 className="text-md font-semibold mt-2">
        <Link to={`/news/${id}`} className="text-blue-600 hover:underline">
          {title}
        </Link>
      </h2>
      <h3>{section}</h3>
      {isFavorite ? (
        <MdOutlineStarPurple500
          onClick={toggleFavorites}
        ></MdOutlineStarPurple500>
      ) : (
        <MdOutlineStarBorderPurple500
          onClick={toggleFavorites}
        ></MdOutlineStarBorderPurple500>
      )}

      <p className="text-sm text-gray-600 mt-2">
        {description
          ? description.slice(0, 80) + "..."
          : "No description available"}
      </p>
    </div>
  );
};

export default NewsCard;
