import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ favoriteMovies, updateUser }) => {
    return (
        <Col className="py-3 px-4">
            <h2>List of favorite movies</h2>
            <Row>
                {favoriteMovies.map((movie) => (
                    <Col key={movie.id} lg={3} md={4} sm={6} className="mb-5">
                        <MovieCard
                            movie={movie}
                            updateUser={updateUser}
                        />
                    </Col>
                ))
                }

            </Row>
        </Col>
    );
}
FavoriteMovies.propTypes = {
    favoriteMovies: PropTypes.array.isRequired,
    updateUser: PropTypes.func.isRequired
};