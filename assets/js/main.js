var canvas = null;
var rate = 50;
$(function () {
    canvas = new fabric.Canvas('c1');
    canvas.renderOnAddRemove = false;
    drawBlock();
    canvas.renderAll();

    ///////////////////////////////////////////////
    function drawBlock() {
        var x = 0, y = 0;
        for(var bayIdx in data.bays){
            var bay = data.bays[bayIdx];
           if(bayIdx != '7' && bayIdx != '39'){
                y = 0;
                for(var i = 0; i< bay.cells.length; i++){
                    var cell = bay.cells[i];
                    drawCell(x, y, zoom(cell.width), zoom(cell.length));
                    y+= zoom(cell.length);
                }
                x+= zoom(bay.width);
            }
        }
    }

    function zoom(val){
        return val * rate;
    }

    function drawCell(x, y, w, h){
        var rect = new fabric.Rect({
            left: x,
            top: y,
            width: w,
            height: h,
            fill:'',
            stroke:'red',
            strokeWidth:1
        });
        canvas.add(rect);
    }
});