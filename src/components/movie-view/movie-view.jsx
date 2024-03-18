export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.ImagePath} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <br></br>
        <div>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <div>
          <span>Biography: </span>
          <span>{movie.Director.Bio}</span>
        </div>
        <div>
          <span>Date of Birth: </span>
          <span>{movie.Director.Birthdate}</span>
        </div>
        <div>
          <span>Date of Death: </span>
          <span>{movie.Director.Deathdate}</span>
        </div>
        <br></br>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div>
          <span>Genre Description: </span>
          <span>{movie.Genre.Description}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };