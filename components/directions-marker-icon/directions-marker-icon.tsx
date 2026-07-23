import "./directions-marker-icon.css";

export function DirectionsMarkerIcon() {
  return (
    <span className="directions-marker-icon-shell" aria-hidden>
      <span className="directions-marker-icon">
        <div className="marker" />
        <span className="beacon" />
      </span>
    </span>
  );
}
