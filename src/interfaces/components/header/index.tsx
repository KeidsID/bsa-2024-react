import "./_.css";

import briefcaseLogo from "~/assets/images/briefcase.svg";
import userLogo from "~/assets/images/user.svg";
import User from "~/data/models/user.js";

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
        <a data-test-id="header-logo" href="/" className="header__logo">
          Travel App
        </a>
        {user && (
          <nav data-test-id="header-nav" className="header__nav">
            <ul className="nav-header__list">
              <li className="nav-header__item" title="Bookings">
                <a
                  data-test-id="header-bookings-link"
                  href="./bookings.html"
                  className="nav-header__inner"
                >
                  <span className="visually-hidden">Bookings</span>
                  <img src={briefcaseLogo} alt="bookings" />
                </a>
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
                      {user.fullName}
                    </li>
                    <li className="profile-nav__item">
                      <a
                        data-test-id="header-profile-nav-sign-out"
                        href="./sign-in.html"
                        className="profile-nav__sign-out button"
                      >
                        Sign Out
                      </a>
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
