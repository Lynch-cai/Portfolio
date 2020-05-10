// Animation
import GlobalImageSmoothScroll from './GlobalImageSmoothScroll.js'
const smooth_scroll_profile_img = new GlobalImageSmoothScroll('js-about_intro_profile_container')

import GlobalScrollElementDirection from './GlobalScrollElementDirection.js'
const about_intro_text_hello_scroll = new GlobalScrollElementDirection('js-about_intro_text_hello', 0, 800, 'left', 1.2)
const about_section_title_skills_scroll = new GlobalScrollElementDirection('js-about_section_title_skills', 500, 800, 'right', 1.2)
const about_section_title_experiences_scroll = new GlobalScrollElementDirection('js-about_section_title_experiences', 925, 800, 'right', 1.2)

// Change page
import GlobalTransitionChangePage from './GlobalTransitionChangePage.js'
let change_page_to_work = new GlobalTransitionChangePage('js-header_nav_work', 'index.html')
let change_page_to_home = new GlobalTransitionChangePage('js-header_nav_logo', 'index.html')