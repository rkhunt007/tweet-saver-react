import React, { Component } from "react";
import api from "../TweetAPI";

class SearchField extends Component {
  state = { searchStr: "" };

  onSearchStrChange = (e) => {
    this.setState({ searchStr: e.target.value });
  };

  onSearch = async () => {
    if (!this.state.searchStr) return;
    this.props.updateIsLoading(true);
    const res = await api.get(`?q=${this.state.searchStr}&count=10`);
    this.props.updateIsLoading(false);
    this.props.onFetchTweets(res.data.tweets);
  };

  render() {
    return (
      <div className="ui icon input">
        <input type="text" value={this.state.searchStr} onChange={this.onSearchStrChange} placeholder="Search..." />
        <i className="inverted circular search link icon" onClick={this.onSearch}></i>
      </div>
    );
  }
}

export default SearchField;
