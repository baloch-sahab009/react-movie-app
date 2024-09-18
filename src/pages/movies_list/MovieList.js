import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap'; // Import Carousel from react-bootstrap
import Cards from '../../components/card/card';
import './MovieList.css'; // Ensure to import the CSS file
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // For Bootstrap styling
import Footer from '../../components/footer/Footer';



const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [type]);

  // Using your Django API for fetching movie data
  const getData = () => {
    fetch(`http://localhost:8000/api/movies/`) // Replace with your Django API endpoint
      .then((res) => res.json())
      .then((data) => setMovieList(data)) // Your Django API directly gives data array
      .catch((error) => console.error('Error fetching data:', error));
  };

  return (
    <div className='bg-dark'>
    <div className="carousel m-0 p-0 shadow-lg">
      {/* Carousel Section */}
      <Carousel className="movie-carousel">
        {movieList.slice(0, 5).map((movie) => (
          <Carousel.Item key={movie.id}>
            <img
              className="d-block w-100"
              src={movie.banner_image}
              alt={movie.title}
            />
            <Carousel.Caption>
              <h3>{movie.title}</h3>
              <p>{movie.description.slice(0, 500) + "..."}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Movie Cards Section */}
      <h2 className="list__title text-light">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list__cards mb-5 bg-dark">
        {movieList.map((movie) => (
          <Cards key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default MovieList;
