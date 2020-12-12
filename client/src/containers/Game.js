import {  Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/game.scss";
import { Paper } from "@material-ui/core";

export default function Game(props) {
  return (
    <div className="game">
      
        <Header />
        <Paper elevation={7} className="game-card">
          <h2>What type of name are you looking for?</h2>
          <div className="game-buttons">
            <div>
              <Link to="game/girl">
                <button data-testid="girlsBtn" className="gender-button">
                  Girls
                </button>
              </Link>
            </div>
            <div>
              <Link to="game/boy">
                <button data-testid="boysBtn" className="gender-button">
                  Boys
                </button>
              </Link>
            </div>
            <div>
              <Link to="game/neutral">
                <button data-testid="neutralBtn" className="gender-button">
                  Neutral
                </button>
              </Link>
            </div>
          </div>
        </Paper>
      
    </div>
  );
}
