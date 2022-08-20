class UserHelper {
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