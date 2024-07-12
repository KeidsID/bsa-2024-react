import heartLogo from "~/assets/images/heart.svg";
import "./_.css";

/**
 * Common footer component on all pages.
 */
export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <span className="footer__text">
        © 2024, from
        <a className="footer__link" href="https://binary-studio.com">
          binary studio
        </a>
        with
        <img className="footer__icon" src={heartLogo} alt="heart" />
      </span>
    </footer>
  );
}
