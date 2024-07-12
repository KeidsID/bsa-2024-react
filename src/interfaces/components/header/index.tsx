import { Link } from "react-router-dom";

import briefcaseLogo from "~/assets/images/briefcase.svg";
import userLogo from "~/assets/images/user.svg";
import User from "~/data/models/user.js";
import { clearLoggedUser } from "~/interfaces/providers/logged_user_provider";
import "./_.css";

type HeaderProps = {
  user?: User | undefined;
};

/**
 * Common header component on all pages.
 *
 * Provide `user` will render header navs.
 */
export default function Header({ user }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="header__inner">
        <Link data-test-id="header-logo" to="/" className="header__logo">
          Travel App
        </Link>
        {user && (
          <nav data-test-id="header-nav" className="header__nav">
            <ul className="nav-header__list">
              <li className="nav-header__item" title="Bookings">
                <Link
                  data-test-id="header-bookings-link"
                  to="/bookings"
                  className="nav-header__inner"
                >
                  <span className="visually-hidden">Bookings</span>
                  <img src={briefcaseLogo} alt="bookings" />
                </Link>
              </li>
              <li className="nav-header__item" title="Profile">
                <div
                  data-test-id="header-profile-nav"
                  className="nav-header__inner profile-nav"
                  tabIndex={0}
                >
                  <span className="visually-hidden">Profile</span>
                  <img src={userLogo} alt="profile" />
                  <ul
                    data-test-id="header-profile-nav-list"
                    className="profile-nav__list"
                  >
                    <li
                      data-test-id="header-profile-nav-username"
                      className="profile-nav__item"
                    >
                      {user.fullname}
                    </li>
                    <li className="profile-nav__item">
                      <Link
                        data-test-id="header-profile-nav-sign-out"
                        to="/sign-up"
                        className="profile-nav__sign-out button"
                        onClick={() => clearLoggedUser()}
                      >
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
