import React from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"

const AppNavbar = () => {
    return (
      <div className="bg-dark">
          <div className="header">
              <div className="headerLeft">
                  <Link to="/"><img className="header__icon img-fluid" alt="logo" src="/images/logo.png" /></Link>
                  <Link to="/" style={{textDecoration: "none"}}><span>Popular</span></Link>
                  <Link to="/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                  <Link to="/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
              </div>
          </div>
        </div>
    )
}

export default AppNavbar