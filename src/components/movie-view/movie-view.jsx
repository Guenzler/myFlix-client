import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./styles.scss";

export const MovieView = ({ movies }) => {

  const { movieId } = useParams();
  const movie = movies.find((b) => b.id === movieId);

  function dateToString(date){
    let myDate = new Date(date);
    let year = myDate.getFullYear();
    let month = ('0' + (myDate.getMonth() + 1)).slice(-2);
    let day = ('0' + myDate.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  }

  const displayBirthdate = dateToString(movie.director.birthdate);
  const displayDeathdate = (movie.director.deathdate)?"Date of Death: " + dateToString(movie.director.deathdate):"";
 
  return (
    <div className="bg-secondary py-3 px-4">
      <div>
        <img src={movie.imagePath} className="viewImage"/>
      </div>
      <h1>
        <span>{movie.title}</span>
      </h1>
      <div>
        <span>{movie.description}</span>
      </div>
      <h3 className="pt-4">
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </h3>
      <div>
        <span>{movie.genre.description}</span>
      </div>
      <h3 className="pt-4">
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
        <span>{displayDeathdate}</span>
      </div>
      <br></br>
      <Link to={`/`}>
      <Button variant="info">Back</Button>
      </Link>
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
      birthdate: PropTypes.string,
      deathdate: PropTypes.string
    })
  }).isRequired
};