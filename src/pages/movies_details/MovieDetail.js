import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './MovieDetail.css'; // Ensure this file contains your styles
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPlayCircle } from "react-icons/fa";
import Footer from '../../components/footer/Footer';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const navigate = useNavigate(); // Use navigate instead of history

  const handleWatchTrailer = () => {
    if (movie.id) {
      navigate(`/trailer/${movie.id}`); // Navigate to the trailer page
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/movies/${id}/`)
      .then(response => setMovie(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  // Extract YouTube video ID from URL if necessary
  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : url; // Return the ID or the URL if no match
  };

  return (
    <div className='bg-dark m-0'>
      <Container className="mt-1">
        <Row>
          <Col md={12} className="mb-4">
            <div className="movie-banner" style={{ backgroundImage: `url(${movie.banner_image})` }}>
              <div className="movie-banner-content">
                <Row>
                  <Col md={4} className="banner-poster">
                    <img src={movie.thumbnail} alt={movie.title} className="img-fluid" />
                  </Col>
                  <Col md={8} className="banner-info">
                    <h1>{movie.title}</h1>
                    <p className="release-date">Release Date: {movie.release_date}</p>
                    <p>{movie.description}</p>
                    <Button className='mx-2' variant="btn btn-outline-danger" href={movie.movie_url} target="_blank">
                      Watch Now <FaPlayCircle className="material-icons" />
                    </Button>
                    <Button 
                      variant="btn btn-outline-warning" 
                      onClick={handleWatchTrailer}
                      disabled={!movie.trailer_url}
                    >
                      Trailer <FaPlayCircle className="material-icons" />
                    </Button>                   
                  </Col>
                </Row>
              </div>
            </div>
          </Col>

          {/* Trailer Section */}
          <Col md={12} className="mb-4 mt-5 pt-5">
            <h4 className='text-light mb-5 play-text'>Trailer <FaPlayCircle className="material-icons" /></h4>
            <div className="movie-player">
              {movie.trailer_url ? (
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${extractVideoId(movie.trailer_url)}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Trailer"
                ></iframe>
              ) : (
                <p className="text-light">No trailer available</p>
              )}
            </div>
          </Col>

          {/* Full Movie Section */}
          <Col md={12}>
            <h4 className='text-light mt-5 play-text'>Full Movie <FaPlayCircle className="material-icons" /></h4>
            <Card className="mb-4 mt-5">
              <Card.Body>
                <div className="trailer-player mt-5">
                  {movie.movie_url ? (
                    <iframe
                      width="100%"
                      height="315"
                      src={movie.movie_url}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Full Movie"
                    ></iframe>
                  ) : (
                    <p className="text-light">No movie available</p>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default MovieDetail;
