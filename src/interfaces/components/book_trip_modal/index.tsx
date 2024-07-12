import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Trip from "~/data/models/trip";
import User from "~/data/models/user";
import bookingsService from "~/data/services/bookings_service";
import TripInfo from "~/interfaces/components/trip_info";
import "./_.css";

type Props = {
  user: User;
  trip: Trip;
  onClose?: () => void;
};

export default function BookTripModal({
  user,
  trip,
  onClose = () => {},
}: Props): JSX.Element {
  const { title, duration, level, price } = trip;

  const navigate = useNavigate();

  const [bookDate, setBookDate] = useState<Date | undefined>();
  const [bookGuests, setBookGuests] = useState(1);

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    bookingsService.addBooking({
      trip: {
        id: trip.id,
        title,
        duration,
        price,
      },
      booking: {
        userId: user.id,
        date: bookDate!,
        guests: bookGuests,
        totalPrice: price * bookGuests,
      },
    });

    navigate("/bookings");
  };

  return (
    <div className="modal">
      <div data-test-id="book-trip-popup" className="book-trip-popup">
        <button
          data-test-id="book-trip-popup-close"
          className="book-trip-popup__close"
          onClick={onClose}
        >
          ×
        </button>
        <form
          className="book-trip-popup__form"
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TripInfo
            title={title}
            duration={duration}
            level={level}
            titleTestId="book-trip-popup-title"
            durationTestId="book-trip-popup-duration"
            levelTestId="book-trip-popup-level"
          />
          <label className="input">
            <span className="input__heading">Date</span>
            <input
              data-test-id="book-trip-popup-date"
              name="date"
              type="date"
              value={bookDate?.toISOString().substring(0, 10)}
              onChange={(ev) => setBookDate(new Date(ev.target.value))}
              required
            />
          </label>
          <label className="input">
            <span className="input__heading">Number of guests</span>
            <input
              data-test-id="book-trip-popup-guests"
              name="guests"
              type="number"
              min="1"
              max="10"
              value={bookGuests}
              onChange={(ev) => setBookGuests(Number(ev.target.value))}
              required
            />
          </label>
          <span className="book-trip-popup__total">
            Total:
            <output
              data-test-id="book-trip-popup-total-value"
              className="book-trip-popup__total-value"
            >
              ${bookGuests * price}
            </output>
          </span>
          <button
            data-test-id="book-trip-popup-submit"
            className="button"
            type="submit"
          >
            Book a trip
          </button>
        </form>
      </div>
    </div>
  );
}
