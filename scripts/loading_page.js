class Loading{
    constructor(){
        this.$loading_page = document.querySelector('.js-loading_page')
        this.$logo = this.$loading_page.querySelector('.js-loading_page_logo')
        this.$separation_bar = this.$loading_page.querySelector('.js-loading_page_separation_bar')
        this.$texts = this.$loading_page.querySelectorAll('.js-loading_page_text span')
        this.init()
    }
    init(){        
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
            }, 3750
        )

        // separation bar scale reverse (1 to 0)
        setTimeout(
            ()=>{
                this.$separation_bar.classList.remove('active')
            }, 4250
        )

        // logo translate reverse (left to right)
        setTimeout(
            ()=>{
                this.$logo.classList.remove('active_02')
            }, 4750
        )

        // logo scale reverse (1 to 0)
        setTimeout(
            ()=>{
                this.$logo.classList.remove('active_01')
            }, 5250
        )

        setTimeout(
            ()=>{
                this.$loading_page.classList.add('active')
            }, 5500
        )
        setTimeout(
            ()=>{
                this.$loading_page.style.display = 'none'

            }, 6000
        )
    }
}

const loading = new Loading()