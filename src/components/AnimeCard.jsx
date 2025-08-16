import React from "react";
import { useState } from "react";
import starIcon from "../assets/star.svg";

const AnimeCard = ({ anime }) => {
    const { title, images, type, releaseYear, trailer, score, episodes } = anime;
    const [isLoaded, setIsLoaded] = useState(false);
    return(
  <div className="Anime-card cursor-pointer ">
    <img
      src={images?.webp?.image_url}
      alt={title}
      loading="lazy"
      decoding="async" 
      onLoad={() => setIsLoaded(true)}
      
      // className="w-full h-auto rounded-md"
    />
    <div className="mt-4">
      <h3>{title}</h3>

      <div className="content">
        <div className="text-sm text-white">
          {type || "N/A"} • {releaseYear} •{" "}
          {episodes ? `${episodes} eps` : "N/A eps"}
        </div>

        <div className="rating">
          <img src={starIcon} alt="Star-icon" />
          <p>{score ? score.toFixed(1) : "N/A"}</p>
        </div>

        {trailer?.url && (
          <a
            href={trailer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Watch Trailer
          </a>
        )}
      </div>
    </div>
  </div>
);
}
export default AnimeCard;
