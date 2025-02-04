import React from "react";
import { useNewsContext } from "../context/NewsContext";
import NewsCard from "./NewsCard";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { state } = useNewsContext();
  const { favorites } = state;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600 mb-6 shadow-md hover:underline text-center">
        Your Favorite News
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No Favorite News</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {favorites.map((favoriteItem) => (
            <div key={favoriteItem.id} className="flex justify-center">
              <NewsCard
                id={favoriteItem.id}
                title={favoriteItem.title}
                description={favoriteItem.description}
                urlToImage={favoriteItem.urlToImage}
                section={favoriteItem.section}
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Link to="/">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105">
            Back to the News
          </button>
        </Link>
      </div>
    </div>
  );
}
