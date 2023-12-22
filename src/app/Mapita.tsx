"use client";

import { useEffect } from "react";
import { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Mapita.css";
import regionesJSON from "../data/regiones.json";
import populationJSON from "../data/population.json";
import { colorByValue } from "./utils";
import { REGIONS_CODES, REGIONS_INFO } from "./constants";

const MAP_DIV_ID = "mapita";

const Mapita = () => {
  useEffect(() => {
    const map = new Map({
      container: MAP_DIV_ID,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [-71, -35],
      zoom: 3.5,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    });
    map.on("load", () => {
      for (let i = 0; i < REGIONS_CODES.length; i++) {
        const currentRegionIndex = regionesJSON.features.findIndex(
          //@ts-ignore string type error
          (a) => a.properties.Region === REGIONS_INFO[REGIONS_CODES[i]].name
        );
        const color = colorByValue({
          value: parseInt(
            //@ts-ignore string type error
            populationJSON[REGIONS_CODES[i]][2023].replace(/\,/g, "")
          ),
          max: 2000000,
          min: 0,
        });
        const regionData = regionesJSON.features[currentRegionIndex];
        map.addSource(regionData.properties.Region, {
          type: "geojson",
          //@ts-ignore string type error
          data: regionData,
        }),
          map.addLayer({
            id: regionData.properties.Region,
            type: "fill",
            source: regionData.properties.Region, // reference the data source
            paint: {
              "fill-color": color, // blue color fill
              "fill-opacity": 0.6,
            },
          });
      }
    });
  });

  return <div id={MAP_DIV_ID} />;
};

export default Mapita;
