import { httpService } from "./http.service";

const Route = "auth";
const STORAGE_KEY_LOGGEDIN = "loggedUser";

async function login(user) {
  try {
    const loggedUser = await httpService.post(`${Route}/login`, user);
    if (loggedUser) {
      sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(loggedUser));
    }
    return loggedUser;
  } catch (error) {
    console.log("error while login: ", error);
  }
}

async function signup(user) {
  try {
    const newUser = await httpService.post(`${Route}/signup`, user);
    if (newUser) {
      sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(newUser));
    }
    return newUser;
  } catch (error) {
    console.log("error while signing up: ", error);
  }
}

async function logout() {
  try {
    await httpService.post(`${Route}/logout`);
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN);
  } catch (err) {
    console.log("error while logout: ", err);
  }
}

function getLoggedUser() {
  const json = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN);
  return JSON.parse(json);
}

function saveUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user));
}

export const authService = {
  login,
  signup,
  logout,
  getLoggedUser,
  saveUser
};
