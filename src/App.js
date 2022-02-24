import React, { Component } from "react";
import SearchField from "./Components/SearchField";
import Tweet from "./Components/Tweet";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Loader from "./Components/Loader";

class App extends Component {
  constructor() {
    super();
    const savedTweets = localStorage.getItem("savedItems") ? JSON.parse(localStorage.getItem("savedItems")) : [];
    this.state = { tweets: [], savedTweets, isLoading: false };
  }

  fetchTweets = (tweets) => {
    const savedTweetIds = this.state.savedTweets.map((tweet) => tweet.id);
    tweets = tweets.filter((tweet) => {
      return !savedTweetIds.includes(tweet.id);
    });
    this.setState({ tweets });
  };

  updateIsLoading = (val) => {
    this.setState({ isLoading: val });
  };

  onDragEnd = (result) => {
    const { source, destination } = result;
    // dropped outside of the droppable area
    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceItems =
        destination.droppableId === "saved-tweets" ? [...this.state.tweets] : [...this.state.savedTweets];
      const [movedTweet] = sourceItems.splice(source.index, 1);
      const destinationItems =
        destination.droppableId === "saved-tweets" ? [...this.state.savedTweets] : [...this.state.tweets];
      destinationItems.splice(destination.index, 0, movedTweet);

      this.setState({
        tweets: destination.droppableId === "saved-tweets" ? sourceItems : destinationItems,
        savedTweets: destination.droppableId === "saved-tweets" ? destinationItems : sourceItems,
      });

      const savedItemsStr = JSON.stringify(destination.droppableId === "saved-tweets" ? destinationItems : sourceItems);
      localStorage.setItem("savedItems", savedItemsStr);
    }
  };

  renderTweets = () => {
    return this.state.tweets.map((tweet, index) => {
      return (
        <Draggable key={tweet.id} draggableId={tweet.id.toString()} index={index}>
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  userSelect: "none",
                  margin: "0 0 8px 0",
                  backgroundColor: snapshot.isDragging ? "#26384a" : "#456c86",
                  color: "white",
                  ...provided.draggableProps.style,
                }}
              >
                <Tweet tweet={tweet} />
              </div>
            );
          }}
        </Draggable>
      );
    });
  };

  render() {
    return (
      <div className="ui container">
        <h1>Tweet saver</h1>
        <div className="d-flex">
          <div className="flex-1">
            <SearchField onFetchTweets={this.fetchTweets} updateIsLoading={this.updateIsLoading} />
          </div>
          <div className="flex-1 saved-tweet-header">
            <h2>Saved Tweets</h2>
          </div>
        </div>

        <div className="section">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="list-section">
              <Droppable droppableId="tweets">
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                        padding: 4,
                        minHeight: "500px",
                      }}
                    >
                      <div>
                        <div id="tweets" className="ui list">
                          {this.state.tweets.length === 0 && !this.state.isLoading ? (
                            <h3>Please search for tweets by entering some query in the field above.</h3>
                          ) : this.state.isLoading ? (
                            <Loader />
                          ) : (
                            this.renderTweets()
                          )}
                        </div>
                      </div>
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>

            <div className="list-section">
              <Droppable droppableId="saved-tweets">
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                        padding: 4,
                        minHeight: "500px",
                      }}
                    >
                      <div>
                        <div id="saved-tweets" className="ui list">
                          {this.state.savedTweets.length === 0 ? (
                            <h3>
                              You don't have any tweets saved. Please drag tweets from the left section to this section.
                            </h3>
                          ) : (
                            this.state.savedTweets.map((tweet, index) => {
                              return (
                                <Draggable key={tweet.id} draggableId={tweet.id.toString()} index={index}>
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          margin: "0 0 8px 0",
                                          backgroundColor: snapshot.isDragging ? "#26384a" : "#456c86",
                                          color: "white",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        <Tweet tweet={tweet} />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })
                          )}
                        </div>
                      </div>
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default App;
