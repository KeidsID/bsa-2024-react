import tripsMock from "~/data/storage_mock/trips.json";

import Trip, { tripFromRaw } from "~/data/models/trip";
import { promiseDelayed } from "~/common/utils";

class TripsService {
  get #mappedMockTrips(): Trip[] {
    return tripsMock.map((rawTrip) => tripFromRaw(rawTrip));
  }

  async getTrips(): Promise<Trip[]> {
    await promiseDelayed(1000);

    return this.#mappedMockTrips;
  }

  async getTripDetail(id: string): Promise<Trip> {
    await promiseDelayed(1000);

    const trip = this.#mappedMockTrips.find((e) => e.id === id);

    if (!trip) throw new Error("Trip not found");

    return trip;
  }
}

const tripsService = new TripsService();

export default tripsService;
