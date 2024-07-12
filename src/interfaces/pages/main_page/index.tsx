import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Trip from "~/data/models/trip";
import User from "~/data/models/user";
import tripsService from "~/data/services/trips_service";
import Header from "~/interfaces/components/header";
import Footer from "~/interfaces/components/footer";
import TripInfo from "~/interfaces/components/trip_info";
import TripPrice from "~/interfaces/components/trip_price";
import { getLoggedUser } from "~/interfaces/providers/logged_user_provider";
import "./_.css";

type DurationSelectValue = "" | "0_x_5" | "5_x_10" | "10";
type DifficulySelectValue = "" | "easy" | "moderate" | "difficult";

export default function MainPage(): JSX.Element {
  const navigate = useNavigate();

  const userRef = useRef<User | undefined>();
  const tripsRef = useRef<Trip[]>([]);
  const filteredTripsRef = useRef<Trip[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);

  const [titleFilter, setTitleFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState<DurationSelectValue>("");
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficulySelectValue>("");

  const handleFilters = ({
    newTitle,
    newDuration,
    newDifficulty,
  }: {
    newTitle?: string | undefined;
    newDuration?: DurationSelectValue | undefined;
    newDifficulty?: DifficulySelectValue | undefined;
  } = {}) => {
    const titleValue = newTitle === "" ? newTitle : newTitle || titleFilter;
    const durationValue =
      newDuration === "" ? newDuration : newDuration || durationFilter;
    const difficultyValue =
      newDifficulty === "" ? newDifficulty : newDifficulty || difficultyFilter;

    if (!titleValue && !durationValue && !difficultyValue) {
      return setIsFiltered(false);
    }

    const searchFilteredTrips = tripsRef.current.filter(({ title }) => {
      if (!titleValue) return true;

      const searchResult = title.search(new RegExp(titleValue, "i"));

      return searchResult >= 0;
    });

    const durationFilteredTrips = searchFilteredTrips.filter(({ duration }) => {
      switch (durationValue) {
        case "0_x_5":
          return duration < 5;
        case "5_x_10":
          return duration < 10;
        case "10":
          return duration >= 10;
        default:
          return true;
      }
    });

    const difficultyFilteredTrips = durationFilteredTrips.filter(
      ({ level }) => {
        if (!difficultyValue) return true;

        return level === difficultyValue;
      }
    );

    filteredTripsRef.current = difficultyFilteredTrips;
    setIsFiltered(true);
  };

  const onTitleFilterChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const titleInput = ev.target.value;

    setTitleFilter(titleInput);

    handleFilters({ newTitle: titleInput });
  };

  const onDurationFilterChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const durationInput = ev.target.value as DurationSelectValue;

    setDurationFilter(durationInput);

    handleFilters({ newDuration: durationInput });
  };

  const onDifficultyFilterChange = (
    ev: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const difficultyInput = ev.target.value as DifficulySelectValue;

    setDifficultyFilter(difficultyInput);

    handleFilters({ newDifficulty: difficultyInput });
  };

  useEffect(() => {
    document.title = "Trips Page";

    const loggedUser = getLoggedUser();

    if (!loggedUser) {
      navigate("/sign-up");

      return;
    }

    userRef.current = loggedUser;
    tripsService.getTrips().then((trips) => {
      tripsRef.current = trips;

      setIsLoading(false);
    });
  });

  return (
    <>
      <Header user={userRef.current} />
      {isLoading ? (
        <main className="main-page__loading">
          <div className="loader"></div>
        </main>
      ) : (
        <main>
          <h1 className="visually-hidden">Travel App</h1>
          <section className="trips-filter">
            <h2 className="visually-hidden">Trips filter</h2>
            <form
              className="trips-filter__form"
              autoComplete="off"
              onSubmit={(ev) => ev.preventDefault()}
            >
              <label className="trips-filter__search input">
                <span className="visually-hidden">Search by name</span>
                <input
                  data-test-id="filter-search"
                  name="search"
                  type="search"
                  value={titleFilter}
                  onChange={onTitleFilterChange}
                  placeholder="search by title"
                />
              </label>
              <label className="select">
                <span className="visually-hidden">Search by duration</span>
                <select
                  data-test-id="filter-duration"
                  name="duration"
                  value={durationFilter}
                  onChange={onDurationFilterChange}
                >
                  <option value="">duration</option>
                  <option value="0_x_5">&lt; 5 days</option>
                  <option value="5_x_10">&lt; 10 days</option>
                  <option value="10">&ge; 10 days</option>
                </select>
              </label>
              <label className="select">
                <span className="visually-hidden">Search by level</span>
                <select
                  data-test-id="filter-level"
                  name="level"
                  value={difficultyFilter}
                  onChange={onDifficultyFilterChange}
                >
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
              {(isFiltered ? filteredTripsRef.current : tripsRef.current).map(
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
