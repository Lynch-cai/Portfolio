// Declaring Variables
let scroll_direction = '' // top, down, right, left
let scroll_power = ''
let project_number = 0
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
                scroll.up()
            }
            else if (event.deltaY < 0){
                o += 'down';
                scroll.down()
            }
            if (event.deltaX > 0){
                o += 'right';
                scroll.down()
            }
            else if (event.deltaX < 0){
                o += 'left';
                scroll.up()
            }
            scroll_direction = o
            scroll_power = event.deltaFactor
            scroll.scrolling()
        }
    };
    $(document)
        .mousewheel(function(event, delta){
            loghandle(event, delta);
        });
});




// Scroll action
class Scroll {
    constructor(){
        this.$projects_container = document.querySelector('.js-projects_container')
        this.$project_container = this.$projects_container.querySelector('.js-project_container')
        this.$transition_page = this.$projects_container.querySelectorAll('.js-project_transition_page')


        this.$project_content = this.$project_container.querySelector('.js-project_content')
        this.$project_number = this.$project_content.querySelector('.js-project_number span') // change number
        this.$project_acronym = this.$project_content.querySelector('.js-project_acronym')
        this.$project_link = this.$project_content.querySelector('.js-project_view_button') // change href link value
        this.$project_background = this.$project_container.querySelector('.js-project_background') // change class to change background

        this.$project_scroll_text = document.querySelector('.js-project_scroll_text')

        this.$project_progression_bar_container = document.querySelector('.js-project_progression_bar_container')
        this.$progression_bar_projects
        this.progression_bar_power = 0.1
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
            if (project_number <= projects_info.length - 1 && project_number > 0){
                project_number -= 1
            }
            else {
                project_number = projects_info.length - 1
            }
        }
    }



    // If user scroll down
    down(){
        if (transition_ready){
            if (project_number < projects_info.length - 1){
                project_number += 1
            }
            else {
                project_number = 0
            }
        }
    }




    // If user scroll
    scrolling(){
        // Transition page
        // If the transition is ready do the transition
        if (transition_ready){
            transition_ready = false

            // Do the transition
            this.$transition_page[0].classList.add('active')
            setTimeout(
                ()=>{
                    this.$transition_page[1].classList.add('active')
                }, 150
            )
            setTimeout(
                ()=>{
                    this.$transition_page[2].classList.add('active')
                }, 300
            )

            // Reset transition
            setTimeout(
                ()=>{
                    change_page_project_info()

                    // Display none transition pages (0,1) & fade out (2)
                    this.$transition_page[0].style.display = 'none'
                    this.$transition_page[1].style.display = 'none'
                    this.$transition_page[2].classList.add('fade_out')


                    // Display none transition pages (2)
                    setTimeout(
                        ()=>{
                            this.$transition_page[2].style.display = 'none'
                            setTimeout(
                                ()=>{
                                    // reset fade out (2)
                                    this.$transition_page[2].classList.remove('fade_out')
                                }, 250
                            )
                        }, 300 // opacity transition time
                    )

                    // Reset pos of transition pages (both)
                    setTimeout(
                        ()=>{
                            for (let i = 0; i < this.$transition_page.length; i++){
                                this.$transition_page[i].classList.remove('active')
                            }

                            // Display block transition pages (both)
                            setTimeout(
                                ()=>{
                                    for (let i = 0; i < this.$transition_page.length; i++){
                                        this.$transition_page[i].style.display = 'block'
                                    }

                                  // Set transition ready to true
                                  setTimeout(
                                      ()=>{
                                          transition_ready = true
                                      }, 500
                                  )

                                }, 250
                            )
                        }, 100
                    )
                }, 1000
            )
        }

        // Change page info
        const change_page_project_info = ()=>{
            // Remove span from last project
            let $remove_this = this.$project_acronym.querySelectorAll('span')
            for (let i = 0; i < $remove_this.length; i++){
                this.$project_acronym.removeChild($remove_this[i])
            }

            // Create span acronym for project_number
            for (let i = 0; i < projects_info[project_number].acronym.length; i++){
                const letter = document.createElement('span')
                letter.innerHTML = projects_info[project_number].acronym[i]
                this.$project_acronym.appendChild(letter)
            }

            // Set first project background
            this.$project_background.style.backgroundImage = `url('${projects_info[project_number].background_url}')`

            // Set number of the project
            if (project_number < 10){
                this.$project_number.innerText = `0${project_number+1}`
            }
            else {
                this.$project_number.innerText = project_number + 1
            }

            // Set link of the project
            this.$project_link.setAttribute('href', projects_info[project_number].project_url)
        }
        this.progression_bar_update()
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
            element.classList.add('project_progression_bar_active')
            element.style.width = `${100 / projects_info.length}vw`
            element.style.transform = `translateX(${-(100 / projects_info.length)}vw)`
            this.$project_progression_bar_container.appendChild(element)
        }
    }

    // Scrolling update progression bar
    progression_bar_update(){
        this.$progression_bar_projects = this.$project_progression_bar_container.querySelectorAll('div')
        for(const key in projects_info){
            if (key <= project_number) {
                this.$progression_bar_projects[key].classList.add('active')
                this.$progression_bar_projects[key].style.transform = `translateX(${this.progression_bar_power})`
            }
            if (key > project_number){
                this.$progression_bar_projects[key].classList.remove('active')
            }
        }
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
const scroll = new Scroll()