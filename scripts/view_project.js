class View_project{
    constructor(){
        this.view_project = document.querySelector('.js-project_view_button')
        this.project_background = document.querySelector('.js-project_background')
        this.init()
    }
    init(){
        this.view_project.addEventListener(
            'mouseover',
            ()=>{
                this.project_background.classList.add('active')
            }
        )
        this.view_project.addEventListener(
            'mouseout',
            ()=>{
                this.project_background.classList.remove('active')
            }
        )
    }
}
const view_project = new View_project()