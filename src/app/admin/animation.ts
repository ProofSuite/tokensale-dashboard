import {style, transition, animate, trigger} from "@angular/animations";

export const slideUp = trigger('slideUp', [
    transition('void => *', [
      style({transform: 'translateY(50%)'}),
      animate(400)
    ]),
    transition('* => void', [
      animate(400, style({transform: 'translateY(50%)'}))
    ])
]);

export const slideUpFooter = trigger('slideUpFooter', [
  transition('void => *', [
    style({transform: 'translateY(50%)'}),
    animate(600)
  ]),
  transition('* => void', [
    animate(600, style({transform: 'translateY(50%)'}))
  ])
]);

export const slideDown = trigger('slideDown', [
  transition('void => *', [
    style({transform: 'translateY(-50%)'}),
    animate(400)
  ]),
  transition('* => void', [
    animate(400, style({transform: 'translateY(-50%)'}))
  ])
]);

export const dialog = trigger('dialog', [
  transition('void => *', [
    style({transform: 'scale3d(.8, .8, .8)'}),
    animate(300)
  ]),
  transition('* => void', [
    animate(200, style({transform: 'scale3d(.0, .0, .0)'}))
  ])
]);
