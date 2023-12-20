"use client";

import { useEffect } from "react";
import { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Mapita.css";
import regionesJSON from "../data/regiones.json";

const MAP_DIV_ID = "mapita";

const Mapita = () => {
  useEffect(() => {
    const map = new Map({
      container: MAP_DIV_ID,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-71, -35],
      zoom: 3.5,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    });
    map.on("load", () => {
      for (let i = 0; i < regionesJSON.features.length; i++) {
        const color = i % 2 ? "#0080ff" : "#ff8c00";
        map.addSource(regionesJSON.features[i].properties.Region, {
          type: "geojson",
          //@ts-ignore string type error
          data: regionesJSON.features[i],
        }),
          map.addLayer({
            id: regionesJSON.features[i].properties.Region,
            type: "fill",
            source: regionesJSON.features[i].properties.Region, // reference the data source
            paint: {
              "fill-color": color, // blue color fill
              "fill-opacity": 0.5,
            },
          });
      }
    });
  });

  return <div id={MAP_DIV_ID} />;
};

export default Mapita;
