export default interface Trip {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly level: string;
  readonly duration: number;
  readonly price: number;
  readonly image: string;
  readonly createdAt: Date;
}

export interface RawTrip {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly level: string;
  readonly duration: number;
  readonly price: number;
  readonly image: string;
  readonly createdAt: string;
}

export function tripFromRaw({ createdAt, ...rest }: RawTrip): Trip {
  return {
    createdAt: new Date(createdAt),
    ...rest,
  };
}

export function tripToRaw({ createdAt, ...rest }: Trip): RawTrip {
  return {
    createdAt: createdAt.toISOString(),
    ...rest,
  };
}
