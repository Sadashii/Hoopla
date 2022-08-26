import axios from "axios";

class UserHelper {
  postLogin = (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_token", token);
    }
  };
  
  getUserToken = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("user_token");
      if (token) {
        return token;
      } else {
        return null;
      }
    }
    return null;
  };
  
  saveUser = (user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_data", JSON.stringify(user));
    }
  };
  
  getUser = () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user_data");
      if (user) {
        return JSON.parse(user);
      } else {
        return null;
      }
    }
    return null;
  };
  getLatestUser = async () => {
    const user = await axios.get("/api/account/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
    });
    await this.saveUser(user.data);
    return user.data;
  }
}

export default new UserHelper();