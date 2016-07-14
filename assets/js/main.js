var $DOUYardLayoutView = null;

$(function(){
    var target = $("#col2");
    if(target) {

        var width = target.width();
        var height = target.height();
        $("#col2").DOUYardLayoutView({
            width : width,
            height : height
        });

        $DOUYardLayoutView = $('#col2').data('DOUYardLayoutView');
        $DOUYardLayoutView.initBlock(data);
    }
});