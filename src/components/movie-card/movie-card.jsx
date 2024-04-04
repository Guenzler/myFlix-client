import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.scss";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100 custom-card">
    <Card.Img variant="top" src={movie.imagePath} className="image-style" />
    <Card.Body>
      <Card.Title>{movie.title}</Card.Title>
      <Card.Text>Director {movie.director.name}</Card.Text>
      <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="info">Open</Button>
        </Link>
    </Card.Body>
  </Card>
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
      birthdate: PropTypes.string,
      deathdate: PropTypes.string
     })
   }).isRequired
 };
