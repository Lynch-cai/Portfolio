// Declaring Variables
let scroll_direction = '' // top, down, right, left
let scroll_power = ''
let project_number = 0
// let projects_info = []

// // Fetch projects informations
// window
//     .fetch('json/projects.json')
//     .then(_response => _response.json())
//     .then(_info => projects_info.push(_info));


let test
window
    .fetch('json/projects.json')
    .then(_response => _response.json())
    .then(_info => (_info)=>{
        test = JSON.parse(_info)
    });



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



// projects_info = projects_info[0]
// console.log(projects_info);

// Scroll action
class Scroll{
    constructor(){
        this.$projects_container = document.querySelector('.js-projects_container')
        this.$project_container = this.$projects_container.querySelector('.js-project_container')
        this.$transition_page = this.$projects_container.querySelector('.js-project_transition_page')


        this.$project_content = this.$project_container.querySelector('.js-project_content')
        this.$project_number = this.$project_content.querySelector('.js-project_number') // change number
        this.$project_acronym = this.$project_content.querySelector('.js-project_acronym')
        this.$project_link = this.$project_content.querySelector('.js-project_view_link') // change href link value
        this.$project_background = this.$project_content.querySelector('.js-project_background') // change class to change background
        this.scrolling()
    }
    up(){
        if (project_number <= this.$project_container.length - 1 && project_number > 0) {
            project_number -= 1
        }
        else{
            project_number = this.$project_container.length - 1
        }
    }
    down(){
        if (project_number < this.$project_container.length - 1) {
            project_number += 1
        }
        else{
            project_number = 0
        }
    }
    scrolling(){


        // document.createElement('span')
        // this.$project_acronym.
        console.log(project_number);
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



