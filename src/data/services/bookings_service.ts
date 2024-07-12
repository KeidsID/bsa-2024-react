import { promiseDelayed } from "~/common/utils";
import Booking, { bookingFromRaw } from "~/data/models/booking";
import { bookingsAPI } from "~/data/server_mock";
import Trip from "../models/trip";

class BookingsService {
  get #mappedRawBookings(): Booking[] {
    return bookingsAPI.getBookings().map((e) => bookingFromRaw(e));
  }

  async getBookings(): Promise<Booking[]> {
    await promiseDelayed(1000);

    return this.#mappedRawBookings;
  }

  async addBooking({
    trip,
    booking,
  }: {
    trip: Pick<Trip, "id" | "title" | "duration" | "price">;
    booking: Omit<Booking, "id" | "tripId" | "createdAt" | "trip">;
  }): Promise<void> {
    await promiseDelayed(1000);

    const { id: tripId, title, duration, price } = trip;

    const id = window.crypto.randomUUID();
    const createdAt = new Date();

    const newBooking: Booking = {
      id,
      tripId,
      trip: {
        title,
        duration,
        price,
      },
      ...booking,
      createdAt,
    };

    bookingsAPI.addBooking(newBooking);
  }
}

const bookingsService = new BookingsService();

export default bookingsService;
