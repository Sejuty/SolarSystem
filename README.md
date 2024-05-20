# Solar System Visualization

This project is a 3D visualization of the solar system built using [Three.js](https://threejs.org/). It allows users to view and explore different planets, including the Sun, through an interactive interface.

## Features

- Realistic textures for the Sun and planets.
- Ability to switch views between different planets and the Sun.
- Orbit controls for easy navigation.
- Dynamic resizing to fit the window size.

## Installation

1. Clone the repository:

    ```bash
    https://github.com/Sejuty/SolarSystem.git
    cd SolarSystem
    ```

2. Install dependencies:

    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

4. Start the development server:

    ```bash
    npm run dev 
    ```
    For yarn
   ```bash
   yarn dev
   ```
6. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Controls

- **Initial View**: Click the "Initial View" button to reset the camera to the initial view.
- **Sun View**: Click the "Sun" button to switch the camera to the Sun's perspective.
- **Planet Views**: Click on any planet button (Mercury, Venus, Earth, etc.) to switch the camera to that planet's perspective.

### Navigation

- Use the mouse to orbit around the scene.
- Scroll to zoom in and out.
- Click and drag to pan the view.

## Project Structure

- **index.html**: The main HTML file.
- **solar-system.js**: The main JavaScript file containing the Three.js logic.
- **resources/solar-system/**: Folder containing the texture images for the Sun and planets.

### Planet View
![Planet View]()

## Dependencies

- [Three.js](https://threejs.org/): A 3D library that makes WebGL simpler.
- [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls): A Three.js extension for easy orbiting.


## Acknowledgements

- [NASA](https://nasa.gov/) for the planetary data and textures.
- [Three.js](https://threejs.org/) for providing an amazing library for 3D rendering.
- This project was inspired by the tutorial from [Tutorial Source](https://youtu.be/XXzqSAt3UIw?si=QFHdx2dm7XNXyOna). Special thanks to the author for the detailed guide.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## Contact

For any inquiries, please reach out to [tafannumnishat00@gmail.com](mailto:tafannumnishat00@gmail.com).
