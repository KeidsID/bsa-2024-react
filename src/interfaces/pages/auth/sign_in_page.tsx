import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { validatePassword } from "~/common/utils";
import usersService from "~/data/services/users_service";
import Header from "~/interfaces/components/header";
import Footer from "~/interfaces/components/footer";
import useSimpleAuth from "~/interfaces/hooks/use_simple_auth";
import { setLoggedUser } from "~/interfaces/providers/logged_user_provider";
import "./_.css";

export default function SignInPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const validateForm = (): boolean => {
    if (!email || !password) return false;

    const passwordValidateMsg = validatePassword(password);

    if (passwordValidateMsg) {
      alert(passwordValidateMsg);
      return false;
    }

    return true;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (!validateForm()) return;

    const user = await usersService.getUserByCredentials({ email, password });

    if (!user) {
      alert("User not found");
      return;
    }

    setLoggedUser(user);

    navigate("/");
  };

  useSimpleAuth({ isAuthPage: true });

  return (
    <>
      <Header />
      <main className="sign-in-page">
        <h1 className="visually-hidden">Travel App</h1>
        <form className="sign-in-form" autoComplete="off" onSubmit={onSubmit}>
          <h2 className="sign-in-form__title">Sign In</h2>
          <label className="input">
            <span className="input__heading">Email</span>
            <input
              data-test-id="auth-email"
              name="email"
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
            />
          </label>
          <label className="input">
            <span className="input__heading">Password</span>
            <input
              data-test-id="auth-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              required
            />
          </label>
          <button data-test-id="auth-submit" className="button" type="submit">
            Sign In
          </button>
        </form>
        <span>
          Don't have an account?
          <span> </span>
          <Link
            data-test-id="auth-sign-up-link"
            to="/sign-up"
            className="sign-in-form__link"
          >
            Sign Up
          </Link>
        </span>
      </main>
      <Footer />
    </>
  );
}
