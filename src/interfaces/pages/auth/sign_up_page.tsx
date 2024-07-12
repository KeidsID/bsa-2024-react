import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { validatePassword } from "~/common/utils";
import usersService from "~/data/services/users_service";
import Header from "~/interfaces/components/header";
import Footer from "~/interfaces/components/footer";
import useSimpleAuth from "~/interfaces/hooks/use_simple_auth";
import { setLoggedUser } from "~/interfaces/providers/logged_user_provider";
import "./_.css";

export default function SignUpPage(): JSX.Element {
  useSimpleAuth({ isAuthPage: true });

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const validateForm = (): boolean => {
    if (!fullname || !email || !password) return false;

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

    try {
      const createdUser = await usersService.createUser({
        email,
        password,
        fullname,
      });

      setLoggedUser(createdUser);

      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    document.title = "Travel App | Sign Up";
  });

  return (
    <>
      <Header />
      <main className="sign-up-page">
        <h1 className="visually-hidden">Travel App</h1>
        <form className="sign-up-form" autoComplete="off" onSubmit={onSubmit}>
          <h2 className="sign-up-form__title">Sign Up</h2>
          <label className="input">
            <span className="input__heading">Full name</span>
            <input
              data-test-id="auth-full-name"
              name="full-name"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </label>
          <label className="input">
            <span className="input__heading">Email</span>
            <input
              data-test-id="auth-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button data-test-id="auth-submit" className="button" type="submit">
            Sign Up
          </button>
        </form>
        <span>
          Already have an account?
          <span> </span>
          <Link
            data-test-id="auth-sign-in-link"
            to="/sign-in"
            className="sign-up-form__link"
          >
            Sign In
          </Link>
        </span>
      </main>
      <Footer />
    </>
  );
}
