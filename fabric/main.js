var canvas = null ;
var rate = 5;
$(function(){
    canvas = new fabric.Canvas('c1');
    canvas.renderOnAddRemove=false

    //Draw block
    drawBlock();

    //Draw selection
    canvas.add(
        new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 })
    );

    canvas.renderAll();
});

function drawBlock() {
    var x = 0, y = 0;
    for(var bayIdx in data.bays){
        var bay = data.bays[bayIdx];
        if(bayIdx != '7' && bayIdx != '39'){
            y = 0;
            for(var i = 0; i< bay.cells.length; i++){
                var cell = bay.cells[i];
                var options = {top : y, left : x , width : zoom(cell.width), height : zoom(cell.length), selectable : false, hasControls :false};
                drawRectangle(options);
                y+= zoom(cell.length);
            }
            x+= zoom(bay.width);
        }
    }
}

function zoom(val){
    return val * rate;
}

function drawRectangle(options){
    var rect2 = new fabric.Rect({
        top : options.top,
        left :  options.left,
        width : options.width,
        height : options.height,
        stroke:'black',
        strokeWidth: 0.5,
        fill:'' ,
        selectable: options.selectable,
        hasControls : options.hasControls ,
        hasRotatingPoint : false
    });
    canvas.add(rect2);
}

function drawLine(){
    var line = new fabric.Line([50, 55, 300, 55], {
        stroke: 'red',
        strokeWidth: 1,
        hasControls: false,
        hasRotatingPoint: false
    });
    return line;
}