export default class GlobalScrollElementDirection{
    constructor(element, start_at, max_width, direction, scroll_power){
        this.$scroll_this_text = document.querySelector(`.${element}`)
        // scrolling text at scrollY pos
        this.start_at = start_at
        // max width before not scrolling anymore
        this.max_width = max_width
        // top, right, bottom, left
        this.direction = direction
        // scroll power (1 = position: fixed)
        this.scroll_power = scroll_power
        this.scroll_text_direction()
    }
    scroll_text_direction(){
        document.addEventListener(
            'scroll',
            ()=>{
                let scroll_y_pos = window.scrollY
                console.log(scroll_y_pos)
                
                if (sizes.width > this.max_width && this.start_at <= scroll_y_pos) {
                    this.direction == 'right' ? this.$scroll_this_text.style.transform = `translateX(${(scroll_y_pos - this.start_at)*this.scroll_power}px)` : ''
                    this.direction == 'left' ? this.$scroll_this_text.style.transform = `translateX(${(scroll_y_pos - this.start_at)*-this.scroll_power}px)` : ''
                    this.direction == 'bottom' ? this.$scroll_this_text.style.transform = `translateY(${(scroll_y_pos - this.start_at)*this.scroll_power}px)` : ''
                    this.direction == 'top' ? this.$scroll_this_text.style.transform = `translateY(${(scroll_y_pos - this.start_at)*-this.scroll_power}px)` : ''
                }
            }
        )
    }
}