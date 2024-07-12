import User from "~/data/models/user";
import { usersAPI } from "~/data/server_mock";
import { promiseDelayed } from "~/common/utils";

class UsersService {
  async createUser({
    email,
    password,
    fullname,
  }: Omit<User, "id">): Promise<User> {
    await promiseDelayed(1000);

    if (usersAPI.getUsers().find((e) => e.email === email)) {
      throw new Error("Email already used");
    }

    const newUser: User = {
      id: window.crypto.randomUUID(),
      email,
      password,
      fullname,
    };

    usersAPI.addUser(newUser);

    return newUser;
  }

  async getUserByCredentials({
    email,
    password,
  }: Pick<User, "email" | "password">): Promise<User | undefined> {
    await promiseDelayed(1000);

    return usersAPI.getUsers().find((e) => {
      return e.email === email && e.password === password;
    });
  }
}

const usersService = new UsersService();

export default usersService;
