/**
 * Created by hien.tran on 7/18/2016.
 */
$(function(){

    var target = $("#col2");
    if(target) {

        var width = target.width();
        var height = target.height();
        $("#col2").DOUYardLayoutView({
            canvas : "yard-canvas",
            rate : 10,
            width : width,
            height : height
        });

        $DOUYardLayoutView = $('#col2').data('DOUYardLayoutView');
        $DOUYardLayoutView.drawBlock(data);
    }
});