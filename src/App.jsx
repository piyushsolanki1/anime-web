import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Search from "./components/search";
import Spinner from "./components/Spinner";
import AnimeCard from "./components/AnimeCard";
import { getTrendingAnimes, updateSearchCount } from "./appwrite";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trendingAnimes, setTrendingAnimes] = useState([]);

  useDebounce(() => setDebouncedTerm(searchTerm), 300, [searchTerm]);

  const fetchAnimes = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint =
        query.length > 1
          ? `https://api.jikan.moe/v4/anime?q=${query}&limit=5`
          : "https://api.jikan.moe/v4/top/anime?limit=5";

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();

      if (!data.data || data.data.length === 0) {
        setErrorMessage("No results found.");
        setAnimeList([]);
        return;
      }

      setAnimeList(data.data || []);

      if (query && data.data.length > 0) {
        await updateSearchCount(query, data.data[0]);
      }
    } catch (error) {
      console.error(`Error fetching Animes: ${error}`);
      setErrorMessage(
        error.message || "Error fetching Animes. Please try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingAnimes = async () => {
    try {
      const animes = await getTrendingAnimes();

      setTrendingAnimes(animes);
    } catch (error) {
      console.error(`Error fetching Animes: ${error}`);
    }
  };

  useEffect(() => {
    // if (debouncedTerm.length > 1 || debouncedTerm === "") {
    fetchAnimes(debouncedTerm);
  }, [debouncedTerm]);

  useEffect(() => {
    loadTrendingAnimes();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <h1>
            Find <span className="text-gradient">Animes</span> You'll Enjoy
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingAnimes.length > 0 && (
          <section className="trending-animes">
            <h2>Trending Animes</h2>
            <ul>
              {trendingAnimes.map((anime, index) => (
                <li key={anime.$id}>
                  <p>{index + 1}</p>
                  <img src={anime.poster_url} alt="" />
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="all-animes">
          <h2>
            {debouncedTerm ? `Results for "${debouncedTerm}"` : "Top Animes"}
          </h2>

          {isLoading && animeList.length === 0 ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-700">{errorMessage}</p>
          ) : (
            <ul>
              {animeList.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
