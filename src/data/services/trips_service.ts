import Trip, { tripFromRaw } from "~/data/models/trip";
import { tripsAPI } from "~/data/server_mock";
import { promiseDelayed } from "~/common/utils";

class TripsService {
  get #mappedRawTrips(): Trip[] {
    return tripsAPI.getTrips().map((e) => tripFromRaw(e));
  }

  async getTrips(): Promise<Trip[]> {
    await promiseDelayed(1000);

    return this.#mappedRawTrips;
  }

  async getTripDetail(id: string): Promise<Trip> {
    await promiseDelayed(1000);

    const trip = this.#mappedRawTrips.find((e) => e.id === id);

    if (!trip) throw new Error("Trip not found");

    return trip;
  }
}

const tripsService = new TripsService();

export default tripsService;
