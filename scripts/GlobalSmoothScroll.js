let scroll_total_power = 0

// Scroll detection
$(function(){
    var loghandle = function(event, delta){
        var o = ''
        if (event.deltaY > 0){
            o += 'up';
            scroll_total_power < 0 ? scroll_total_power += -event.deltaFactor : scroll_total_power = -event.deltaFactor/10
        }
        else if (event.deltaY < 0){
            o += 'down';
            scroll_total_power > 0 ? scroll_total_power += event.deltaFactor : scroll_total_power = event.deltaFactor/10
        }
        if (event.deltaX > 0){
            o += 'right';
        }
        else if (event.deltaX < 0){
            o += 'left';
        }
        scroll_direction = o

        
        console.log(scroll_total_power);
    };
    $(document)
        .mousewheel(function(event, delta){
            loghandle(event, delta);
        });
});


// var limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
//     document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
// console.log(limit);



class GlobalSmoothScroll{
    constructor(){
        this.smooth_scroll()
    }
    smooth_scroll(){
        let previous_time = Date.now()
        let temp = scroll_total_power
        const animation_loop = ()=>{
            requestAnimationFrame(animation_loop)
            const time = Date.now()
            const delta = time - previous_time
            if (scroll_total_power > 10) {
                scroll_total_power -= (scroll_total_power - (scroll_total_power-1*parseInt(delta)))
            }
            else if(scroll_total_power < -10){
                scroll_total_power += (scroll_total_power - (scroll_total_power-1*parseInt(delta)))
            }

            // console.log((parseInt(delta)));
            
            // console.log(scroll_total_power);
            

            previous_time = time
            // console.log(delta);
            
            let scroll_pos = window.scrollY
            // if (scroll_total_power < 10 || scroll_total_power > 10) {
            //     scroll_pos -= temp - scroll_total_power
            // }
            
            // console.log(scroll_pos);
            
            // window.scrollTo(0, scroll_pos)
            window.scrollTo({
                top: scroll_pos,
                behavior: 'smooth'
              });
        }
        animation_loop()
    }
}
const global_smooth_scroll = new GlobalSmoothScroll()