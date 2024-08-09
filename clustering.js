// Lade das Benutzer-JSON
let users = [];

fetch('users.json')
    .then(response => response.json())
    .then(data => {
        users = data;
        initClusters(); // Initialisiere Cluster erst, wenn die Benutzerdaten geladen sind
    });


// Definiere die distance-Funktion
function distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function initClusters() {
    // Clustergrößen zufällig generieren
    const clusterSizes = Array.from({length: 4}, () => Math.floor(Math.random() * (200 - 3 + 1)) + 3);

    const data = generateSpecificData(clusterSizes, window.positions);

    // Cluster erstellen und global verfügbar machen
    window.clusters = kMeans(data, 4);

    // Zeichnen der Cluster, nachdem sie erstellt wurden
    if (typeof draw === 'function') {
        draw();
    }
}

// Generiere spezifische Datenpunkte für die 4 Cluster
function generateSpecificData(clusterSizes, positions) {
    const data = [];
    let userIndex = 0;
    clusterSizes.forEach((size, idx) => {
        const centerX = positions[idx].x;
        const centerY = positions[idx].y;
        const points = new Set();

        // Größe des Sternbildes, um die Clusterpunkte darauf zu platzieren
        const starImage = starImages[idx];
        const starWidth = starImage.image.width;
        const starHeight = starImage.image.height;

        for (let i = 0; i < size; i++) {
            let point;
            do {
                const angle = Math.random() * 2 * Math.PI;
                const radius = Math.random() * Math.min(starWidth, starHeight) / 2;
                point = {
                    x: starImage.x + starWidth / 2 + radius * Math.cos(angle),  // Punkt innerhalb des Sternbildes platzieren
                    y: starImage.y + starHeight / 2 + radius * Math.sin(angle), // Punkt innerhalb des Sternbildes platzieren
                    size: Math.random() < 0.02 ? 15 : (Math.random() < 0.1 ? 10 : 5), // Gewichtung der Punktgröße
                    user: users[userIndex] // Weisen Sie einem Punkt einen Benutzer zu
                };
            } while (Array.from(points).some(p => distance(p, point) < (p.size + point.size)));

            points.add(point);
            data.push(point);
            userIndex = (userIndex + 1) % users.length; // Wiederholen, wenn wir am Ende der Liste sind
        }
    });
    return data;
}


function kMeans(data, k) {
    const centroids = initializeCentroids(data, k);
    let clusters;

    for (let i = 0; i < 10; i++) { // Iteriere eine fixe Anzahl von Malen
        clusters = assignPointsToClusters(data, centroids);
        updateCentroids(clusters, centroids);
    }

    return clusters;
}

function initializeCentroids(data, k) {
    const centroids = [];
    for (let i = 0; i < k; i++) {
        centroids.push(data[Math.floor(Math.random() * data.length)]);
    }
    return centroids;
}

function assignPointsToClusters(data, centroids) {
    const clusters = Array.from({ length: centroids.length }, () => []);
    data.forEach(point => {
        let closestIndex = 0;
        let closestDistance = distance(point, centroids[0]);
        for (let i = 1; i < centroids.length; i++) {
            const dist = distance(point, centroids[i]);
            if (dist < closestDistance) {
                closestDistance = dist;
                closestIndex = i;
            }
        }
        clusters[closestIndex].push(point);
    });
    return clusters;
}

function updateCentroids(clusters, centroids) {
    clusters.forEach((cluster, index) => {
        if (cluster.length > 0) {
            const newCentroid = cluster.reduce(
                (mean, point) => ({
                    x: mean.x + point.x / cluster.length,
                    y: mean.y + point.y / cluster.length
                }),
                { x: 0, y: 0 }
            );
            centroids[index] = newCentroid;
        }
    });
}
