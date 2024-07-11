import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=52a2d442`;

    const response = await fetch(url);
    const responseJson = await response.json();

    // console.log(responseJson);
    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
  };

  // IMPORTANT: 1. useEffect always gets called on the first render.
  //            2. This is an empty string at first
  //            3. getMovieRequest takes the search value and sends it to the request.
  //            4. Take the response, convert it to json, and if there
  //                are any results, they are put into state.
  //            5. When the user types, the setSearch value is called
  //               and is stored in state.
  //            6. Because the search value has changed, the useEffect hook
  //               gets triggered, and then the getMovieRequest function
  //               is called with the new searchValue, and the new searchValue
  //               is passed to the API, and the same thing happens again.

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);
  // ^^ any time searchValue changes, call getMovieRequest
  //    With the useEffect hook, any value added to the 'catch' array
  //    causes the useEffect hook to run.

  useEffect(()=>{
    const movieFavorites = JSON.parse(
      localStorage.getItem('react-movie-app-favorites')
    );
    setFavorites(movieFavorites);
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-itms-center mt-4 mb-4">
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className="row">
        <MovieList 
          movies={movies} 
          handleFavoritesClick={addFavoriteMovie} 
          favoriteComponent={AddFavorites}
        />
      </div>
      <div className="row d-flex align-itms-center mt-4 mb-4">
        <MovieListHeading heading='Favorites' />
      </div>
      <div className="row">
        <MovieList 
          movies={favorites} 
          handleFavoritesClick={removeFavoriteMovie} 
          favoriteComponent={RemoveFavorites}        
        />
      </div>
    </div>
  );
};

export default App;
