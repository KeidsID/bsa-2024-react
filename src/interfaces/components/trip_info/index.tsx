import "./_.css";

type Props = {
  title: string;
  duration: number;
  level: string;
  titleTestId?: string;
  durationTestId?: string;
  levelTestId?: string;
};

export default function TripInfo({
  title,
  duration,
  level,
  titleTestId = "",
  durationTestId = "",
  levelTestId = "",
}: Props): JSX.Element {
  return (
    <div className="trip-info">
      <h3 data-test-id={titleTestId} className="trip-info__title">
        {title}
      </h3>
      <div className="trip-info__content">
        <span data-test-id={durationTestId} className="trip-info__duration">
          <strong>{duration}</strong> {duration > 1 ? "days" : "day"}
        </span>
        <span data-test-id={levelTestId} className="trip-info__level">
          {level}
        </span>
      </div>
    </div>
  );
}
