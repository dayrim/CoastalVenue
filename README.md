# CoastalVenue
Most beautiful wedding venue in the world. Vist https://dayrim.com/coastalvenue/ to see the project live.

## How to build and host the project locally

- Install npm and node https://nodejs.org/en/.
- Download project or run `git clone https://github.com/dayrim/erply-webshop.git` to clone project.
- Go to project root.
- Run `npm install` to download all flagged dependencies and build the project. All build artifacts will be stored in the `public/` directory.
- Run `npm start` to start development server.
- Navigate to `http://localhost:8083/`.

## About build process

Project uses webpack to build source files from src folder into public directory.
Folder structure:

## Requirments


General:
- Design is provided in Sketch application - https://www.sketchapp.com/. Trial version is available.
- Website should be fully responsive, both narrow and wider window screen sizes should be covered.
- Minimum website width is 320px. Past that point horizontal scrollbar can be served.
- Responsive layout design is up to developer.
- Maximum width of blocks is shown in the design.
- Blocks spanning from edge to edge should always stay 100% of window width
- Responsive version should be done with css @media property, javascript should not be used.


Images
- All images should be optimised for web. All graphic elements, except for photos, should be, when applicable and reasonable, supplied in .svg format.


Fonts
- All fonts used in design should be converted to .woff and .woff2 formats in https://www.fontsquirrel.com/tools/webfont-generator. All fonts used in design can be found
on fonts.google.com


Elements
- In each set of elements one element is shown under hover effect. All sibling elements should behave same way when hovered with mouse.
- If a block contains multiple elements of the same type - it should be developed to allow any number of such elements.
- All text content blocks should be developed to allow text content to be any length except for text inside slider images. Those should cut excess text off.
- Sliders should be done with Swiper.js. All pagination bullets under sliders should be clickable. Semi-transparent slides near the edges should be clickable slider arrows.
- Top photo block should be 100% window height.
- Clicking on any gallery photo should open full-screen photo popup with ability to slide to all other gallery photos. Any javascript gallery plugin can be used.
- Second artboard shows scrolled state. Header with menu items and logo should appear after website is scrolled down. Header should stick to the top of the window


Scripts:
- Any Javascript framework can be used
- Overall Javascript should be used as less as possible


Compatibility & Optimization:
- Website should be crossbrowser compatible, and should work on:
a) Latest desktop versions of Chrome, Safari, Firefox, IE11, IE Edge.
b) On any modern android tablet and iPad
c) On any modern version of android phone and iPhone.
Code should be the same for all browsers, i.e. you should not use any browser version detection methods.
- Usage of any javascript or css compiler is highly encouraged. Please sort all assets (css, scripts, images) in corresponding folders.
- Usage of W3C Standards is highly encouraged
