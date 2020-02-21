// let scroll_direction = '' // top, down, right, left
// let scroll_power = ''
// $(function() {
//     var loghandle = function(event, delta) {
//         var o = ''
//         if (event.deltaY > 0)
//             o += 'top';
//         else if (event.deltaY < 0)
//             o += 'down';
//         if (event.deltaX > 0)
//             o += 'right';
//         else if (event.deltaX < 0)
//             o += 'left';
//         scroll_direction = o
//         scroll_power = event.deltaFactor
//         // console.log(scroll_direction);
//         // console.log(scroll_power);
//     };
//     $(document)
//         .mousewheel(function(event, delta) {
//             loghandle(event, delta);
//         });
// });

// class Scroll{
//     constructor(){
//         this.$projects_container = document.querySelector('.js-projects_container')
//         this.$project_container = document.querySelectorAll('.js-projects_container')
//         this.$transition_page = this.$projects_container.querySelector('.js-project_transition_page')
//         this.init()
//     }
//     init(){
//         let project_number = 0
//         let project_pos = 0

//         window.addEventListener(
//             'scroll',
//             ()=>{
//                 if (scroll_direction == 'down') {
//                     if (project_number < this.$project_container.length) {
//                         project_number += 1
//                     }
//                     else{
//                         project_number = 0
//                     }
//                 }
//                 console.log(project_number);
                
//             }
//         )
//     }
// }

// let scroll = new Scroll()

// var derniere_position_de_scroll_connue = 0;
// var ticking = false;

// function faireQuelqueChose(position_scroll) {
//   console.log(position_scroll);
//   console.log('position_scroll');
  
// }

// window.addEventListener('scroll', function(e) {
//   derniere_position_de_scroll_connue = window.scrollY;
//     console.log('test');
    
//   if (!ticking) {
//     window.requestAnimationFrame(function() {
//       faireQuelqueChose(derniere_position_de_scroll_connue);
//       ticking = false;
//     });
//   }

//   ticking = true;
// });
// console.log('test');



window.addEventListener(
    'scroll',
    ()=>{
        console.log('ttttt');
    }
)

window.onscroll = function(){console.log('ttttt')};