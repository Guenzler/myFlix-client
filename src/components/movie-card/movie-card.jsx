import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import fullHeart from "../../assets/img/heart-yellow-full.png";
import outlineHeart from "../../assets/img/heart-yellow-outline.png";
import "./styles.scss";

export const MovieCard = ({ movie, updateUser }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);

  // Determine if the movie is in the user's favorites
  const isFavorite = user.favoriteMovies.includes(movie.id);

  // Add to favorites handler
  const handleAddToFavorites = () => {
    fetch(`https://movie-app-2024-716106e34297.herokuapp.com/users/${user.username}/${movie.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${storedToken}`
      },
    })
      .then((response) => {
        if (!response.ok) {
          alert("Failed to add movie to favorites.");
          return;
        }
        alert("Movie added to favorites successfully!");
        return response.json();
      })
      .then((updatedUser) => {
        if (updatedUser?.username) {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          updateUser(updatedUser);
        }
      })
      .catch((error) => console.error(error));
  };
   // Remove from favorites handler
   const handleRemoveFromFavorites = () => {
    fetch(`https://movie-app-2024-716106e34297.herokuapp.com/users/${user.username}/${movie.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${storedToken}`
      },
    })
      .then((response) => {
        if (!response.ok) {
          alert("Failed to remove movie from favorites.");
          return;
        }
        alert("Movie removed from favorites successfully!");
        return response.json();
      })
      .then((updatedUser) => {
        if (updatedUser?.username) {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          updateUser(updatedUser);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <Card className="h-100 custom-card">
      <Card.Img variant="top" src={movie.imagePath} className="image-style" />
      <Card.Body>
        <Card.Title><span className="moviecardtitle">{movie.title}</span></Card.Title>
        <Card.Text>Director {movie.director.name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="info">Open</Button>
        </Link>
        <span className="mt-2 right-align">
          {isFavorite ? (
            <button
              onClick={handleRemoveFromFavorites}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
              aria-label="Remove from favorites"
            ><img src={fullHeart} width="30px" height="30px" alt="Full heart icon" />
            </button>
          ) : (
            <button
              onClick={handleAddToFavorites}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
              aria-label="Add to favorites"
            >
              <img src={outlineHeart} width="30px" height="30px" alt="Outlined heart icon" />
            </button>
          )}

        </span>
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
  }).isRequired,
  updateUser: PropTypes.func
};
