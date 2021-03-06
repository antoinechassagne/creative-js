// variables globales
var can;
var c;
var tab_part = [];
var total = 2000;
var mouseX = 0;
var mouseY = 0;

function init() {
    // mise en variable du canvas
    can = document.getElementById('myCanva');
    // mise en variable du context 2d (espace graphique)
    c = can.getContext('2d');
    generate();
    setInterval(loop, 10);
    document.getElementById('myCanva').onmousemove = getMousePosition;
}

function generate() {

    for (var index = 0; index < total; index++) {

        var angulo = 360 / total * index * Math.PI / 180;
        var hue = angulo / (Math.PI * 2) * 360;
        var col = 'hsl(' + hue + ',90%, 50%)';
        var dx = 250 + Math.cos(angulo) * 10*(1+index%10);
        var dy = 250 + Math.sin(angulo) * 10*(1+index%10);
        // generation
        var part = {
            posx: 250,
            posy: 250,
            vit: 1 + Math.random() * 100,
            destx: dx,
            desty: dy,
            o_destx: dx,
            o_desty: dy,
            couleur: col,
            timer: 0

        }
        tab_part.push(part);
    }
}

function loop() {

    // c.clearRect(0, 0, 500, 500);
    c.fillStyle = 'rgba(255,255,255,.25)';
    c.rect(0, 0, 500, 500);
    c.fill();

    for (var index = 0; index < tab_part.length; index++) {

        var currentpart = tab_part[index];

        var originDistX = currentpart.o_destx - currentpart.posx;
        var originDistY = currentpart.o_desty - currentpart.posy;
        var originDistance = Math.sqrt((originDistX * originDistX) + (originDistY * originDistY));
        var d = 1 / (1 + originDistance / 100);

        // affichage
        c.fillStyle = currentpart.couleur;
        c.beginPath();
        c.ellipse(currentpart.posx, currentpart.posy, d, d, 0, 0, 2 * Math.PI);
        c.fill();

        // deplacement
        currentpart.posx += (currentpart.destx - currentpart.posx) / currentpart.vit;
        currentpart.posy += (currentpart.desty - currentpart.posy) / currentpart.vit;

        // pythagore calcul de distance
        var distancex = mouseX - currentpart.posx;
        var distancey = mouseY - currentpart.posy;
        var distance = Math.sqrt((distancex * distancex) + (distancey * distancey));


        if (distance < 50) {

            var repulseangle = Math.atan2((currentpart.posy - mouseY), (currentpart.posx - mouseX));
            var newDestX = currentpart.posx + Math.cos(repulseangle) * currentpart.vit * 5;
            var newDestY = currentpart.posy + Math.sin(repulseangle) * currentpart.vit * 5;

            currentpart.destx = newDestX;
            currentpart.desty = newDestY;
            currentpart.timer = Math.round(50 + Math.random() * 150);
        }

        // gestion timer
        if (currentpart.timer > 0) {
            currentpart.timer--;
        }

        if (currentpart.timer == 0) {
            currentpart.destx = currentpart.o_destx;
            currentpart.desty = currentpart.o_desty;
        }

    }
}

function getMousePosition(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}















