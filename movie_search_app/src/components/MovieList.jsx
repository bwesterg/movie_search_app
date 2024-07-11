import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const MovieList = (props) => {
  console.log(props);
  return (
    <>
      {props.movies.map((movie, index)=>(
        <div key={index} className="d-flex justify-content-start m-3">
          <img src={movie.Poster} alt={`Poster image for ${movie.Title}`} />
        </div>
      ))}
    </>
  )
}

export default MovieList
