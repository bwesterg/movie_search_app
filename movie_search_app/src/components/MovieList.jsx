import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const MovieList = (props) => {
  const FavoriteComponent = props.favoriteComponent;
  return (
    <>
      {props.movies.map((movie, index)=>(
        <div key={index} className="image-container d-flex justify-content-start m-3 w-auto">
          <img src={movie.Poster} alt={`Poster image for ${movie.Title}`} />
          <div 
            className="overlay d-flex align-items-center justify-content-center"
            onClick={()=>props.handleFavoritesClick(movie)}
          >
            <FavoriteComponent />
          </div>
        </div>
      ))}
    </>
  )
}

export default MovieList
