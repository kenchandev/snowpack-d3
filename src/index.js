import * as d3 from "d3";
import { DIMENSIONS } from "./enums";

const { MARGINS, HEIGHT, WIDTH } = DIMENSIONS;

const loadDensityContours = async () => {
  const data = Object.assign(
    await d3.tsv("./data/faithful.tsv", ({ waiting: x, eruptions: y }) => ({
      x: +x,
      y: +y,
    })),
    { x: "Idle (min.)", y: "Erupting (min.)" }
  );

  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.x))
    .nice()
    .rangeRound([MARGINS.LEFT, WIDTH - MARGINS.RIGHT]);

  const y = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.y))
    .nice()
    .rangeRound([HEIGHT - MARGINS.BOTTOM, MARGINS.TOP]);

  const xAxis = (g) =>
    g
      .append("g")
      .attr("transform", `translate(0,${HEIGHT - MARGINS.BOTTOM})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("y", -3)
          .attr("dy", null)
          .attr("font-weight", "bold")
          .text(data.x)
      );

  const yAxis = (g) =>
    g
      .append("g")
      .attr("transform", `translate(${MARGINS.LEFT},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text(data.y)
      );

  const contours = d3
    .contourDensity()
    .x((d) => x(d.x))
    .y((d) => y(d.y))
    .size([WIDTH, HEIGHT])
    .bandwidth(30)
    .thresholds(30)(data);

  const svg = d3
    .select("#root")
    .append("svg")
    .attr("viewBox", [0, 0, WIDTH, HEIGHT])
    .attr("height", HEIGHT)
    .attr("width", WIDTH);

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);

  svg
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .selectAll("path")
    .data(contours)
    .enter()
    .append("path")
    .attr("stroke-width", (d, i) => (i % 5 ? 0.25 : 1))
    .attr("d", d3.geoPath());

  svg
    .append("g")
    .attr("stroke", "white")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => x(d.x))
    .attr("cy", (d) => y(d.y))
    .attr("r", 2);
};

loadDensityContours();

// UNCOMMENT OUT THE BELOW AND COMMENT OUT THE ABOVE FOR SMALLER BUNDLE.
// ONLY USE THE BELOW IF YOU UNDERSTAND THE MODULES/MICROLIBRARIES THAT COMPRISE D3.
//
// import { scaleLinear } from "d3-scale";
// import { extent } from "d3-array";
// import { tsv } from "d3-fetch";
// import { axisBottom, axisLeft } from "d3-axis";
// import { contourDensity } from "d3-contour";
// import { select } from "d3-selection";
// import { geoPath } from "d3-geo";
// import { DIMENSIONS } from "./enums";

// const { MARGINS, HEIGHT, WIDTH } = DIMENSIONS;

// const loadDensityContours = async () => {
//   const data = Object.assign(
//     await tsv("./data/faithful.tsv", ({ waiting: x, eruptions: y }) => ({
//       x: +x,
//       y: +y,
//     })),
//     { x: "Idle (min.)", y: "Erupting (min.)" }
//   );

//   const x = scaleLinear()
//     .domain(extent(data, (d) => d.x))
//     .nice()
//     .rangeRound([MARGINS.LEFT, WIDTH - MARGINS.RIGHT]);

//   const y = scaleLinear()
//     .domain(extent(data, (d) => d.y))
//     .nice()
//     .rangeRound([HEIGHT - MARGINS.BOTTOM, MARGINS.TOP]);

//   const xAxis = (g) =>
//     g
//       .append("g")
//       .attr("transform", `translate(0,${HEIGHT - MARGINS.BOTTOM})`)
//       .call(axisBottom(x).tickSizeOuter(0))
//       .call((g) => g.select(".domain").remove())
//       .call((g) =>
//         g
//           .select(".tick:last-of-type text")
//           .clone()
//           .attr("y", -3)
//           .attr("dy", null)
//           .attr("font-weight", "bold")
//           .text(data.x)
//       );

//   const yAxis = (g) =>
//     g
//       .append("g")
//       .attr("transform", `translate(${MARGINS.LEFT},0)`)
//       .call(axisLeft(y).tickSizeOuter(0))
//       .call((g) => g.select(".domain").remove())
//       .call((g) =>
//         g
//           .select(".tick:last-of-type text")
//           .clone()
//           .attr("x", 3)
//           .attr("text-anchor", "start")
//           .attr("font-weight", "bold")
//           .text(data.y)
//       );

//   const contours = contourDensity()
//     .x((d) => x(d.x))
//     .y((d) => y(d.y))
//     .size([WIDTH, HEIGHT])
//     .bandwidth(30)
//     .thresholds(30)(data);

//   const svg = select("#root")
//     .append("svg")
//     .attr("viewBox", [0, 0, WIDTH, HEIGHT])
//     .attr("height", HEIGHT)
//     .attr("width", WIDTH);

//   svg.append("g").call(xAxis);

//   svg.append("g").call(yAxis);

//   svg
//     .append("g")
//     .attr("fill", "none")
//     .attr("stroke", "steelblue")
//     .attr("stroke-linejoin", "round")
//     .selectAll("path")
//     .data(contours)
//     .enter()
//     .append("path")
//     .attr("stroke-width", (d, i) => (i % 5 ? 0.25 : 1))
//     .attr("d", geoPath());

//   svg
//     .append("g")
//     .attr("stroke", "white")
//     .selectAll("circle")
//     .data(data)
//     .enter()
//     .append("circle")
//     .attr("cx", (d) => x(d.x))
//     .attr("cy", (d) => y(d.y))
//     .attr("r", 2);
// };

// loadDensityContours();
