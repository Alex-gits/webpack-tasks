const task = (status, id, text) => {
  return `
  <div class='task' data-status=${status} data-id=${id}>
    <button class='delete-button'>☓</button>
    <p>${text}</p>
    <button class='done-button'>Done</button>
  </div>
  `;
};

export default task;
