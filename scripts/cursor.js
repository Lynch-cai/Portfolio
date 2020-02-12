class Cursor{
    constructor(){
        this.$cursor_dot = document.querySelector('.js-cursor_dot')
        this.$cursor_circle = document.querySelector('.js-cursor_circle')
        this.cursor_active = false
        this.cursor_move()

        this.$cursor_detect_this = document.querySelectorAll('.js-cursor_detect_this')
        this.cursor_hover()
    }
    // FUNCTION Cursor movement
    cursor_move(){

        // DECLARE Object & variable
        const cursor = {
            x: 0,
            y: 0
        }

        const cursor_dot = {
            width: 8,
            height: 8,
            transform_scale: 1,
            transform_scale_power: 0.10 // Higher = faster the scale of $cursor_dot will decrease when user hover a element with the class ".js-cursor_detect_this"
        }

        const cursor_circle = {
            x: 0,
            y: 0,
            width: 70,
            height: 70,
            border: 2,
            follow_power: 0.01, // Higher = faster the $cursor_circle follow the $cursor_dot
            transform_scale: 0.5, // Default = 0.5, Big = 1
            transform_scale_power: 0.01
        }

        let previousTime = Date.now()

        let circle_bounce_step = '00'

        let circle_bounce_key = 0
        let circle_bounce_reverse_key = 0



        // GET user cursor position
        window.addEventListener(
            'mousemove',
            (_event)=>{
                cursor.x = _event.clientX
                cursor.y = _event.clientY
            }
        )

        

        // FUNCTION each frame (animation)
        const animation_loop = ()=>{
            window.requestAnimationFrame(animation_loop)
            
            // GET time for each frame
            const time = Date.now()
            const delta = time - previousTime
            previousTime = time

            // GET $cursor_circle position
            cursor_circle.x += (cursor.x - cursor_circle.x) * (cursor_circle.follow_power * delta)
            cursor_circle.y += (cursor.y - cursor_circle.y) * (cursor_circle.follow_power * delta)



            // GET cursor scale
                // User enter Hover
            if(this.cursor_active){

                circle_bounce_reverse_key = 0
                // Cursor dot
                cursor_dot.transform_scale -= cursor_dot.transform_scale_power
                if(cursor_dot.transform_scale < 0){
                    cursor_dot.transform_scale = 0
                }

                // Cursor circle
                this.$cursor_circle.style.border = 'none'
                this.$cursor_circle.style.background = '#333'
                this.$cursor_circle.style.mixBlendMode = 'color-dodge'
                // cursor_circle.transform_scale = 1


                // Bounce effect
                    // STEP 1 of the bounce effect -> Make it smaller
                if(circle_bounce_step == '00' || circle_bounce_step == '01'){
                    circle_bounce_step = '01'
                    cursor_circle.transform_scale -= 0.02 * (delta/15)// circle_scale power
                    if(cursor_circle.transform_scale <= 0.2){
                        circle_bounce_step = '02'
                    }
                }
                    // STEP 2 of the bounce effect -> Make it bigger
                else if(circle_bounce_step == '02'){                                                    // cursor_circle.transform_scale <= 0.2
                    circle_bounce_step = '02'
                    circle_bounce_key += 0.05
                    cursor_circle.transform_scale += (0.004 * delta * Math.exp(circle_bounce_key)) // circle_scale power
                    if(cursor_circle.transform_scale >= 1.1){
                        circle_bounce_step = '03'
                    }
                }
                    // STEP 3 of the bounce effect -> Make it smaller again
                else if(circle_bounce_step == '03'){ // if circle_scale >= 1.1
                    cursor_circle.transform_scale -= 0.003 * (delta/5) // circle_scale power

                    if(cursor_circle.transform_scale <= 1){
                        circle_bounce_step = 'stop'
                    }
                }
            }

                // User leave Hover
            else{
                circle_bounce_key = 0
                // cursor circle reset

                // cursor_dot
                if(cursor_dot.transform_scale >= 1){
                    cursor_dot.transform_scale = 1
                }
                else{
                    cursor_dot.transform_scale += cursor_dot.transform_scale_power
                }
                
                // cursor_circle
                
                this.$cursor_circle.style.border = 'solid white 2px'
                this.$cursor_circle.style.background = '#00000000'
                this.$cursor_circle.style.mixBlendMode = 'difference'


                // Bounce effect reverse
                    // STEP 0 of the bounce effect -> Change nothing if nothing happen
                if(circle_bounce_step == '00'){

                }
                    // STEP 1 of the bounce effect -> Make it bigger if circle_bounce_step == 01
                else if(circle_bounce_step == '01'){
                    cursor_circle.transform_scale += 0.02 * (delta/15)// circle_scale power
                    if(cursor_circle.transform_scale >= 0.5){
                        circle_bounce_step = '00'
                    }
                }
                    // STEP 2 of the bounce effect -> Make it smaller if circle_bounce_step == 02
                else if(circle_bounce_step == '02'){
                    circle_bounce_reverse_key += 0.05
                    cursor_circle.transform_scale -= (0.004 * delta * Math.exp(circle_bounce_reverse_key)) // circle_scale power
                    if(cursor_circle.transform_scale <= 0.3){
                        circle_bounce_step = '01'
                    }
                }
                    // STEP 3 of the bounce effect -> Make it bigger if circle_bounce_step == '03' or 'stop'
                else{
                    cursor_circle.transform_scale += 0.003 * (delta/5) // circle_scale power
                    if(cursor_circle.transform_scale >= 1.1){
                        circle_bounce_step = '02'
                    }
                }
            }

            // APPLY cursor translate & scale
            this.$cursor_dot.style.transform = `translate(${cursor.x - cursor_dot.width/2}px, ${cursor.y - cursor_dot.height/2}px) scale(${cursor_dot.transform_scale})`
            this.$cursor_circle.style.transform = `translate(${cursor_circle.x - (cursor_circle.width/2) - (cursor_circle.border)}px, ${cursor_circle.y - (cursor_circle.height/2) - (cursor_circle.border)}px) scale(${cursor_circle.transform_scale})`

        }
        animation_loop()
    }

    // FUNCTION Change cursor_active value when user hover a element with the class ".js-cursor_detect_this"
    cursor_hover(){ 
        this.$cursor_detect_this.forEach((_element)=>{

            // Enter hover
            _element.addEventListener(
                'mouseover',
                ()=>{
                    this.cursor_active = true
                }
            )

            // Leave hover
            _element.addEventListener(
                'mouseout',
                ()=>{
                    this.cursor_active = false
                }
            )
        })
    }
}
const cursor = new Cursor()