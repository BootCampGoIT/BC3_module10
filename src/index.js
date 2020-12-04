import { v4 as uuidv4 } from 'uuid';
import data from './data/data.json';
import cardsTemplate from './templates/cardsTemplate.hbs';
import cardsTemplate2 from './templates/cardsTemplate2.hbs';
import './styles.css';

const theme = {
  light: 'light-theme',
  dark: 'dark-theme',
};

const checkboxReference = document.querySelector('.theme-switch__toggle');
const body = document.querySelector('body');

const onDarkTheme = () => {
  body.classList.contains('light-theme') &&
    body.classList.remove('light-theme');
  body.classList.add('dark-theme');
};

const onLightTheme = () => {
  body.classList.contains('dark-theme') && body.classList.remove('dark-theme');
  body.classList.add('light-theme');
};

if (localStorage.getItem('theme')) {
  const checked = JSON.parse(localStorage.getItem('theme'));
  checkboxReference.checked = checked;
  checked ? onDarkTheme() : onLightTheme();
}

const checkboxState = e => {
  localStorage.setItem('theme', JSON.stringify(e.target.checked));
  e.target.checked ? onDarkTheme() : onLightTheme();
};

checkboxReference.addEventListener('change', checkboxState);

// ====================================================

const content = document.querySelector('.content');

// ${courses.map(course => (`<span>${course}</span>`)).join("")}

const createMarkup = dataArray => {
  return dataArray.reduce((acc, { photo, name, age, status, courses }) => {
    acc += `
    <li class="card">
      <img class="photo" src=${photo} alt=${name}/>
      <h2>name: ${name}</h2>
      <p>age: ${age}</p>
      <p>status: ${status}</p>
      <h3>Skills: </h3>
      <ul>
      ${courses.reduce((acc, course) => {
        acc += `<li><span>${course}</span></li>`;
        return acc;
      }, '')}
      </ul>
    </li>
    `;
    return acc;
  }, '');
};

content.innerHTML = `<ul>${createMarkup(data)}</ul>`;

// ===
// content.innerHTML = cardsTemplate(data);

// ====
// let liMarkup = '';

// data.forEach(student => (liMarkup += cardsTemplate2(student)));
// content.innerHTML = liMarkup;
