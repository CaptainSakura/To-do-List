{
  const tasks = [
    {
      content: "zrobić zakupy",
      done: true,
    },
    {
      content: "iść na siłownie",
      done: false,
    },
  ];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");
    toggleDoneButtons.forEach((toggleDoneButtons, index) => {
      toggleDoneButtons.addEventListener("click", () => toggleTaskDone(index));
    });
  };

  const render = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `
        <li class="list">
          <button class="list__button js-done"
          ${
            task.done
              ? 'style="color: #fff"'
              : 'style = "color: rgb(26, 123, 30)"'
          }>
            ✓
          </button>
          <span
            ${task.done ? 'style="text-decoration: line-through"' : ""}>
            ${task.content}
          </span>
          <button class="list__button list__button--remove js-remove">
          ✗
          </button>
        </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    const taskInput = document.querySelector(".js-form__newTask");

    const onFormSubmit = (event) => {
      event.preventDefault();

      const newTaskContent = document
        .querySelector(".js-form__newTask")
        .value.trim();
      taskInput.focus();

      if (newTaskContent === "") {
        return;
      }
      addNewTask(newTaskContent);
      form.reset();
    };

    form.addEventListener("submit", onFormSubmit);
  };

  init();
  taskInput.focus();
}
