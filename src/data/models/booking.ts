export default interface Booking {
  readonly id: string;
  readonly userId: string;
  readonly tripId: string;
  readonly guests: number;
  readonly date: Date;
  readonly trip: BookingTrip;
  readonly totalPrice: number;
  readonly createdAt: Date;
}

export interface BookingTrip {
  readonly title: string;
  readonly duration: number;
  readonly price: number;
}

export interface RawBooking {
  readonly id: string;
  readonly userId: string;
  readonly tripId: string;
  readonly guests: number;
  readonly date: string;
  readonly trip: BookingTrip;
  readonly totalPrice: number;
  readonly createdAt: string;
}

export function bookingFromRaw({
  date,
  createdAt,
  ...rest
}: RawBooking): Booking {
  return {
    date: new Date(date),
    createdAt: new Date(createdAt),
    ...rest,
  };
}

export function bookingToRaw({
  date,
  createdAt,
  ...rest
}: Booking): RawBooking {
  return {
    date: date.toISOString(),
    createdAt: createdAt.toISOString(),
    ...rest,
  };
}
