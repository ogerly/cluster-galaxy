// Hintergrundbilder für die Cluster generieren und speichern
const starImages = [];

// Hilfsfunktion zum Zeichnen eines fiktiven Sternbilds
function drawConstellation(ctx, centerX, centerY, count) {
    const points = [];

    for (let i = 0; i < count; i++) {
        points.push({ x: centerX + getRandomInt(400) - 200, y: centerY + getRandomInt(400) - 200 });
    }

    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2, true);
        ctx.fillStyle = 'black';
        ctx.fill();
    });

    // Verbinde 80% der Punkte
    for (let i = 0; i < points.length - 1; i++) {
        if (Math.random() < 0.8) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i + 1].x, points[i + 1].y);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
}

function generateBackgroundImages(positions) {
    positions.forEach((pos, idx) => {
        const starCanvas = document.createElement('canvas');
        starCanvas.width = 400; // Größe des Sternenbildes
        starCanvas.height = 400;
        const starCtx = starCanvas.getContext('2d');

        // Zeichne 5 bis 15 Punkte als Sternenbild und verbinde 80% der Punkte
        drawConstellation(starCtx, starCanvas.width / 2, starCanvas.height / 2, Math.floor(Math.random() * (15 - 5 + 1)) + 5);
        starImages.push({
            image: starCanvas,
            x: pos.x - 200, // Position des Sternenbildes (zentriert)
            y: pos.y - 200
        });
    });
}

function drawBackgroundImages(ctx) {
    starImages.forEach(starImage => {
        ctx.drawImage(starImage.image, starImage.x, starImage.y);
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
