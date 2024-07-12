import { useEffect, useRef, useState } from "react";

import Booking from "~/data/models/booking";
import bookingsService from "~/data/services/bookings_service";
import Footer from "~/interfaces/components/footer";
import Header from "~/interfaces/components/header";
import useSimpleAuth from "~/interfaces/hooks/use_simple_auth";
import "./_.css";

export default function BookingsPage(): JSX.Element {
  const loggedUser = useSimpleAuth();

  const bookingsRef = useRef<Booking[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    const bookings = await bookingsService.getBookings();

    bookingsRef.current = bookings.sort(({ date: aDate }, { date: bDate }) => {
      return aDate.getTime() - bDate.getTime();
    });
  };

  useEffect(() => {
    document.title = "Travel App | Bookings Page";

    fetchBookings().then(() => setIsLoading(false));
  });

  return (
    <>
      <Header user={loggedUser} />
      <main className="bookings-page">
        <h1 className="visually-hidden">Travel App</h1>
        <ul className="bookings__list">
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            bookingsRef.current.map(
              ({ id, trip, guests, date, totalPrice }) => {
                const { title } = trip;

                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();

                const formattedMonth =
                  `${month}`.length === 1 ? `0${month}` : month;
                const formattedDay = `${day}`.length === 1 ? `0${day}` : day;

                return (
                  <li key={id} data-test-id="booking" className="booking">
                    <h3 data-test-id="booking-title" className="booking__title">
                      {title}
                    </h3>
                    <span
                      data-test-id="booking-guests"
                      className="booking__guests"
                    >
                      {`${guests} ${guests > 1 ? "guests" : "guest"}`}
                    </span>
                    <span data-test-id="booking-date" className="booking__date">
                      {`${year}-${formattedMonth}-${formattedDay}`}
                    </span>
                    <span
                      data-test-id="booking-total"
                      className="booking__total"
                    >
                      ${totalPrice}
                    </span>
                    <button
                      data-test-id="booking-cancel"
                      className="booking__cancel"
                      title="Cancel booking"
                      onClick={async () => {
                        setIsLoading(true);
                        await bookingsService.removeBooking(id);

                        await fetchBookings();
                        setIsLoading(false);
                      }}
                    >
                      <span className="visually-hidden">Cancel booking</span>×
                    </button>
                  </li>
                );
              }
            )
          )}
        </ul>
      </main>
      <Footer />
    </>
  );
}
