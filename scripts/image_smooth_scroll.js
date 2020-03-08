








class SmoothScroll{
    constructor($img_container){
        this.$img_container = document.querySelector(`.${$img_container}`)
        this.$img = this.$img_container.querySelector('img')
        this.init()
    }
    init(){
        let scroll_last_pos = 0
        let ticking = false

        const img_scroll = (raw_scroll_pos)=>{
            const img_container_bounding = this.$img_container.getBoundingClientRect()
            const img_bounding = this.$img.getBoundingClientRect()


            const height_diff = img_bounding.height - img_container_bounding.height



            // Detect if the img is on user screen
            const img_appear = img_container_bounding.y - sizes.height // img appear when this value = 0
            const img_disappear = img_container_bounding.y + img_container_bounding.height // img disappear when this value = 0

            if((img_appear <= 0 && img_disappear >= 0) || (img_disappear <= 0 && img_appear >= 0)){
                const img_diff = Math.abs(img_appear) + Math.abs(img_disappear)
                const img_strength = 1/Math.abs(img_appear)
                console.log(img_strength);
                
            }


            // console.log(img_diff);
            
            if(img_disappear <= 0){
                // const scroll_strength =
            }
            // const scroll_pos = raw_scroll_pos - img_appear
            console.log(img_appear)
            // console.log(img_disappear)


            


            // const scroll_strength = -0.5 + (scroll_pos / sizes.height)
            // const scroll_movement = scroll_strength*height_diff*2
            // console.log(scroll_movement);



            // this.$img.style.transform = `translateY(${scroll_movement}px)`
            // console.log(scroll_strength);
            
        }










        
        window.addEventListener('scroll', function(e) {
            scroll_last_pos = window.scrollY
            if (!ticking) {
            window.requestAnimationFrame(function() {
                img_scroll(scroll_last_pos)
                ticking = false
            })
            }
            ticking = true
        })
    }
}

const about_profile_img = new SmoothScroll('profile_img_container')