class Cursor{
    constructor(){
        this.$cursor_dot = document.querySelector('.js-cursor_dot')
        this.$cursor_circle = document.querySelector('.js-cursor_circle')
        this.cursor = {
            x: 0,
            y: 0
        }
        this.cursor_dot = {
            x: 0,
            y: 0,
            width: 8,
            height: 8,
            mouse_power: 0.05
        }
        this.cursor_circle = {
            x: 0,
            y: 0,
            width: 30,
            height: 30,
            border: 1,
            mouse_power: 0.01
        }
        this.previousTime = Date.now()
        this.cursor_refresh()
    }
    cursor_refresh(){
        window.addEventListener(
            'mousemove',
            (_event)=>{
                this.cursor.x = _event.clientX
                this.cursor.y = _event.clientY
            }
        )
        const animation_loop = ()=>{
            window.requestAnimationFrame(animation_loop)
            const time = Date.now()
            const delta = time - this.previousTime
            this.previousTime = time
            this.cursor_dot.x += (this.cursor.x - this.cursor_dot.x) * (this.cursor_dot.mouse_power * delta)
            this.cursor_dot.y += (this.cursor.y - this.cursor_dot.y) * (this.cursor_dot.mouse_power * delta)
            this.cursor_circle.x += (this.cursor.x - this.cursor_circle.x) * (this.cursor_circle.mouse_power * delta)
            this.cursor_circle.y += (this.cursor.y - this.cursor_circle.y) * (this.cursor_circle.mouse_power * delta)
            this.$cursor_dot.style.transform = `translate(${this.cursor_dot.x - this.cursor_dot.width/2}px, ${this.cursor_dot.y - this.cursor_dot.height/2}px)`
            this.$cursor_circle.style.transform = `translate(${this.cursor_circle.x - (this.cursor_circle.width/2) - (this.cursor_circle.border/2)}px, ${this.cursor_circle.y - (this.cursor_circle.height/2) - (this.cursor_circle.border/2)}px)`
        }
        animation_loop()
    }
}
const cursor = new Cursor()