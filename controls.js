document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('clusterCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1900;
    canvas.height = 1000;

    let scale = 1;
    let originx = 0;
    let originy = 0;
    let startX, startY;
    let hoveredPoint = null;

    const colors = ['red', 'blue', 'green', 'orange']; // Clusterfarben
    
    window.positions = [
        { x: 300, y: 300 },   // Nord
        { x: 300, y: 700 },   // Süd
        { x: 1600, y: 300 },  // Ost
        { x: 1600, y: 700 }   // West
    ];

    generateBackgroundImages(window.positions);

    function setInitialZoom() {
        const canvasBounds = { width: canvas.width, height: canvas.height };
        const clusterBounds = { 
            minX: Math.min(...window.positions.map(p => p.x - 200)), 
            minY: Math.min(...window.positions.map(p => p.y - 200)), 
            maxX: Math.max(...window.positions.map(p => p.x + 200)), 
            maxY: Math.max(...window.positions.map(p => p.y + 200)) 
        };

        const clusterWidth = clusterBounds.maxX - clusterBounds.minX;
        const clusterHeight = clusterBounds.maxY - clusterBounds.minY;

        scale = Math.min(canvasBounds.width / clusterWidth, canvasBounds.height / clusterHeight) * 0.9;

        originx = canvasBounds.width / 2 - (clusterBounds.minX + clusterWidth / 2) * scale;
        originy = canvasBounds.height / 2 - (clusterBounds.minY + clusterHeight / 2) * scale;
    }

    function drawPoint(ctx, point, color, isHovered) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2, true);
        ctx.fillStyle = color || 'orange'; // Setze eine Standardfarbe
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.setTransform(scale, 0, 0, scale, originx, originy);

        drawBackgroundImages(ctx);

        if (window.clusters) {
            window.clusters.forEach((cluster, idx) => {
                cluster.forEach(point => {
                    drawPoint(ctx, point, colors[idx], point === hoveredPoint);
                });
            });
        }

        ctx.restore();
    }

    canvas.addEventListener('wheel', (event) => {
        event.preventDefault();
        const mouseX = event.offsetX - originx;
        const mouseY = event.offsetY - originy;
        const wheel = event.deltaY < 0 ? 1.1 : 0.9;
        const newScale = scale * wheel;

        originx -= mouseX * (newScale - scale);
        originy -= mouseY * (newScale - scale);
        scale = newScale;

        draw();
    });

    canvas.addEventListener('mousedown', (event) => {
        startX = event.offsetX - originx;
        startY = event.offsetY - originy;
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(event) {
        originx = event.offsetX - startX;
        originy = event.offsetY - startY;
        draw();
    }

    function onMouseUp() {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseup', onMouseUp);
    }

    canvas.addEventListener('click', (event) => {
        const mouseX = (event.offsetX - originx) / scale;
        const mouseY = (event.offsetY - originy) / scale;

        if (window.clusters) {
            window.clusters.forEach((cluster, idx) => {
                cluster.forEach(point => {
                    if (distance({ x: mouseX, y: mouseY }, point) <= point.size) {
                        alert(`Cluster ${idx + 1}, Benutzer: ${point.user.name}, Email: ${point.user.email}, Alter: ${point.user.age}`);
                    }
                });
            });
        }
    });

    canvas.addEventListener('mousemove', (event) => {
        const mouseX = (event.offsetX - originx) / scale;
        const mouseY = (event.offsetY - originy) / scale;
        let found = false;

        if (window.clusters) {
            window.clusters.forEach((cluster) => {
                cluster.forEach(point => {
                    if (distance({ x: mouseX, y: mouseY }, point) <= point.size) {
                        hoveredPoint = point;
                        found = true;
                    }
                });
            });
        }

        if (!found) {
            hoveredPoint = null;
        }

        draw();
    });

    setInitialZoom();

    draw();
});
