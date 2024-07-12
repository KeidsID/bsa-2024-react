import Header from "~/interfaces/components/header";
import Footer from "~/interfaces/components/footer";
import "./_.css";

type Props = {
  message?: string;
  plain?: boolean;
  children?: React.ReactNode;
};

export default function NotFoundPage({
  message = "Sorry for the inconvenience",
  plain,
  children,
}: Props): JSX.Element {
  return (
    <>
      {!plain && <Header />}
      <main className="not-found-page">
        <h1>404</h1>
        <p>{message}</p>
        {children}
      </main>
      {!plain && <Footer />}
    </>
  );
}
