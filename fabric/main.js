var canvas = null ;
var rate = 10;

$(function(){
    canvas = new fabric.Canvas('yard-canvas');
    canvas.renderOnAddRemove=false
    canvas.selection = false;

    canvas.on('object:moving', function (e) {
        var obj = e.target;
        obj.setCoords(); //Sets corner position coordinates based on current angle, width and height
        canvas.forEachObject(function (targ) {
            activeObject = canvas.getActiveObject();

            if (targ === activeObject) return;

            var rec1 = { top : activeObject.oCoords.tl.y, left : activeObject.oCoords.tl.x, right: activeObject.oCoords.tr.x , bottom : activeObject.oCoords.br.y };
            var rec2 = { top : targ.oCoords.tl.y, left : targ.oCoords.tl.x, right: targ.oCoords.tr.x , bottom : targ.oCoords.br.y };
            var isOverlap = intersectRect(rec1,rec2);
            if(isOverlap){
                targ.strokeWidth = 2;
                targ.stroke = 'red';
            }
            else{
                targ.strokeWidth = 0.5;
                targ.stroke = 'black';
            }
        });
    });




    //Draw block
    drawBlock();
    canvas.setWidth(500);
    canvas.setHeight(500);
    canvas.renderAll();
    canvas.isDrawingMode=false;
    //Declaring the variables
    var isMouseDown=false;
    var OriginX=new Array();
    var OriginY= new Array();
    var refRect;
    var canDraw = true;

    if( canDraw ) {
        //Setting the mouse events
        canvas.on('mouse:down',function(event){
            //Defining the procedure
            isMouseDown=true;
            OriginX=[];
            OriginY=[];

            //Getting the mouse Co-ordinates
            var posX=event.e.clientX;
            var posY=event.e.clientY;
            OriginX.push(posX);
            OriginY.push(posY);

            //Creating the rectangle object
            var rect = new fabric.Rect({
                left:OriginX[0],
                top:OriginY[0],
                width:0,
                height:0,
                stroke:'blue',
                strokeWidth:3,
                fill:''
            });
            canvas.add(rect);
            rect.lockRotation = true;
            refRect=rect;  //!**Reference of rectangle object

        });
    }

    canvas.on('mouse:move', function(event){
        if(canDraw) {
            var posX=event.e.clientX;
            var posY=event.e.clientY;
            refRect.setWidth(Math.abs((posX-refRect.get('left'))));
            refRect.setHeight(Math.abs((posY-refRect.get('top'))));
            refRect.setCoords();
            canvas.renderAll();
        }
    });

    canvas.on('mouse:up',function(){
        canDraw = false;
    });
});

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

function drawLine(){
    var line = new fabric.Line([50, 55, 300, 55], {
        stroke: 'red',
        strokeWidth: 1,
        hasControls: false,
        hasRotatingPoint: false
    });
    return line;
}

function intersectRect(r1, r2) {
    return !(r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top);
}