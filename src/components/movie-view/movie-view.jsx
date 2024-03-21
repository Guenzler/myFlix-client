import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {

  function dateToString(date){
    let myDate = new Date(date);
    let year = myDate.getFullYear();
    let month = ('0' + (myDate.getMonth() + 1)).slice(-2);
    let day = ('0' + myDate.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  }

  const displayBirthdate = dateToString(movie.director.birthdate);
  const displayDeathdate = (movie.director.deathdate)?dateToString(movie.director.deathdate):"-";
 
  return (
    <div>
      <div>
        <img src={movie.imagePath} />
      </div>
      <h2>
        <span>{movie.title}</span>
      </h2>
      <div>
        <span>{movie.description}</span>
      </div>
      <h3>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </h3>
      <div>
        <span>{movie.genre.description}</span>
      </div>
      <h3>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </h3>
      <div>
        <span>Biograpy: </span>
        <span>{movie.director.bio}</span>
      </div>
      <br></br>
      <div>
        <span>Date of Birth:  </span>
        <span>{displayBirthdate}</span>
      </div>
      <div>
        <span>Date of Death: </span>
        <span>{displayDeathdate}</span>
      </div>
      <br></br>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};


MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imagePath: PropTypes.string,
    featured: PropTypes.bool,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birthdate: PropTypes.instanceOf(Date),
      deathdate: PropTypes.instanceOf(Date)
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};