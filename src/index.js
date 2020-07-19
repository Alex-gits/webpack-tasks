import './styles/main.scss';

import panel from './components/panel';
import task from './components/newTask';

let taskArray = [];

// Dom elements
const container = document.querySelector('#container');
const app = document.createElement('div');

// Adding panel with form
container.appendChild(app);
app.classList.add('app');

app.insertAdjacentHTML('afterbegin', panel);

// Adding new tasks
const form = document.querySelector('.task-form');
const input = document.querySelector('.task-input');
const tasksWrapper = document.querySelector('.tasks-wrapper');

form.addEventListener('submit', e => {
  e.preventDefault();

  let taskObj = {
    text: input.value,
    status: 'active',
    id: Math.random().toFixed(4)
  };

  const newTask = task(taskObj.status, taskObj.id, taskObj.text);

  tasksWrapper.insertAdjacentHTML('afterbegin', newTask);
  taskArray.push(taskObj);
  input.value = '';

  // Delete and change status functionality
  const deleteButton = document.querySelector('.delete-button');
  const doneButton = document.querySelector('.done-button');

  // Changing tasks status on click
  doneButton.addEventListener('click', e => {
    const task = e.target.closest('.task');
    const id = task.dataset.id;
    const paragrapsh = task.querySelector('p');

    if (task.dataset.status === 'active') {
      task.dataset.status = 'finished';
      paragrapsh.style.textDecoration = 'line-through';

      taskArray.forEach(el => {
        el.id === `${id}` ? (el.status = 'finished') : el;
      });
    } else {
      task.dataset.status = 'active';
      paragrapsh.style.textDecoration = 'none';

      taskArray.forEach(el => {
        el.id === `${id}` ? (el.status = 'active') : el;
      });
    }
  });

  // Deleting task from DOM and array
  deleteButton.addEventListener('click', e => {
    const task = e.target.closest('.task');
    const id = task.dataset.id;

    taskArray = taskArray.filter(el => {
      return el.id !== `${id}`;
    });

    task.remove();
  });
});
