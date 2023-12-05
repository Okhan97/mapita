"use client";

import { useEffect } from "react";
import { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Mapita.css";

const MAP_DIV_ID = "mapita";

const Mapita = () => {
  useEffect(() => {
    new Map({
      container: MAP_DIV_ID,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-71, -35],
      zoom: 3.5,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    });
  });

  return <div id={MAP_DIV_ID} />;
};

export default Mapita;
