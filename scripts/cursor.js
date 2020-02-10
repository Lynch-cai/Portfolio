class Cursor{
    constructor(){
        this.$cursor_dot = document.querySelector('.js-cursor_dot')
        this.$cursor_circle = document.querySelector('.js-cursor_circle')
        this.cursor_move()
        this.cursor_hover()
    }
    cursor_move(){
        const cursor = {
            x: 0,
            y: 0
        }
        const cursor_dot = {
            width: 8,
            height: 8
        }
        const cursor_circle = {
            x: 0,
            y: 0,
            width: 30,
            height: 30,
            border: 1,
            mouse_power: 0.01
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
            const time = Date.now()
            const delta = time - previousTime
            previousTime = time
            cursor_circle.x += (cursor.x - cursor_circle.x) * (cursor_circle.mouse_power * delta)
            cursor_circle.y += (cursor.y - cursor_circle.y) * (cursor_circle.mouse_power * delta)
            this.$cursor_dot.style.transform = `translate(${cursor.x - cursor_dot.width/2}px, ${cursor.y - cursor_dot.height/2}px)`
            this.$cursor_circle.style.transform = `translate(${cursor_circle.x - (cursor_circle.width/2) - (cursor_circle.border/2)}px, ${cursor_circle.y - (cursor_circle.height/2) - (cursor_circle.border/2)}px)`
        }
        animation_loop()
    }
    cursor_hover(){
        document.addEventListener(
            'click',
            ()=>{
                this.$cursor_dot.classList.toggle('active')
            }
        )
    }
}
const cursor = new Cursor()