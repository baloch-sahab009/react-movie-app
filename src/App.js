import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './pages/movies_list/MovieList';
import MovieDetail from './pages/movies_details/MovieDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/navbar/AppNavbar';
import TrailerPlayer from './components/TrailerPlayer/TrailerPlayer';

function App() {
  return (
    <Router>
      <div>
        <AppNavbar />
        <main>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/trailer/:videoId" element={<TrailerPlayer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
