import axios from "axios";

export default axios.create({
  baseURL: "http://tweetsaver.herokuapp.com",
});
