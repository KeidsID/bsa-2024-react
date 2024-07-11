import "./_.css";

type Props = {
  price: number;
  testId?: string;
};

export default function TripPrice({ price, testId = "" }: Props): JSX.Element {
  return (
    <div className="trip-price">
      <span>Price</span>
      <strong data-test-id={testId} className="trip-price__value">
        ${price}
      </strong>
    </div>
  );
}
