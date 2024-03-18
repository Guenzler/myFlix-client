import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
        id: 1,
        Title: 'The Social Network',
        Description: 'A drama about the founding of Facebook',
        Genre: {
          Name: 'Biography',
          Description: 'The biography genre focuses on depicting the life and experiences of real individuals, offering a dramatized portrayal of their achievements, challenges, and significant moments. These films aim to provide insight into the personal and historical aspects of noteworthy figures, offering audiences an informative and often inspiring narrative.'
        },
        Director: {
          Name: 'David Fincher',
          Bio: "David Fincher is a renowned filmmaker recognized for his expertise in directing psychological thrillers and dark dramas. With notable works such as 'Fight Club', 'Se7en', and 'The Social Network', Fincher has earned acclaim for his meticulous craftsmanship, innovative storytelling, and contributions to the suspense and mystery genres in cinema.",
          Birthdate: '1962-08-28',
          Deathdate: null
        },
        ImagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/The_Social_Network_film_poster.png/220px-The_Social_Network_film_poster.png',
        Featured: false
      },
      {
        id: 2,
        Title: 'Lost in Translation',
        Description: 'Romantic drama set in Tokyo, exploring a unique connection between two strangers.',
        Genre: {
          Name: 'Comedy',
          Description: 'Movies that aim to amuse and entertain'
        },
        Director: {
          Name: 'Sofia Coppola',
          Bio: 'Director known for Lost in Translation and The Virgin Suicides.',
          Birthdate: '1971-05-14',
          Deathdate: null
        },
        ImagePath: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Lost_in_Translation_poster.jpg',
        Featured: false
      },
      {
        id: 3,
        Title: 'The Shining',
        Description: "'The Shining' is a psychological horror film directed by Stanley Kubrick, based on Stephen King's novel. It follows Jack Torrance, a writer and recovering alcoholic, who becomes the winter caretaker of the eerie Overlook Hotel with his family, leading to terrifying supernatural occurrences that unravel the fabric of his sanity.",
        Genre: {
          Name: 'Horror',
          Description: 'Movies designed to evoke fear and suspense'
        },
        Director: {
          Name: 'Stanley Kubrick',
          Bio: "Stanley Kubrick was a legendary filmmaker known for his diverse and groundbreaking contributions to cinema. With a career spanning decades, Kubrick directed iconic films such as '2001: A Space Odyssey', 'A Clockwork Orange', and 'The Shining', demonstrating a mastery of various genres and leaving an indelible mark on the art of filmmaking. He passed away on March 7, 1999, leaving behind a legacy of influential and thought-provoking films.",
          Birthdate: '1928-07-26',
          Deathdate: '1999-03-07'
        },
        ImagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/The_Shining_%281980%29_U.K._release_poster_-_The_tide_of_terror_that_swept_America_IS_HERE.jpg/220px-The_Shining_%281980%29_U.K._release_poster_-_The_tide_of_terror_that_swept_America_IS_HERE.jpg',
        Featured: false
      }
  ]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie ={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};