(function($) {

    $.DOUYardLayoutView = function(element, options) {

        var defaults = {
            width: window.innerWidth / 2,
            height: window.innerHeight / 2
        }

        var _properties = {};
        var _renderer = null;
        var _stage = null;
        var _graphics = null;

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
            _renderer = PIXI.autoDetectRenderer( _properties.width, _properties.height, { antialias: true });
            _stage = new PIXI.Container();
            _graphics = new PIXI.Graphics();
            $element.append(_renderer.view);
        }

        this.drawShape = function() {
            _graphics.beginFill(0xFF3300);
            _graphics.lineStyle(4, 0xffd900, 1);

            _graphics.moveTo(50,50);
            _graphics.lineTo(250, 50);
            _graphics.lineTo(100, 100);
            _graphics.lineTo(50, 50);
            _graphics.endFill();

            _graphics.lineStyle(2, 0x0000FF, 1);
            _graphics.beginFill(0xFF700B, 1);
            _graphics.drawRect(50, 250, 120, 120);

            _graphics.lineStyle(2, 0xFF00FF, 1);
            _graphics.beginFill(0xFF00BB, 0.25);
            _graphics.drawRoundedRect(150, 450, 300, 100, 15);
            _graphics.endFill();

            _graphics.lineStyle(0);
            _graphics.beginFill(0xFFFF0B, 0.5);
            _graphics.drawCircle(470, 90,60);
            _graphics.endFill();

            _stage.addChild(_graphics);
            animate();
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
