import SmoothScroll from './ImageSmoothScroll.js'
const smooth_scroll_profile_img = new SmoothScroll('js-about_intro_profile_container')

import GlobalScrollElementDirection from './GlobalScrollElementDirection.js'
const about_intro_text_hello_scroll = new GlobalScrollElementDirection('js-about_intro_text_hello', 0, 800, 'left', 1.2)
const about_section_title_skills_scroll = new GlobalScrollElementDirection('js-about_section_title_skills', 500, 800, 'right', 1.2)
const about_section_title_experiences_scroll = new GlobalScrollElementDirection('js-about_section_title_experiences', 925, 800, 'right', 1.2)
