import axios from 'axios'

const instance = axios.create({
    baseURL: "https://staging-acp-api.onrender.com/",
    headers: {
      "Content-type": "application/json"
    }
  });


export default instance