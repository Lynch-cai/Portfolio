// Declaring Variables
let scroll_direction = '' // top, down, right, left
let scroll_power = ''
let project_number = 0
let project_pos = 0


// Scroll detection
$(function() {
    var loghandle = function(event, delta) {
        var o = ''
        if (event.deltaY > 0){
            o += 'up';
            scroll.up()
        }
        else if (event.deltaY < 0){
            o += 'down';
            scroll.down()
        }
        if (event.deltaX > 0){
            o += 'right';
        }
        else if (event.deltaX < 0){
            o += 'left';
        }
        scroll_direction = o
        scroll_power = event.deltaFactor
        scroll.scrolling()
    };
    $(document)
        .mousewheel(function(event, delta) {
            loghandle(event, delta);
        });
});


// Scroll action
class Scroll{
    constructor(){
        this.$projects_container = document.querySelector('.js-projects_container')
        this.$project_container = document.querySelectorAll('.js-project_container')
        this.$transition_page = this.$projects_container.querySelector('.js-project_transition_page')
    }
    up(){
        if (project_number <= this.$project_container.length - 1 && project_number > 0) {
            project_number -= 1
            project_pos -= sizes.height
        }
        else{
            project_number = this.$project_container.length - 1
            project_pos = sizes.height * (this.$project_container.length - 1)
        }
    }
    down(){
        if (project_number < this.$project_container.length - 1) {
            project_number += 1
            project_pos += sizes.height
        }
        else{
            project_number = 0
            project_pos = 0
        }
    }
    scrolling(){
        console.log(project_number);
        console.log(project_pos);
        this.$project_container[0].style.transform = `translate3d(0, ${project_pos}px, 0)`
    }
    // left(){
    //     if (project_number < this.$project_container.length - 1) {
    //         project_number += 1
    //         project_pos += sizes.height
    //     }
    //     else{
    //         project_number = 0
    //         project_pos = 0
    //     }
    // }
    // right(){
    //     if (project_number < this.$project_container.length - 1) {
    //         project_number += 1
    //         project_pos += sizes.height
    //     }
    //     else{
    //         project_number = 0
    //         project_pos = 0
    //     }
    // }
}
const scroll = new Scroll()