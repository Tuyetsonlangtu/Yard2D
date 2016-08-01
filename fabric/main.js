var canvas = null;
var rate = 10;

$(function () {
    canvas = new fabric.Canvas('c1');
    canvas.renderOnAddRemove = false
    //Draw block
    drawBlock();
    initEvent();
    /////////////
    canvas.renderAll();
});

function initEvent() {
    canvas.on('mouse:down', function (options) {
        console.log(options);
        var target = canvas.findTarget(options.e);
        console.log(target);
        target.fill = 'red';
        target.active = true;
        drawLabel('R', target.left + target.width/4, target.top  + target.height /4);
    });
}

function drawBlock() {
    var x = 20, y = 20, bayName = 0;
    for (var bayIdx in data.bays) {
        var bay = data.bays[bayIdx];
        if (bayIdx != '7' && bayIdx != '39') {
            y = 20;
            for (var i = 0; i < bay.cells.length; i++) {
                var cell = bay.cells[i];
                var options = {
                    top: y,
                    left: x,
                    width: zoom(cell.width),
                    height: zoom(cell.length),
                    selectable: false,
                    hasControls: false,
                    idx: bayIdx + '-' + cell.rowId
                };
                drawRectangle(options);
                if (bayIdx == '1') {
                    drawRowName((i + 1).toString(), 0, y, zoom(cell.length), zoom(bay.width));
                }
                y += zoom(cell.length);
            }
            bayName += 1;
            drawBayName(bayName.toString(), x, 0, zoom(bay.width));
            x += zoom(bay.width);
        }
    }
}

function drawBayName(name, x, y, bayWidth) {
    if (name.split('').length == 1) {
        x += bayWidth / 2;
    } else {
        x += bayWidth / 4;
    }
    drawLabel(name, x, y);
}

function drawRowName(name, x, y, cellLen, bayWidth) {
    y += cellLen / 3;
    if (name.split('').length == 1) {
        x += bayWidth / 4;
    }
    drawLabel(name, x, y);
}

function zoom(val) {
    return val * rate;
}

function drawLabel(name, x, y) {
    var text = new fabric.Text(name, {
        left: x, top: y, fontSize: 15, fontWeight: 'bold',
        selectable: false, hasControls: false, hasRotatingPoint: false
    });
    canvas.add(text);
}
function drawRectangle(options) {
    var rect2 = new fabric.Rect({
        top: options.top,
        left: options.left,
        width: options.width,
        height: options.height,
        stroke: 'black',
        strokeWidth: 0.5,
        fill: '',
        hoverCursor: 'mouse',
        selectable: false,
        hasControls: options.hasControls,
        hasRotatingPoint: false,
        idx: options.idx,
        cursor: 'pointer'
    });
    canvas.add(rect2);
}