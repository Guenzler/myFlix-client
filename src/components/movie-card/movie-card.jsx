import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.scss";

export const MovieCard = ({ movie, updateUser }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);

  const [addMovie, setAddMovie] = useState("");
  const [delMovie, setDelMovie] = useState("");

  let isFavorite;
  if (user.favoriteMovies.indexOf(movie.id) > -1) {
    isFavorite = true
  } else {
    isFavorite = false
  };

  useEffect(() => {
    const addToFavorites = () => {
      fetch(
        `https://movie-app-2024-716106e34297.herokuapp.com/users/${user.username}/${movie.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${storedToken}`
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            alert("Failed to add movie to favorites.");
          } else {
            alert("Movie added to favorites successfully!");
            return response.json();
          }
        })
        .then((updatedUser) => {
          if (updatedUser.username) {
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            updateUser(updatedUser);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const removeFromFavorites = () => {
      fetch(
        `https://movie-app-2024-716106e34297.herokuapp.com/users/${user.username}/${movie.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${storedToken}`
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            alert("Failed to remove movie from favorites.");
          } else {
            alert("Movie removed from favorites successfully!");
            return response.json();
          }
        })
        .then((updatedUser) => {
          if (updatedUser.username) {
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            updateUser(updatedUser);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    if (addMovie) {
      addToFavorites();
    }
    if (delMovie) {
      removeFromFavorites();
    }
  }, [addMovie, delMovie, storedToken]);

  const handleAddToFavorites = () => {
    setAddMovie(movie);
  };
  const handleRemoveFromFavorites = () => {
    setDelMovie(movie);
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
        <div className="mt-2">
          {isFavorite ? (
            <Button variant="outline-info" size='sm' onClick={handleRemoveFromFavorites} >Remove from favorites</Button>
          ) : (
            <Button variant="outline-info" size='sm' onClick={handleAddToFavorites}>Add to favorites</Button>
          )}
        </div>
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
