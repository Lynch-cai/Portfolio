let transition_ready = false
class GlobalLandingPageTransition{
    constructor(){
        this.$transition_page = document.querySelector('.js-global_transition_page')
        this.$main = document.querySelector('main')
        this.$header = document.querySelector('.global_header')
        this.$cursor = document.querySelector('.global_cursor')
        this.init()
    }
    init(){
        let stateCheck = setInterval(() => {
            if (document.readyState === 'complete') {
                clearInterval(stateCheck);
                // document ready
                this.$transition_page.classList.add('scroll_down_half')
                setTimeout(
                    ()=>{
                        this.$transition_page.style.bottom = '-100vh'
                        this.$transition_page.classList.remove('scroll_down_half')
                        transition_ready = true
                    }, 750
                )
            }
          }, 100);

    }
}
const global_landing_page_transition = new GlobalLandingPageTransition()