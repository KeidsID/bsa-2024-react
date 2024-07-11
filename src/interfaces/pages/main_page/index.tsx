import "./_.css";

import { useEffect, useRef, useState } from "react";

import Trip from "~/data/models/trip";
import tripsService from "~/data/services/trips_service";
import Header from "~/interfaces/components/header";
import Footer from "~/interfaces/components/footer";
import TripInfo from "~/interfaces/components/trip_info";
import TripPrice from "~/interfaces/components/trip_price";

export default function MainPage(): JSX.Element {
  const tripsRef = useRef<Trip[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Trips Page";

    tripsService.getTrips().then((trips) => {
      tripsRef.current = trips;

      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Header
        user={{
          id: "dummy-user",
          email: "dummy@gmail.com",
          password: "12345678",
          fullName: "John Doe",
        }}
      />
      {isLoading ? (
        <main className="main-page__loading">
          <div className="loader"></div>
        </main>
      ) : (
        <main>
          <h1 className="visually-hidden">Travel App</h1>
          <section className="trips-filter">
            <h2 className="visually-hidden">Trips filter</h2>
            <form className="trips-filter__form" autoComplete="off">
              <label className="trips-filter__search input">
                <span className="visually-hidden">Search by name</span>
                <input
                  data-test-id="filter-search"
                  name="search"
                  type="search"
                  placeholder="search by title"
                />
              </label>
              <label className="select">
                <span className="visually-hidden">Search by duration</span>
                <select data-test-id="filter-duration" name="duration">
                  <option value="">duration</option>
                  <option value="0_x_5">&lt; 5 days</option>
                  <option value="5_x_10">&lt; 10 days</option>
                  <option value="10">&ge; 10 days</option>
                </select>
              </label>
              <label className="select">
                <span className="visually-hidden">Search by level</span>
                <select data-test-id="filter-level" name="level">
                  <option value="">level</option>
                  <option value="easy">easy</option>
                  <option value="moderate">moderate</option>
                  <option value="difficult">difficult</option>
                </select>
              </label>
            </form>
          </section>
          <section className="trips">
            <h2 className="visually-hidden">Trips List</h2>

            <ul className="trip-list">
              {tripsRef.current.map(
                ({ title, duration, level, price, image }, index) => {
                  return (
                    <li
                      key={index}
                      data-test-id="trip-card"
                      className="trip-card"
                    >
                      <img
                        data-test-id="trip-card-image"
                        src={image}
                        alt="trip photo"
                      />
                      <div className="trip-card__content">
                        <TripInfo
                          title={title}
                          duration={duration}
                          level={level}
                          titleTestId="trip-card-title"
                          durationTestId="trip-card-duration"
                          levelTestId="trip-card-level"
                        />
                        <TripPrice
                          price={price}
                          testId="trip-card-price-value"
                        />
                      </div>
                      <a
                        data-test-id="trip-card-link"
                        href="./trip.html"
                        className="button"
                      >
                        Discover a trip
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </section>
        </main>
      )}
      <Footer />
    </>
  );
}
