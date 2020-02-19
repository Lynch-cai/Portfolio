let scroll_direction = '' // top, down, right, left
let scroll_power = ''
$(function() {
    var loghandle = function(event, delta) {
        var o = ''
        if (event.deltaY > 0)
            o += 'top';
        else if (event.deltaY < 0)
            o += 'down';

        if (event.deltaX > 0)
            o += 'right';
        else if (event.deltaX < 0)
            o += 'left';
        scroll_direction = o
        scroll_power = event.deltaFactor
        console.log(scroll_direction);
        console.log(scroll_power);
    };
    $(document)
        .mousewheel(function(event, delta) {
            loghandle(event, delta);
        });
});
