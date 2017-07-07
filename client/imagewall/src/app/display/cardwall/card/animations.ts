import {
  trigger,
  state,
  style,
  animate,
  transition,
		animation
} from '@angular/animations';

export var fadeIn = animation(
[animate(3000,style({opacity:1}))]
);


export var fadeOut = animation(
[animate(3000,style({opacity:0}))]
);

//export var shrink =

