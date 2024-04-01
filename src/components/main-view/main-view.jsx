import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movie-app-2024-716106e34297.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            imagePath: movie.ImagePath,
            featured: movie.Featured,
            genre: {
              name: movie.Genre.Name,
              description: movie.Genre.Description
            },
            director: {
              name: movie.Director.Name,
              bio: movie.Director.Bio,
              birthdate: movie.Director.Birthdate,
              deathdate: movie.Director.Deathdate
            }
          }
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col lg={5} md={8} sm={10}>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
            />
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col lg={8} md={10}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {movies.map((movie) => {
              return (
                <Col key={movie.id} lg={3} md={4} sm={6} className="mb-5">
                  <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              );
            })}
            <Col key="123" md={8} className="mb-5">
              <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }} variant="info">Logout</Button>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};
