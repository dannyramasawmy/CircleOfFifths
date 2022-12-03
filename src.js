/*
#FFFFFF - white
#DEEFE7 - light green
#002333 - dark blue
#159A9C - tourquoise
#B4BEC9 - grey
*/


const COLOURS =
{
    CENTRAL_CIRCLE: '#002333',
    CIRCLE_BORDER_FADE: '#159A9C',
    CIRCLE_BORDER: '#159A9C',
    FACE: '#DEEFE7'
};

const NOTE =
{
    C : 0,
    Db : 7,
    D : 2,
    Eb : 9,
    E : 4,
    F : 11,
    Gb : 6,
    G : 1,
    A : 3,
    Ab : 8,
    B : 5,
    Bb : 10,
};

const ToRadians = (degrees) => degrees * Math.PI / 180;

const START_OF_CIRCLE_BORDER = 0.95;

var START_STATE = [NOTE.C, NOTE.Db, NOTE.D, NOTE.Eb, NOTE.E, NOTE.F, NOTE.Gb, NOTE.G, NOTE.Ab, NOTE.A, NOTE.Bb, NOTE.B];
var CURRENT_STATE = [NOTE.C, NOTE.Db, NOTE.D, NOTE.Eb, NOTE.E, NOTE.F, NOTE.Gb, NOTE.G, NOTE.Ab, NOTE.A, NOTE.Bb, NOTE.B];

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// ctx.scale(2, 2);
var radius = canvas.height / 2;
ctx.translate(canvas.width / 2, radius);
radius = radius * 0.90
drawCircleOfFifths();

function UpdateState(number)
{
    CURRENT_STATE[number] = CURRENT_STATE[number] == null
        ? START_STATE[number]
        : null;

    drawCircleOfFifths();
}

function drawCircleOfFifths() {
    drawFace(ctx, radius);
    drawNotes(ctx, radius);
    drawSegments(ctx, radius)
    // drawNoteMask(ctx, radius)
    drawScaleMask(ctx, radius, CURRENT_STATE) 
}

function drawNoteMask(ctx, radius, position) {
   // central circ#le
   let offset = 360 / 24 * 17;
   let startCircle = ToRadians(offset + 360 / 12 * position)
   let endCircle =  ToRadians(offset + 360 / 12 * (position + 1))

   ctx.beginPath();
   ctx.arc(0, 0, radius * START_OF_CIRCLE_BORDER * 1.1 , startCircle, endCircle);
   ctx.lineTo(0, 0);
   ctx.fillStyle = COLOURS.CENTRAL_CIRCLE;
   ctx.fill();
}

function drawScaleMask(ctx, radius, positionArray) 
{
    for (let idx = 0; idx < 12; idx++)
    {
        if (positionArray.includes(idx))
            continue;

        drawNoteMask(ctx, radius, idx);
    }
}

function drawFace(ctx, radius) {
    // mask
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = COLOURS.FACE;
    ctx.fill();
    grad = ctx.createRadialGradient(
        0, 0, radius * START_OF_CIRCLE_BORDER, 0, 0, radius * 1.05);
    grad.addColorStop(0, COLOURS.CENTRAL_CIRCLE);
    grad.addColorStop(0.5, COLOURS.CENTRAL_CIRCLE);
    grad.addColorStop(1, COLOURS.CENTRAL_CIRCLE);
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    // central circ#le
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = COLOURS.CENTRAL_CIRCLE;
    ctx.fill();
}

function drawNotes(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    let notes = ["C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"];
    let noteDistance = 0.77; // percentage radius

    for (num = 0; num < 12; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * noteDistance);
        ctx.rotate(-ang);
        ctx.fillStyle = COLOURS.CENTRAL_CIRCLE;
        ctx.fillText(notes[num], 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * noteDistance);
        ctx.rotate(-ang);
    }
}

function drawSegments(ctx, radius) {
    ctx.fillStyle = COLOURS.CENTRAL_CIRCLE;
    let offset = 360 / 24;
    for (let idx = 0; idx < 12; idx++)
        drawHand(ctx, ToRadians(offset + 360 / 12 * idx), radius * START_OF_CIRCLE_BORDER, radius * 0.02)
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = COLOURS.CENTRAL_CIRCLE;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}