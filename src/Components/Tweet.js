import React, { Component } from "react";
import "../index.css";

class Tweet extends Component {
  state = { draggedTweet: null };

  render() {
    const { tweet } = this.props;
    return (
      <div className="ui card" id={tweet.id}>
        <div className="ui content">
          <div className="ui feed">
            <div className="event">
              <div className="label">
                <img alt="user profile" src={tweet.user.miniProfileImageURL} />
              </div>
              <div className="content">
                <div className="summary">
                  <a href="javascript:void(0);">{tweet.user.name}</a>
                  <span> @{tweet.user.screenName}</span>
                  <div className="date">{tweet.createdAt ? new Date(tweet.createdAt).toLocaleString("en-US") : ""}</div>
                </div>
                <div className="extra text">{tweet.text}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tweet;
