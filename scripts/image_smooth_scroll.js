class SmoothScroll{
    constructor($img_container){
        this.$img_container = document.querySelector(`.${$img_container}`)
        this.$img = this.$img_container.querySelector('img')
        this.init()
    }
    init(){

        
        // Smooth image movement
        const img_scroll = ()=>{
            // GET image height & y pos
            const img_container_bounding = this.$img_container.getBoundingClientRect()
            const img_bounding = this.$img.getBoundingClientRect()

            const height_diff = img_bounding.height - img_container_bounding.height


            // DETECT if the img is on user screen
            const img_appear = img_container_bounding.y - sizes.height // img appear when this value = 0
            const img_disappear = img_container_bounding.y + img_container_bounding.height // img disappear when this value = 0

            if((img_appear <= 0 && img_disappear >= 0) || (img_disappear <= 0 && img_appear >= 0)){
                const img_diff = Math.abs(img_appear) + Math.abs(img_disappear)

                const img_translate_strength = -0.5+(Math.abs(img_appear)/img_diff)
                const img_movement = img_translate_strength*height_diff

                const img_scale_strength = 4 // lower value = higher scale
                const img_scale = 1+(Math.abs(img_appear)/img_diff)/img_scale_strength
                
                this.$img.style.transform = `translateY(${img_movement}px) scale(${img_scale})`

                
            }
        }



        // DETECT Scroll
        let scroll_last_pos = 0
        let ticking = false
        window.addEventListener(
            'scroll', 
            (e)=> {
                if (!ticking) {
                    window.requestAnimationFrame(
                        ()=>{
                            img_scroll()
                            ticking = false
                        }
                    )
                }
                ticking = true
            }
        )

        // Init
        img_scroll()
    }
}

const about_profile_img = new SmoothScroll('profile_img_container')