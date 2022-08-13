import { httpService } from "./http.service";

export const userService = {
  getUsers,
};

async function getUsers() {
  try {
    const users = await httpService.get("user");
    return users;
  } catch (error) {
    console.log("error getting users: ", error);
  }
}


