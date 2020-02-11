class Cursor{
    constructor(){
        this.$cursor_dot = document.querySelector('.js-cursor_dot')
        this.$cursor_circle = document.querySelector('.js-cursor_circle')
        this.cursor_active = false
        this.cursor_move()


        this.$cursor_detect_this = document.querySelectorAll('.js-cursor_detect_this')
        this.cursor_hover()
    }
    cursor_move(){
        const cursor = {
            x: 0,
            y: 0
        }
        const cursor_dot = {
            width: 8,
            height: 8,
            transform_scale: 1,
            transform_scale_power: 0.10 // More this value is high, more fast the scale of cursor_dot will decrease on hover of a pages (Work, About)
        }
        const cursor_circle = {
            x: 0,
            y: 0,
            width: 30,
            height: 30,
            border: 1,
            follow_power: 0.01, // More this value is high, more fast the cursor_circle come to the cursor_dot
            transform_scale: 1,
            transform_scale_power: 0.10 // More this value is high, more fast the scale of cursor_dot will decrease on hover of a pages (Work, About, Medias)
        }
        let previousTime = Date.now()
        window.addEventListener(
            'mousemove',
            (_event)=>{
                cursor.x = _event.clientX
                cursor.y = _event.clientY
            }
        )
        const animation_loop = ()=>{
            window.requestAnimationFrame(animation_loop)


            // get cursor translate (position)
            const time = Date.now()
            const delta = time - previousTime
            previousTime = time
            cursor_circle.x += (cursor.x - cursor_circle.x) * (cursor_circle.follow_power * delta)
            cursor_circle.y += (cursor.y - cursor_circle.y) * (cursor_circle.follow_power * delta)


















            // get cursor scale (on hover)
            if(this.cursor_active){ // if cursor hover pages (Work, About, Medias)
                // cursor_dot
                cursor_dot.transform_scale -= cursor_dot.transform_scale_power
                if(cursor_dot.transform_scale < 0){
                    cursor_dot.transform_scale = 0
                }

                // cursor_circle
                this.$cursor_circle.style.border = 'none'
                this.$cursor_circle.style.background = '#333'
                this.$cursor_circle.style.zIndex = -1
                if(cursor_circle.transform_scale >= 2){
                    cursor_circle.transform_scale = 2
                }
                else{
                    cursor_circle.transform_scale += cursor_circle.transform_scale_power
                }
            }



            else{ // if cursor leave pages
                // cursor_dot
                if(cursor_dot.transform_scale > 1){
                    cursor_dot.transform_scale = 1
                }
                else{
                    cursor_dot.transform_scale += cursor_dot.transform_scale_power
                }

                // cursor_circle
                this.$cursor_circle.style.border = 'solid white 1px'
                this.$cursor_circle.style.background = '#00000000'
                this.$cursor_circle.style.zIndex = 0
                if(cursor_circle.transform_scale <= 1){
                    cursor_circle.transform_scale = 1
                }
                else{
                    cursor_circle.transform_scale -= cursor_circle.transform_scale_power
                }
            }



            // apply cursor translate & scale
            this.$cursor_dot.style.transform = `translate(${cursor.x - cursor_dot.width/2}px, ${cursor.y - cursor_dot.height/2}px) scale(${cursor_dot.transform_scale})`
            this.$cursor_circle.style.transform = `translate(${cursor_circle.x - (cursor_circle.width/2) - (cursor_circle.border/2)}px, ${cursor_circle.y - (cursor_circle.height/2) - (cursor_circle.border/2)}px) scale(${cursor_circle.transform_scale})`

        }
        animation_loop()
    }























    cursor_hover(){ // change cursor_active value when hover pages
        this.$cursor_detect_this.forEach((_element)=>{
            _element.addEventListener(
                'mouseover',
                ()=>{
                    this.cursor_active = true // enter hover
                }
            )
            _element.addEventListener(
                'mouseout',
                ()=>{
                    this.cursor_active = false // leave hover
                }
            )
        })
    }
}
const cursor = new Cursor()