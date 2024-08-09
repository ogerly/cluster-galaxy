 
# CelestialClusters

## Overview
CelestialClusters is a visually immersive tool that brings data clusters to life within a celestial-themed environment. Utilizing HTML5 Canvas and JavaScript, this tool offers interactive exploration of data clusters set against star-studded backdrops.

## Features
- **Celestial Backdrops**: Data clusters are overlaid on celestial star patterns.
- **Interactive Clusters**: Zoom, pan, and click to delve into cluster details.
- **Flexible Canvas**: The canvas adjusts to fit various screen sizes for optimal viewing.

## Demo
Check out a live demo of the project on CodePen:
[CelestialClusters Demo](https://codepen.io/yourcodepenlink)

## Installation
To run this project locally, clone the repository and open the `index.html` file in your browser.

```bash
git clone https://github.com/yourusername/CelestialClusters.git
cd CelestialClusters


```
Then, open index.html in your preferred web browser.

## Usage
- Zoom: Use the mouse wheel to zoom in and out.
- Pan: Click and drag to move around the canvas.
- Click: Click on a data point to see more information about the user it represents.


## License
This project is licensed under the MIT License.



## Cross-Origin Resource Sharing (CORS) Server

Um das Projekt lokal zu testen und sicherzustellen, dass keine CORS-Probleme auftreten, wird ein einfacher Python-Server (`cors_server.py`) bereitgestellt. Dieser Server fügt die notwendigen CORS-Header hinzu, um den Zugriff von verschiedenen Quellen zu ermöglichen.

#### Starten des CORS-Servers

1. Stelle sicher, dass Python installiert ist (Python 3 empfohlen).
2. Navigiere in das Projektverzeichnis.
3. Starte den Server mit folgendem Befehl:
   ```sh
   python3 cors_server.py
   ```
4. Der Server wird auf `http://localhost:8000` laufen.

Der `cors_server.py` ist im Projekt enthalten, um sicherzustellen, dass die HTML-Dateien problemlos von einem lokalen Server geladen werden können, ohne dass CORS-Probleme auftreten. Dies ist besonders nützlich, wenn das Projekt auf verschiedene Domains oder Subdomains verteilt wird.