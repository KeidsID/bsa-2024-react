import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Trip from "~/data/models/trip";
import tripsService from "~/data/services/trips_service";
import Header from "~/interfaces/components/header";
import Footer from "~/interfaces/components/footer";
import useLoggedUser from "~/interfaces/hooks/use_logged_user";
import TripInfo from "~/interfaces/components/trip_info";
import TripPrice from "~/interfaces/components/trip_price";
import NotFoundPage from "~/interfaces/pages/not_found_page";
import "./_.css";
import BookTripModal from "~/interfaces/components/book_trip_modal";

export default function TripPage(): JSX.Element {
  const loggedUser = useLoggedUser();
  const { tripId } = useParams();

  const tripRef = useRef<Trip | undefined>();

  const [isLoading, setIsLoading] = useState(true);
  const [isShowBookModal, setIsShowBookModal] = useState(false);

  useEffect(() => {
    document.title = "Trip Detail Page";

    if (!tripId) {
      setIsLoading(false);

      return;
    }

    const fetchTrip = async () => {
      try {
        const trip = await tripsService.getTripDetail(tripId);
        tripRef.current = trip;
      } catch (error) {
        console.warn(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrip();
  }, [tripId]);

  return (
    <>
      <Header user={loggedUser} />
      <main className="trip-page">
        <h1 className="visually-hidden">Travel App</h1>

        {isLoading ? (
          <div className="loader"></div>
        ) : !tripRef.current ? (
          <NotFoundPage message="Trip not found" plain>
            <Link to="/">Back to main page</Link>
          </NotFoundPage>
        ) : (
          <div className="trip">
            <img
              data-test-id="trip-details-image"
              src={tripRef.current.image}
              className="trip__img"
              alt="trip photo"
            />
            <div className="trip__content">
              <TripInfo
                title={tripRef.current.title}
                duration={tripRef.current.duration}
                level={tripRef.current.level}
                titleTestId="trip-details-title"
                durationTestId="trip-details-duration"
                levelTestId="trip-details-level"
              />
              <div
                data-test-id="trip-details-description"
                className="trip__description"
              >
                {tripRef.current.description}
              </div>
              <TripPrice
                price={tripRef.current.price}
                testId="trip-details-price-value"
              />
              <button
                data-test-id="trip-details-button"
                className="trip__button button"
                onClick={() => setIsShowBookModal(true)}
              >
                Book a trip
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <div hidden={!isShowBookModal}>
        {tripRef.current && (
          <BookTripModal
            trip={tripRef.current}
            onClose={() => setIsShowBookModal(false)}
          />
        )}
      </div>
    </>
  );
}
