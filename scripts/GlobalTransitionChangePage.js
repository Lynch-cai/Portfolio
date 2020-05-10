export default class GlobalTransitionChangePage{
    constructor(change_page_button, page_link){
        this.$transition_page = document.querySelector('.js-global_transition_page')
        this.$change_page_button = document.querySelector(`.${change_page_button}`)
        this.page_link = page_link
        this.change_page()
    }
    change_page(){
        this.$change_page_button.addEventListener(
            'click',
            ()=>{
                this.$transition_page.classList.add('scroll_down')
                setTimeout(
                    ()=>{
                        window.location.href = this.page_link
                    }, 700
                )
            }
        )
    }
}