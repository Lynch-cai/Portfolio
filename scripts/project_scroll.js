// Declaring Variables
let scroll_direction = '' // top, down, right, left
let scroll_power = ''
let project_number = 0


// Fetch projects informations
let projects_info;
window
    .fetch('json/projects.json')
    .then(function(u){ return u.json();})
    .then(function(json){projects_info = json;})


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
        this.$project_container = this.$projects_container.querySelector('.js-project_container')
        this.$transition_page = this.$projects_container.querySelector('.js-project_transition_page')


        this.$project_content = this.$project_container.querySelector('.js-project_content')
        this.$project_number = this.$project_content.querySelector('.js-project_number') // change number
        this.$project_acronym = this.$project_content.querySelector('.js-project_acronym')
        this.$project_link = this.$project_content.querySelector('.js-project_view_link') // change href link value
        this.$project_background = this.$project_container.querySelector('.js-project_background') // change class to change background

        this.init()
        this.scrolling()
    }
    // Check if json information is loaded
    init(){
        setTimeout(() => {
            // If json not loaded, retry
            if(projects_info == null){
                this.init()
                console.error("Json information not loaded, retry in 100ms..");
            }
            // If json loaded create letter
            else{
                // Create & set first project letters
                for (let i = 0; i < projects_info[0].acronym.length; i++) {
                    const letter = document.createElement('span')
                    letter.innerHTML = projects_info[0].acronym[i]
                    this.$project_acronym.appendChild(letter)
                }
                // Set first project background
                this.$project_background.style.backgroundImage = `url('${projects_info[0].background_url}')`
            }
        }, 100);
    }
    // If user scroll up
    up(){
        if (project_number <= projects_info.length - 1 && project_number > 0) {
            project_number -= 1
        }
        else{
            project_number = projects_info.length - 1
        }
    }
    // If user scroll down
    down(){
        if (project_number < projects_info.length - 1) {
            project_number += 1
        }
        else{
            project_number = 0
        }
    }
    // If user scroll
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



