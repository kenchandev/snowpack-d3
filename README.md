# Snowpack + D3 Development Environment

Quickly build D3 visualizations (v6) with a robust development environment that offers the following out-of-the-box features:

- Hot-Module Replacement and Fast Refresh
- Integrates Webpack (Via [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-webpack) Plugin) for a Production-Optimized Build
- Targets IE 11 via [Browserslist](https://github.com/browserslist/browserslist)
- Preview Production-Optimized Build via [http-server](https://github.com/http-party/http-server)
- Automatic Polyfill Injection
- ES6+ Syntax Support

![Safari](https://www.dl.dropboxusercontent.com/s/cspqf98zplp4qpy/Screen%20Shot%202021-01-20%20at%202.00.33%20PM.png)

![IE 11](https://www.dl.dropboxusercontent.com/s/m7ap34fiqvmwovk/ie11-d3-visualization.png)

_Example Visualization Source_: https://observablehq.com/@d3/density-contours

The `snowpack.config.js` file is heavily annotated with comments. Be sure to read through the comments!

This project is bootstrapped with [blank template](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/app-template-blank) of [Create Snowpack App](https://github.com/snowpackjs/snowpack) (CSA).

## Production-Optimized Build

The size of the application's production-optimized build will depend on how you import the D3 library into the project.

### Importing the Entire D3 Library

```javascript
import * as d3 from d3
```

![Bundle Size - Importing the Entire D3 Library](https://www.dl.dropboxusercontent.com/s/9p0260ho4s7v8ko/Screen%20Shot%202021-01-20%20at%2012.56.47%20PM.png)

### Importing Constituent D3 Libraries

```javascript
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { tsv } from "d3-fetch";
import { axisBottom, axisLeft } from "d3-axis";
import { contourDensity } from "d3-contour";
import { select } from "d3-selection";
import { geoPath } from "d3-geo";
```

![Bundle Size - Importing Constituent D3 Libraries](https://www.dl.dropboxusercontent.com/s/wbock00z3v9ah33/Screen%20Shot%202021-01-20%20at%201.07.54%20PM.png)

## Available Scripts

### npm start

Runs the application in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your application is ready to be deployed!

### npm run serve

Runs the production-optimized application.
Open http://localhost:5555 to view it in the browser.
