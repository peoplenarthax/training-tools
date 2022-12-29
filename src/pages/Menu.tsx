import React from 'react';
import {Link} from "react-router-dom";
import "./Menu.css"
import reactionBg from '../assets/reaction-bg.jpg'

const linkBg = {
    background: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7)), url(${reactionBg}) -111px top / 130% no-repeat`
}

function Menu() {
  return (
    <div className="menu">
      <ul>
          <li>
            <Link
                className="menu__element"
                style={linkBg}
                to={'/reaction'}
            >
                Reaction
            </Link>
          </li>
      </ul>
    </div>
  );
}

export default Menu;
