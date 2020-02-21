class Parallax{
    constructor(){
        this.ratioX = ''
        this.ratioY = ''
        this.translateX = ''
        this.translateY = ''
        this.parallax_power = '-10'
        this.scale_min = 1.15
        this.scale = this.scale_min
        this.scale_max = 1.45
        this.scale_power = 0.05

        this.$project_background = document.querySelector('.js-project_background')
        this.parallax()

        this.$view_project = document.querySelector('.js-project_view_button')
        this.view_project()
    }

    // GET user cursor position & calculate the parallax movement
    parallax(){
        document.addEventListener(
            'mousemove',
            (_event)=>{
                this.ratioX = _event.clientX / sizes.width - 0.5 // give value between -0.5 & 0.5
                this.ratioY = _event.clientY / sizes.height - 0.5
                this.translateX = this.ratioX * this.parallax_power
                this.translateY = this.ratioY * this.parallax_power
            }
        )
    }

    // APPLY the parallax even if user hover "view project"
    view_project(){

        // DECLARE previewTime (usefull to get the time between each frame) & view_project_active (usefull to change scale)
        let previousTime = Date.now()
        let view_project_active = false

        // FUNCTION each frame (animation)
        const animation_loop = ()=>{
            requestAnimationFrame(animation_loop)

            // GET time for each frame
            const time = Date.now()
            const delta = time - previousTime
            previousTime = time

            // if user hover "View project", increase scale
            if (view_project_active && this.scale < this.scale_max){
                this.scale += this.scale_power * (delta/100)
            }

            // if user leave hover "View project", decrease scale
            else if(!view_project_active && this.scale > this.scale_min){
                this.scale -= this.scale_power * (delta/100)
            }

            // PREVENT against infinite increase of the scale when user change page
            if (this.scale > this.scale_max){
                this.scale = this.scale_max
            }
            else if (this.scale < this.scale_min){
                this.scale = this.scale_min
            }


            
            this.$project_background.style.transform = `translate3d(${this.translateX}%, ${this.translateY}%, 0) scale(${this.scale})`
        }
        animation_loop()

        // CHECK if user hover "view project"
        this.$view_project.addEventListener(
            'mouseover',
            ()=>{
                view_project_active = true
                this.$project_background.classList.add('active')
            }
        )
        this.$view_project.addEventListener(
            'mouseout',
            ()=>{
                view_project_active = false
                this.$project_background.classList.remove('active')
            }
        )
    }
}
const parallax = new Parallax()