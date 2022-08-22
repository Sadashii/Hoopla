class UserHelper {
  postLogin = (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_token", token);
    }
  }
  
  getUserToken = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("user_token");
      if (token) return token;
      else return null;
    }
    return null;
  };
  
  getUser = () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user_data");
      if (user) return JSON.parse(user);
      else return null;
    }
    return null;
  };
}

export default new UserHelper();