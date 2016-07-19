(function($) {

    $.DOUYardLayoutView = function(element, options) {

        var defaults = {
            canvas : "canvas",
            width: window.innerWidth / 2,
            height: window.innerHeight / 2
        }

        var _properties = {};
        var _renderer = null;
        var _stage = null;
        var _graphics = null;
        var rate = 5;

        this.properties = function (){
            return  {
                properties : _properties,
                renderer : _renderer,
                stage : _stage,
                graphics : _graphics
            }
        }

        $element = $(element), element = element;
        this.init = function() {
            _properties = $.extend({}, defaults, options);
            _renderer = PIXI.autoDetectRenderer( _properties.width, _properties.height, { antialias: true, backgroundColor : 0xFFFFFF});
            _stage = new PIXI.Container();
            _graphics = new PIXI.Graphics();
            $element.append(_renderer.view);
        }

        this.initBlock = function(blocks) {

           /* if(blocks && blocks.length >0){
                for(var i=0; i<blocks.length; i++){
                   if(blocks[i].blckIdxNo == 0){
                       var bays = blocks[i].bays;
                       for(var j=0; j <bays.length; j++){
                           var left =  bays[j].x * rate;
                           var top = rate;
                           var width = bays[j].width * rate;
                           var height = bays[j].height * rate;
                           var rec_options = { line_width : 1, line_color : "0x0000FF" , fill_color : "0xFF700B", top : top, left : left, width : width, height : height }
                           drawRectangle(rec_options);
                       }
                   }
                }
            }*/

            var bays = blocks.bays;
            for (var key in bays){
                if (bays.hasOwnProperty(key)) {
                    var obj = bays[key];
                    if(obj){
                        var cells = obj.cells;
                        if(cells){

                            for (var key1 in cells){
                                if (cells.hasOwnProperty(key1)) {
                                    var left =  cells[key1].xStart * rate;
                                    var top = cells[key1].yStart * rate;
                                    var width = cells[key1].width * rate;
                                    var height = cells[key1].length * rate;
                                    var rec_options = { line_width : 2, line_color : "0x000000" , fill_color : "0xFFFFFF", top : top, left : left, width : width, height : height }
                                    drawRectangle(rec_options);
                                }
                            }
                        }
                    }
                }
            }
            _stage.addChild(_graphics);
            animate();
        }

        var drawRectangle = function( options ){

            _graphics.lineStyle(options.line_width, options.line_color, 1);
            _graphics.beginFill(options.fill_color, 1);
            _graphics.drawRect(options.left, options.top, options.width, options.height);
            _graphics.endFill();

        }

        var animate = function(){
            _renderer.render( _stage );
            requestAnimationFrame( animate );
        }

        this.init();
    }

    // add the plugin to the jQuery.fn object
    $.fn.DOUYardLayoutView = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('DOUYardLayoutView')) {
                var plugin = new $.DOUYardLayoutView(this, options);
                $(this).data('DOUYardLayoutView', plugin);
            }
        });
    }
})(jQuery);
