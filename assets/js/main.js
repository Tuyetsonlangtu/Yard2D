var $DOUYardLayoutView = null;

$(function(){
    $("#col2").DOUYardLayoutView({
        width : 800,
        height : 600
    });

    $DOUYardLayoutView = $('#col2').data('DOUYardLayoutView');
    $DOUYardLayoutView.drawShape()

});