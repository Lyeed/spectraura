# SpectrAura - AI-powered sound visualizations

SpectrAura is a web application that leverages the Web Audio API and HTML5 Canvas to generate real-time, interactive music visualizations. Users can upload audio or stream via the built-in player, while an AI assistant (The Spectre) generates and refines visualization logic through JavaScript.

Currently supported models:

- Gemini 2.5 flash

---

## Installation

Requirements:

- Node.js
  https://nodejs.org/en/download/current

## Development server

To start (and watch) the development application, run `npm start` and go to http://localhost:8080

## Production build

Run `npm run build`

Bundled application is located inside `dist` folder. Entry point is `index.html`.

## Development tooling

- `npm run prettier` to enforce coding style and format
- `npm run typescript` to check types errors
- `npm run xo` to run code linter

## Author

Gautier Jousset
@Lyeed
https://lyeed.github.io/

## Samples

References

- [Phonk](https://pixabay.com/music/upbeat-phonk-music-388293/)
- [Lofi](https://pixabay.com/music/beats-lofi-study-calm-peaceful-chill-hop-112191/)
- [Rap beat](https://pixabay.com/music/trap-royalty-free-element-hard-rap-beat-231463/)
