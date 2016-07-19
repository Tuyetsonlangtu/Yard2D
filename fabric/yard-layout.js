(function($) {
    $.DOUYardLayoutView = function(element, options) {

        var defaults = {
            canvas : "yard-canvas",
            rate : 5,
            width: window.innerWidth / 2,
            height: window.innerHeight / 2
        }

        var _properties = {};
        var _canvas = null;
        var _rate = 5;
        var selectedObjs = [];
        var intersectObjs = [];

        this.properties = function (){
            return  {
                properties : _properties,
                canvas : _canvas,
                rate : _rate
            }
        }

        //Public function
        $element = $(element);
        this.init = function() {
            $element.append("<canvas id='yard-canvas' width='100' height='100'></canvas>");
            _properties = $.extend({}, defaults, options);
            _canvas = new fabric.Canvas(_properties.canvas);
            _canvas.renderOnAddRemove=false
            _canvas.selection = false;

            _canvas.setWidth(_properties.width);
            _canvas.setHeight(_properties.height);
            _canvas.renderAll();
        }

        this.drawBlock = function(data) {
            var x = 0, y = 0;
            for(var bayIdx in data.bays){
                var bay = data.bays[bayIdx];
                if(bayIdx != '7' && bayIdx != '39'){
                    y = 0;
                    for(var i = 0; i< bay.cells.length; i++){
                        var cell = bay.cells[i];
                        var options = {top : y, left : x , width : zoom(cell.width), height : zoom(cell.length), selectable : false, hasControls :false , strokeWidth : 0.5, strokeColor : "black" , fillColor : "", opacity : 1};
                        this.drawRectangle(options);
                        y+= zoom(cell.length);
                    }
                    x+= zoom(bay.width);
                }
            }

            _canvas.renderAll();
        }

        this.drawRectangle = function(options){
            var rect = new fabric.Rect({
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
                originY: 'top'
            });
            rect.myCustomOptionKeepStrokeWidth = options.strokeWidth;
            _canvas.add(rect);
        }


        //Private function
        var intersectRect = function(r1, r2) {
            return !(r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
        }
        var zoom = function(val){
            return val * _properties.rate;
        }

        var drawSelectionBox = function(mouse_event){

            selectedObjs = [];
            intersectObjs = [];

            var obj = mouse_event.target;
            obj.setCoords();
            if(obj.data_type && obj.data_type == "selection"){

                var dataCorner = {top_left :  null, top_right : null, bottom_left : null, bottom_right : null };
                activeObject = _canvas.getActiveObject();
                var strokeWidth = activeObject.myCustomOptionKeepStrokeWidth;
                _canvas.forEachObject(function (targ) {
                    if (targ === activeObject) return;

                    var rec1 = { top : activeObject.oCoords.tl.y + strokeWidth, left : activeObject.oCoords.tl.x + strokeWidth, right: activeObject.oCoords.tr.x - strokeWidth , bottom : activeObject.oCoords.br.y - strokeWidth };
                    var rec2 = { top : targ.oCoords.tl.y, left : targ.oCoords.tl.x, right: targ.oCoords.tr.x , bottom : targ.oCoords.br.y };

                    if(getCornerPosition( {left : rec1.left, top : rec1.top} , rec2))
                        dataCorner.top_left = getCornerPosition( {left : rec1.left, top : rec1.top} , rec2);

                    if(getCornerPosition( {left : rec1.right, top : rec1.top} , rec2))
                        dataCorner.top_right = getCornerPosition( {left : rec1.right, top : rec1.top} , rec2);

                    if(getCornerPosition( {left : rec1.left, top : rec1.bottom} , rec2))
                        dataCorner.bottom_left = getCornerPosition( {left : rec1.left, top : rec1.bottom} , rec2);

                    if(getCornerPosition( {left : rec1.right, top : rec1.bottom} , rec2))
                        dataCorner.bottom_right = getCornerPosition( {left : rec1.right, top : rec1.bottom} , rec2);

                    var isOverlap = intersectRect(rec1,rec2);
                    if(isOverlap){
                        targ.strokeWidth = 1;
                        targ.stroke = 'red';
                        selectedObjs.push(targ);
                    }
                    else{
                        targ.strokeWidth = 0.5;
                        targ.stroke = 'black';
                    }

                    if (activeObject.intersectsWithObject(targ) && targ.intersectsWithObject(activeObject)) {
                        intersectObjs.push(targ);
                    }
                });

                intersectObjs = dataCorner;
            }
        }
        
        var getCornerPosition = function ( point , rect ) {
            if( point.left >= rect.left && point.left <= rect.right && point.top >= rect.top && point.top <= rect.bottom)
                return rect;
            return null;
        }

        var resizeSelection = function (object, position) {
            if(object && position && position.top_left && position.top_right && position.bottom_left && position.bottom_right){
                var width = position.top_right.right - position.top_left.left;
                var height = position.bottom_left.bottom - position.top_left.top;
                object.width = width;
                object.height = height;
                object.top = position.top_left.top;
                object.left = position.top_left.left;
            }
            _canvas.renderAll();
        }




        //Init when onload page
        this.init();

        //Mouse event
        _canvas.isDrawingMode=false;
        var isMouseDown=false;
        var OriginX = new Array();
        var OriginY = new Array();
        var refRect;
        var canDraw = true;
        _canvas.on('mouse:down',function(event){
            if(!canDraw)
                return ;

            //Defining the procedure
            isMouseDown=true;
            OriginX=[];
            OriginY=[];

            //Getting the mouse Co-ordinates
            var pointer = _canvas.getPointer(event.e);
            var posX = pointer.x;
            var posY = pointer.y;

            OriginX.push(posX);
            OriginY.push(posY);

            //Creating the rectangle object
            var rect = new fabric.Rect({
                left:OriginX[0],
                top:OriginY[0],
                width:0,
                height:0,
                stroke:'blue',
                strokeWidth: 2,
                fill:'',
                data_type : "selection",
                hasRotatingPoint : false
            })
            rect.myCustomOptionKeepStrokeWidth = 2;
            rect.on({
                'scaling': function(e) {
                    var obj = this, w = obj.width * obj.scaleX, h = obj.height * obj.scaleY, s = obj.strokeWidth;
                    obj.set({
                        'height'     : h,
                        'width'      : w,
                        'scaleX'     : 1,
                        'scaleY'     : 1
                    });
                }
            });

            _canvas.add(rect);
            refRect=rect;
        });

        _canvas.on('mouse:move', function(event){
            if(canDraw && refRect) {
                var pointer = _canvas.getPointer(event.e);
                var posX = pointer.x;
                var posY = pointer.y;

                refRect.setWidth(Math.abs((posX-refRect.get('left'))));
                refRect.setHeight(Math.abs((posY-refRect.get('top'))));
                refRect.setCoords();
                _canvas.renderAll();
            }
        });

        _canvas.on('mouse:up',function(e){
            _canvas.setActiveObject(refRect);
            drawSelectionBox(e);
            resizeSelection(_canvas.getActiveObject(), intersectObjs);

            canDraw = false;
        });

        //Object event
        _canvas.on('object:moving', function (e) {
            e.target.set({
                left: Math.round(e.target.left / (_properties.rate * 2.35)) * (_properties.rate * 2.35),
                top: Math.round(e.target.top / ( _properties.rate * 4 ) ) * (_properties.rate * 4)
            });

            drawSelectionBox(e);
        });

        _canvas.on('object:scaling', function (e) {
            drawSelectionBox(e);
        });


    }

    $.fn.DOUYardLayoutView = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('DOUYardLayoutView')) {
                var plugin = new $.DOUYardLayoutView(this, options);
                $(this).data('DOUYardLayoutView', plugin);
            }
        });
    }

})(jQuery);
