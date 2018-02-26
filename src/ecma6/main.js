import {Controller} from './controller.js';

document.querySelector("h1").innerHTML="Using the ECMA6 mode";

let c=new Controller();
c.hook_dom();
c.start();
