class Loading{
    constructor(){
        this.$loading_page = document.querySelector('.js-loading_page')
        this.$logo = this.$loading_page.querySelector('.js-loading_page_logo')
        this.$separation_bar = this.$loading_page.querySelector('.js-loading_page_separation_bar')
        this.$texts = this.$loading_page.querySelectorAll('.js-loading_page_text span')
        this.init()
    }
    init(){
        // PREVENT against loading every time user reload the page or navigate on the page
        if(sessionStorage.getItem('stop_loading_page') !== null){
            this.$loading_page.style.display = 'none'
        }
        else{
            sessionStorage.setItem('stop_loading_page', '1');
            // logo scale (0 to 1)
            setTimeout(
                ()=>{
                    this.$logo.classList.add('active_01')
                }, 250
            )

            // logo translate (right to left)
            setTimeout(
                ()=>{
                    this.$logo.classList.add('active_02')
                }, 750
            )

            // separation bar scale (0 to 1)
            setTimeout(
                ()=>{
                    this.$separation_bar.classList.add('active')
                }, 1250
            )

            // text translate (left to right)
            setTimeout(
                ()=>{
                    this.$texts.forEach((_element, key)=>{
                        this.$texts[0].classList.add('active')
                        setTimeout(
                            ()=>{
                                this.$texts[1].classList.add('active')
                            }, 150
                        )
                    })
                }, 1750
            )

            // text translate reverse (right to left)
            setTimeout(
                ()=>{
                    this.$texts.forEach((_element, key)=>{
                        this.$texts[1].classList.remove('active')
                        setTimeout(
                            ()=>{
                                this.$texts[0].classList.remove('active')
                            }, 150
                        )
                    })
                }, 3250
            )

            // separation bar scale reverse (1 to 0)
            setTimeout(
                ()=>{
                    this.$separation_bar.classList.remove('active')
                }, 3750
            )

            // logo translate reverse (left to right)
            setTimeout(
                ()=>{
                    this.$logo.classList.remove('active_02')
                }, 4250
            )

            // logo scale reverse (1 to 0)
            setTimeout(
                ()=>{
                    this.$logo.classList.remove('active_01')
                }, 4750
            )

            // loading page opacity (1 to 0)
            setTimeout(
                ()=>{
                    this.$loading_page.classList.add('active')
                }, 5000
            )
            // loading page display (flex to none)
            setTimeout(
                ()=>{
                    this.$loading_page.style.display = 'none'

                }, 5500
            )
        }
    }
}

const loading = new Loading()