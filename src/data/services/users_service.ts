import usersMock from "~/data/server_mock/users.json";

import User from "~/data/models/user";
import { promiseDelayed } from "~/common/utils";

class UsersService {
  async createUser({
    email,
    password,
    fullName,
  }: Omit<User, "id">): Promise<User> {
    await promiseDelayed(1000);

    if (usersMock.find((e) => e.email === email)) {
      throw new Error("Email already used");
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      password,
      fullName,
    };

    usersMock.push(newUser);

    return newUser;
  }

  async getUserByCredentials({
    email,
    password,
  }: Pick<User, "email" | "password">): Promise<User | undefined> {
    await promiseDelayed(1000);

    return usersMock.find((e) => {
      return e.email === email && e.password === password;
    });
  }
}

const usersService = new UsersService();

export default usersService;
