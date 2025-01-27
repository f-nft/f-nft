import React from "react";
import Rocket from "./images/rocket3.svg";
import Coins from "./images/coins.svg";
import Vote from "./images/vote.svg";
import "./Styling.css";

export default function Media_container() {
  return (
    <div className="media-container">
      <div className="uppermedia">
        <div className="media">
          <div className="icon-container">
            <div className="media-icon">
              <img alt="Rocket" src={Rocket} />
            </div>
          </div>
          <div>
            <h2 className="head">TO THE MOON</h2>
            <div className="media-text-small">
              <p className="text text--muted text-media">
                Join one of the fastest growing Crypto communities! Get your
                ticket for this rocket ship.
              </p>
            </div>
          </div>
        </div>
        <div className="media">
          <div className="icon-container">
            <div className="media-icon">
              <img alt="Coins" src={Coins} />
            </div>
          </div>
          <div>
            <h2 className="head">HOLD</h2>
            <div className="media-text-small">
              <p className="text text--muted text-media">
                Snapshots will be frequent and holders will get airdrops of
                NFTs, Future Tokens, etc.
              </p>
            </div>
          </div>
        </div>
        <div className="media">
          <div className="icon-container">
            <div className="media-icon">
              <img alt="Vote" src={Vote} />
            </div>
          </div>
          <div>
            <h2 className="head">Vote on Governance</h2>
            <div className="media-text-small">
              <p className="text text--muted text-media">
                FOT will transition into a DAO where all governance and changes
                will be voted on through the community using the token.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
