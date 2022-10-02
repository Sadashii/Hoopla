import axios from "axios";

class UserHelper {
  postLogin = (token, router) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_token", token);
      this.getLatestUser().then(r => {
        setTimeout(() => {
          router.push('/app')
        }, 100)
      })
    }
  };
  
  logoutUser = (router) => {
    if (typeof window !== "undefined") {
      let keys = Object.keys(localStorage)
      for (const key of keys) {
        if (key.startsWith("user_")) {
          localStorage.removeItem(key)
        }
      }
      router.push('/')
    }
  }
  
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
    const user = await axios.post("/api/account/", {operation: "GET"}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        },
      }
    );
    await this.saveUser(user.data);
    return user.data;
  }
}

export default new UserHelper();