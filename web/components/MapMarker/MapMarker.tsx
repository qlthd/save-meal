import React from "react";

interface MapMarkerProps {
  lat: number;
  lng: number;
  number: number;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick?: () => void;
}

export const MapMarker = (props: MapMarkerProps) => {
  const { hovered, onMouseEnter, onMouseLeave, onClick } = props;
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        position: "relative",
        zIndex: hovered ? 10 : 1,
        transform: "translate(-50%, -100%)",
        cursor: "pointer",
        top: "100%",
        left: "50%",
        height: "24px",
        width: "24px",
      }}
    >
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 22s7-7.58 7-12A7 7 0 0 0 5 10c0 4.42 7 12 7 12Z"
          fill="#1B4D3E"
          stroke="#FFFF"
          strokeWidth="1"
        />
        <circle
          cx="12"
          cy="10"
          r="3"
          fill="#fff"
          stroke="#222"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};
