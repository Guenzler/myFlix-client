import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
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
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null); setToken(null); localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col lg={5} md={8} sm={10}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col lg={5} md={8} sm={10}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col lg={8} md={10}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>                    
                    {movies.map((movie) => {
                      return (
                        <Col key={movie.id} lg={3} md={4} sm={6} className="mb-5">
                          <MovieCard
                            movie={movie}
                            updateUser={(user) => {
                              setUser(user);
                            }
                            }
                          />
                        </Col>
                      )
                    })
                    }
                  </>
                )
                }
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col lg={12} >
                    <ProfileView
                      user={user}
                      movies={movies}
                      token={token}
                      updateUser={(user) => setUser(user)}
                      updateToken={(token) => setToken(token)} />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
