import React, { useEffect } from "react";
import NewsCard from "./NewsCard";
import { useNewsContext } from "../context/NewsContext";
import useNews from "../hooks/useNews";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import useWeather from "../hooks/useWeather";
import Weather from "./Weather";

const NewsList = () => {
  useNews(); // Fetch news using the custom hook
  useWeather() // Fetch weather using the custom hook
  const { state, dispatch } = useNewsContext();

  const {
    news,
    loading,
    error,
    newsCategory,
    currentPage,
    itemsPerPage,
    favorites,
  } = state;

  const filteredNews =
    newsCategory === "All"
      ? news
      : news.filter((newsItem) => newsItem.sectionName === newsCategory);
  const indexOfLastNews = currentPage * itemsPerPage;
  const indexOfFirstNews = indexOfLastNews - itemsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

  const totalPages = Math.ceil(news.length / itemsPerPage);

  function handeCategoryChange(e) {
    dispatch({ type: "SET_CATEGORY", payload: e.target.value });
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {state.error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md hover:underline">
          Latest News
        </h2>

        <Link
          to="/favorites"
          className="flex items-center space-x-1 text-blue-600 hover:text-indigo-600 transition duration-300"
        >
          <MdFavorite className="text-3xl text-red-500" />
          <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-sm">
            {favorites.length}
          </span>
        </Link>
        
        <Weather />  
      </div>

      <div className="mb-4">
        <select
          value={newsCategory}
          onChange={handeCategoryChange}
          className="block w-full py-2 px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        >
          <option value="All">All</option>
          <option value="Sport">Sports</option>
          <option value="World news">World</option>
          <option value="Life and style">Business</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-6 md:grid-rows-3 md:grid-cols-2 gap-6">
        {currentNews.map((news, index) => (
          <div key={index} className="flex justify-center">
            <NewsCard
              id={news.id}
              title={news.webTitle}
              description={news.description}
              urlToImage={news.fields?.thumbnail || "default-thumbnail.jpg"}
              section={news.sectionName}
              favorites={favorites}
            />
          </div>
        ))}
      </div>

      <div className="space-x-5 m-5 p-4 bg-white rounded-lg shadow-lg flex justify-center items-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            className={`px-4 py-2 rounded-md transition-colors duration-300 ${
              currentPage === i + 1
                ? "bg-blue-800 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => dispatch({ type: "SET_PAGE", payload: i + 1 })}
            key={i}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => dispatch({ type: "NEXT_PAGE" })}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-l transition-colors duration-300 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsList;
