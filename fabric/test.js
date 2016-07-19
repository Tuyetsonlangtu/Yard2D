
window.onload=function(){
    window.canvas = new fabric.Canvas('fabriccanvas');
    window.counter = 0;
    window.renderOnAddRemove = false;
    window.canvas.selection = false;

    var newleft = 0;
    var edgedetection = 0; //pixels to snap
    var rate = 5;

    drawBlock();

    var options = {top : 100, left : 100 , width : 100, height : 100, selectable : true, hasControls :true , strokeWidth : 1, strokeColor : "red" , fillColor : "#ffe6e6" , opacity : 0.7};
    drawRectangle(options);

    this.canvas.on('object:moving', function (e) {
        var obj = e.target;
        obj.setCoords(); //Sets corner position coordinates based on current angle, width and height
        canvas.forEachObject(function (targ) {
            activeObject = canvas.getActiveObject();

            if (targ === activeObject) return;

            if (Math.abs(activeObject.oCoords.tr.x - targ.oCoords.tl.x) < edgedetection) {
                activeObject.left = targ.left - activeObject.currentWidth;
            }
            if (Math.abs(activeObject.oCoords.tl.x - targ.oCoords.tr.x) < edgedetection) {
                activeObject.left = targ.left + targ.currentWidth;
            }
            if (Math.abs(activeObject.oCoords.br.y - targ.oCoords.tr.y) < edgedetection) {
                activeObject.top = targ.top - activeObject.currentHeight;
            }
            if (Math.abs(targ.oCoords.br.y - activeObject.oCoords.tr.y) < edgedetection) {
                activeObject.top = targ.top + targ.currentHeight;
            }
            if (activeObject.intersectsWithObject(targ) && targ.intersectsWithObject(activeObject)) {
                targ.stroke = 'blue';
                targ.strokeWidth = 1;
            } else {
                targ.stroke = 'black';
                targ.strokeWidth = 0.5;
            }
            if (!activeObject.intersectsWithObject(targ)) {
                activeObject.strokeWidth = 0;
                activeObject.stroke = false;
            }
        });
    });

    function drawRectangle(options){
        var rect2 = new fabric.Rect({
            top : options.top,
            left :  options.left,
            width : options.width,
            height : options.height,
            stroke: options.strokeColor,
            strokeWidth: options.strokeWidth,
            fill:options.fillColor ,
            selectable: options.selectable,
            hasControls : options.hasControls ,
            hasRotatingPoint : false,
            opacity : options.opacity,
            originX: 'left',
            originY: 'top',
        });
        canvas.add(rect2);
    }

    function drawBlock() {
        var x = 0, y = 0;
        for(var bayIdx in data.bays){
            var bay = data.bays[bayIdx];
            if(bayIdx != '7' && bayIdx != '39'){
                y = 0;
                for(var i = 0; i< bay.cells.length; i++){
                    var cell = bay.cells[i];
                    var options = {top : y, left : x , width : zoom(cell.width), height : zoom(cell.length), selectable : false, hasControls :false , strokeWidth : 0.5, strokeColor : "black" , fillColor : "", opacity : 1};
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
}

