// Declaring Variables
let scroll_direction = '' // top, down, right, left
let scroll_power = 0
let transition_ready = true

// Fetch projects informations
let projects_info;
window
    .fetch('json/projects.json')
    .then(function(u){ return u.json(); })
    .then(function(json){ projects_info = json; })


// Scroll detection
$(function(){
    var loghandle = function(event, delta){
        var o = ''
        if (transition_ready){
            if (event.deltaY > 0){
                o += 'up';
                index_project_scroll.up()
            }
            else if (event.deltaY < 0){
                o += 'down';
                index_project_scroll.down()
            }
            if (event.deltaX > 0){
                o += 'right';
                index_project_scroll.down()
            }
            else if (event.deltaX < 0){
                o += 'left';
                index_project_scroll.up()
            }
            scroll_direction = o
            scroll_power = event.deltaFactor
            index_project_scroll.scrolling()
        }
    };
    $(document)
        .mousewheel(function(event, delta){
            loghandle(event, delta);
        });
});




// Scroll action
class IndexProjectScroll {
    constructor(){
        this.$projects_container = document.querySelector('.js-projects_container')
        this.$project_container = this.$projects_container.querySelector('.js-project_container')
        this.$transition_page = this.$projects_container.querySelector('.js-project_transition_page')


        this.$project_content = this.$project_container.querySelector('.js-project_content')
        this.$project_number = this.$project_content.querySelector('.js-project_number span') // change number
        this.$project_acronym = this.$project_content.querySelector('.js-project_acronym')
        this.$project_link = this.$project_content.querySelector('.js-project_view_button') // change href link value
        this.$project_background = this.$project_container.querySelector('.js-project_background') // change class to change background

        this.$project_scroll_text = document.querySelector('.js-project_scroll_text')
        this.scroll_direction = 'down'

        this.$project_progression_bar_container = document.querySelector('.js-project_progression_bar_container')
        this.$progression_bar_projects
        this.progression_bar_power = 0.01
        this.project_number = 0
        this.init()
        this.next_project()
        this.mobile_touch()
    }




    // Check if json information is loaded
    init(){
        setTimeout(()=>{
            // If json not loaded, retry
            if (projects_info == null){
                this.init()
                console.error("Json information not loaded, retry in 100ms..");
            }
            // If json loaded create letter
            else {
                // Create & set first project letters
                for (let i = 0; i < projects_info[0].acronym.length; i++){
                    const letter = document.createElement('span')
                    letter.innerHTML = projects_info[0].acronym[i]
                    this.$project_acronym.appendChild(letter)
                }
                // Set first project background
                this.$project_background.style.backgroundImage = `url('${projects_info[0].background_url}')`
                this.json_loaded = true
                this.progression_bar_create()
                this.progression_bar_update()
            }
        }, 100);
    }



    // If user scroll up
    up(){
        if (transition_ready){
            this.scroll_direction = 'up'
            if (this.project_number <= projects_info.length - 1 && this.project_number > 0){
                this.project_number -= 1
            }
            else {
                this.project_number = projects_info.length - 1
            }
        }
    }



    // If user scroll down
    down(){
        if (transition_ready){
            this.scroll_direction = 'down'
            if (this.project_number < projects_info.length - 1){
                this.project_number += 1
            }
            else {
                this.project_number = 0
            }
        }
    }

    // If user scroll
    scrolling(){
        // Change page info
        const change_page_project_info = ()=>{
            // Remove span from last project
            let $remove_this = this.$project_acronym.querySelectorAll('span')
            for (let i = 0; i < $remove_this.length; i++){
                this.$project_acronym.removeChild($remove_this[i])
            }

            // Create span acronym for project_number
            for (let i = 0; i < projects_info[this.project_number].acronym.length; i++){
                const letter = document.createElement('span')
                letter.innerHTML = projects_info[this.project_number].acronym[i]
                this.$project_acronym.appendChild(letter)
            }

            // Set first project background
            this.$project_background.style.backgroundImage = `url('${projects_info[this.project_number].background_url}')`

            // Set number of the project
            if (this.project_number < 10){
                this.$project_number.innerText = `0${this.project_number+1}`
            }
            else {
                this.$project_number.innerText = this.project_number + 1
            }

            // Set link of the project
            this.$project_link.setAttribute('href', projects_info[this.project_number].project_url)
        }
        
        // Transition page
        // If the transition is ready do the transition
        if (transition_ready){
            transition_ready = false
            if (this.scroll_direction == 'up') {
                this.$transition_page.classList.add('scroll_up')
            }
            else{
                this.$transition_page.classList.add('scroll_down')
            }
            setTimeout(()=>{
                change_page_project_info()
                this.progression_bar_update()
                setTimeout(()=>{
                    transition_ready = true
                    this.$transition_page.classList.remove('scroll_up')
                    this.$transition_page.classList.remove('scroll_down')
                }, 750)
            }, 750)
        }
    }

    next_project(){
        this.$project_scroll_text.addEventListener(
            'click',
            ()=>{
                this.down()
                this.scrolling()
            }
        )
    }

    // Scrolling create progression bar
    progression_bar_create(){
        // Create a div for each project
        for(const key in projects_info){
            let element = document.createElement('div')
            element.classList.add('project_progression_bar_element')
            element.classList.add('js-cursor_hover')
            element.style.width = `${100 / projects_info.length}vw`
            element.style.transform = `translateX(${(100 / projects_info.length)*key}vw)`
            this.$project_progression_bar_container.appendChild(element)
            element.addEventListener(
                'click',
                ()=>{
                    if(this.project_number != key && transition_ready == true){
                        this.project_number < key ? this.scroll_direction = 'down' : this.scroll_direction = 'up'
                        this.project_number = parseInt(key)
                        this.scrolling()
                    }
                }
            )
        }
    }

    // Scrolling update progression bar
    progression_bar_update(){
        const $progression_bar = document.querySelector('.js-project_progression_bar')
        $progression_bar.style.setProperty('--number_of_project', projects_info.length)
        $progression_bar.style.setProperty('--project_number', this.project_number+1)
    }


    // Mobile
    mobile_touch(){
        let touchstart_pos_x
        let touchstart_pos_y
        let touchmove_pos_x
        let touchmove_pos_y
          document.addEventListener(
            'touchstart',
            (_event)=>{
                touchstart_pos_x = _event.touches[0].clientX
                touchstart_pos_y = _event.touches[0].clientY
            }
        )
        document.addEventListener(
            'touchmove',
            (_event)=>{
                touchmove_pos_x = _event.touches[0].clientX
                touchmove_pos_y = _event.touches[0].clientY
                let diff_pos_x = touchstart_pos_x - touchmove_pos_x
                let diff_pos_y = touchstart_pos_y - touchmove_pos_y
                if (Math.abs(diff_pos_x) > Math.abs(diff_pos_y)){
                  // swipe right
                    if (diff_pos_x < 0){

                    }
                    // swipe left
                    else {

                    }
                }
                // swipe up
                else {
                    if (diff_pos_y > 0){
                        this.down()
                        this.scrolling()
                    }
                    // swipe down
                    else {
                        this.up()
                        this.scrolling()
                    }
                }

            }
        )
    }
}
const index_project_scroll = new IndexProjectScroll()