import Booking, { bookingToRaw, RawBooking } from "~/data/models/booking";
import { RawTrip } from "~/data/models/trip";
import User from "~/data/models/user";

import rawBookings from "./_res/bookings.json";
import rawTrips from "./_res/trips.json";

class BookingsAPI {
  #bookings: RawBooking[] = [...rawBookings];

  getBookings(): RawBooking[] {
    return this.#bookings;
  }

  addBooking(booking: Booking): void {
    this.#bookings.push(bookingToRaw(booking));
  }

  removeBooking(id: string): void {
    this.#bookings = this.#bookings.filter((b) => b.id !== id);
  }
}

class TripsAPI {
  #trips = [...rawTrips];

  getTrips(): RawTrip[] {
    return this.#trips;
  }
}

class UsersAPI {
  #users: User[] = [];

  getUsers(): User[] {
    return this.#users;
  }

  addUser(user: User): void {
    this.#users.push(user);
  }
}

export const bookingsAPI = new BookingsAPI();
export const tripsAPI = new TripsAPI();
export const usersAPI = new UsersAPI();
