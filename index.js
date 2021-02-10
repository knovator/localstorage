// Keys that we use for storing user's data in localStorage
let KEYS = {
  token: "AUTH_TOKEN",
  user: "USER",
};

// Incase if you want to keep different name for user's data then use this function to do that first
const updateConfig = (config) => {
  KEYS = {
    ...config,
  };
};

// wrapping up methods of localStorage with checking of it's existence (useful when you're using SSR)
const LocalStorage = {
  get: (key) => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(key);
    }

    return false;
  },

  getJSON: (key) => {
    if (typeof localStorage !== "undefined") {
      const data = LocalStorage.get(key);

      return data && data !== "undefined" ? JSON.parse(data) : "";
    }

    return false;
  },

  set: (...rest) => {
    if (typeof localStorage !== "undefined") {
      return localStorage.setItem(...rest);
    }

    return false;
  },

  setJSON: (key, value) => {
    if (typeof localStorage !== "undefined") {
      const data = JSON.stringify(value);

      return LocalStorage.set(key, data);
    }

    return false;
  },

  remove: (key) => {
    if (typeof localStorage !== "undefined") {
      return localStorage.removeItem(key);
    }

    return false;
  },

  clean: () => {
    if (typeof localStorage !== "undefined") {
      return localStorage.clear();
    }

    return false;
  },
};

// # functions to manipulate user's data
const setToken = (token) => {
  LocalStorage.set(KEYS.token, token);
};

const setUser = (user) => {
  LocalStorage.set(KEYS.user, JSON.stringify(user));
};

const getToken = () => {
  if (typeof localStorage !== "undefined") {
    return LocalStorage.get(KEYS.authToken) || "";
  }

  return "";
};

const getUser = async () => {
  if (typeof localStorage !== "undefined") {
    const user = LocalStorage.get(KEYS.user);

    return user && JSON.parse(user);
  }

  return {};
};

export { LocalStorage, getUser, getToken, setUser, setToken, updateConfig };
