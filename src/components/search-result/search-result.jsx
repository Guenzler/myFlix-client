import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import "./styles.scss";

export const SearchResult = ({ numberOfMovies, resetSearch }) => {
    return (
        <Card className="custom-card">
            <Card.Body>
                <Card.Text>
                    {(numberOfMovies===1)?"Your search term was found in one movie":`Your search term was found in ${numberOfMovies} movies`}</Card.Text>
                <Button 
                variant="info"
                onClick={resetSearch}
                >
                    Reset search
                    </Button>
            </Card.Body>
        </Card>
    );
}

SearchResult.propTypes = {
    numberOfMovies: PropTypes.number,
    resetSearch: PropTypes.func
  }