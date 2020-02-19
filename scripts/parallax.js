class Parallax{
    constructor(){
        this.sizes = {}
        this.sizes.width = window.innerWidth
        this.sizes.height = window.innerHeight
        this.resize()
        
        this.$project_background = document.querySelector('.js-project_background')
        this.$global_cursor = document.querySelector('.js-global_cursor')
        this.parallax()
    }
    resize(){
        window.addEventListener(
            'resize',
            () => {
                this.sizes.width = window.innerWidth
                this.sizes.height = window.innerHeight
                
            }
        )
    }
    parallax(){
        this.$global_cursor.addEventListener(
            'mousemove',
            (_event)=>{
                const ratioX = _event.clientX / this.sizes.width - 0.5 // give value between -0.5 & 0.5
                const ratioY = _event.clientY / this.sizes.height - 0.5
                const translateX = ratioX * -10
                const translateY = ratioY * -10
                this.$project_background.style.transform = `translate(${translateX}%, ${translateY}%) scale(1.1)`
            }
        )
    }
}
const parallax = new Parallax()


