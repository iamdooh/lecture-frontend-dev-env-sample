import form from './form';
import result from './result';
import './app.css';

// import './app.css';
//import nyancat from './nyancat.jpg';

let formEl;
let resultEl;

document.addEventListener('DOMContentLoaded', async () => {
  formEl = document.createElement('div');
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);

  resultEl = document.createElement('div');
  resultEl.innerHTML = await result.render();
  document.body.appendChild(resultEl);
});

console.log(process.env.NODE_ENV);
// console.log(TWO); // 2
// console.log(TWO_STRING); // "1+1"
// console.log(api.domain);

if (module.hot) {
  console.log('핫 모듈 켜짐');

  module.hot.accept('./result', async () => {
    console.log('result 모듈 변경됨');
    resultEl.innerHTML = await result.render();
  });

  module.hot.accept('./form', async () => {
    console.log('form 모듈 변경됨');
    formEl.innerHTML = form.render();
  });
}
