import PropTypes, { bool } from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

MovieCard.propTypes = {
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
   onMovieClick: PropTypes.func.isRequired
 };
