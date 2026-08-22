"use client";

import { useEffect, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";

type GeoFeature = {
  type: "Feature";
  properties: Record<string, unknown>;
  geometry: GeoJSON.Geometry;
};

const SIZE = 600;

export function GlobeAnimation() {
  const [landPath, setLandPath] = useState<string>("");
  const [graticulePath, setGraticulePath] = useState<string>("");
  const [outlinePath, setOutlinePath] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    fetch("https://unpkg.com/world-atlas@2/countries-110m.json")
      .then((res) => res.json())
      .then((topology) => {
        if (cancelled) return;

        const land = feature(
          topology,
          topology.objects.countries
        ) as unknown as { features: GeoFeature[] };

        const projection = geoOrthographic()
          .scale(SIZE / 2.1)
          .translate([SIZE / 2, SIZE / 2])
          .rotate([-10, -15, 0]); // fixed viewing angle, tweak to taste

        const path = geoPath(projection);

        // Country/continent outlines
        const landD = path({ type: "FeatureCollection", features: land.features } as any);
        setLandPath(landD || "");

        // Lat/long mesh lines (the "wireframe" grid)
        const graticule = geoGraticule10();
        setGraticulePath(path(graticule) || "");

        // Outer circle of the sphere
        const outline = { type: "Sphere" } as any;
        setOutlinePath(path(outline) || "");
      })
      .catch((err) => console.error("Failed to load boundary data:", err));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full max-w-[600px] mx-auto flex items-center justify-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width="100%"
        height="100%"
        style={{ aspectRatio: "1/1" }}
      >
        {/* sphere outline */}
        <path
          d={outlinePath}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={1}
        />
        {/* lat/long mesh */}
        <path
          d={graticulePath}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={0.5}
        />
        {/* continents, wireframe only (no fill) */}
        <path
          d={landPath}
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth={0.75}
        />
      </svg>
    </div>
  );
}