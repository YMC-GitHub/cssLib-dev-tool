/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// import img from './logo.png';
// eslint-disable-next-line
import less from './buttons.less';
// import css from './main.css';


// eslint-disable-next-line no-undef
const time = document.getElementById('time');
function updateClock() {
  time.innerHTML = (new Date()).toString();
}
const timer = setInterval(updateClock, 1000);

console.log('hi,my name is yemiancgeng!', less);
console.log('hi,i come from china!');
console.log('hi,it can refresh css!');
console.log('hi,it can refresh js!');
console.log('hi,it can refresh html!');
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    clearInterval(timer);
  });
}
