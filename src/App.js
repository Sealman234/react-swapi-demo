import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  function fetchMovieHandler() {
    // 使用 fetch 透過網路取得 json
    fetch('https://swapi.dev/api/films')
      .then((res) => {
        // 回傳的 response 需要先透過 json() 轉換
        return res.json();
      })
      // 然後就能開始使用資料
      .then((data) => {
        // 只取用我們需要的資料，不要把整包 API 資料帶走，減少複雜度
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
