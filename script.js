{
  let tasks = [
    {
      content: "zrobić zakupy",
      done: true,
    },
    {
      content: "iść na siłownie",
      done: false,
    },
  ];

  let hideDone = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent, done: false }];
    render();
  };

  const removeTask = (index) => {
    tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
    render();
  };

  const toggleTaskDone = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      { ...tasks[index], done: !tasks[index].done },
      ...tasks.slice(index + 1),
    ];
    render();
  };

  const hideDoneTasks = () => {
    hideDone = !hideDone;
    render();
  };

  const allTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };
  const markAllAsDoneButtonEvent = () => {
    const allDoneButton = document.querySelector(".js-section__buttonDoneAll");
    allDoneButton.addEventListener("click", allTasksDone);
  };

  const hideDoneTasksButtonEvent = () => {
    const hideDoneAll = document.querySelector(
      ".js--section__buttonToggleHideDone"
    );
    hideDoneAll.addEventListener("click", hideDoneTasks);
  };

  const toggleDoneButtons = document.querySelectorAll(".js-done");
  toggleDoneButtons.forEach((button, index) => {
    button.addEventListener("click", () => toggleTaskDone(index));
  });

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const renderTasks = () => {
    let newTask = "";
    for (const task of tasks) {
      if (!hideDone || !task.done) {
        newTask += `
        <li class="list">
          <button class="list__button list__button--green js-done"
          ${task.done ? 'style= "color: #fff"' : ""}>
            ✓
          </button>
          <span
            ${task.done ? 'style="text-decoration: line-through " ' : ""}>
            ${task.content}
          </span>
          <button class="list__button list__button--red list__button--remove js-remove">
          ✗
          </button>
        </li>
      `;
      }
    }

    document.querySelector(".js-tasks").innerHTML = newTask;
    bindEvents();
  };

  const renderButtons = () => {
    const buttonsContainer = document.querySelector(
      ".js-section__buttonsContainer"
    );

    if (!tasks.length) {
      buttonsContainer.innerHTML = "";
    } else {
      buttonsContainer.innerHTML = `
        <button class = "js-section__buttonToggleHideDone section__buttonToggleHideDone">
          ${hideDone ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button ${
          tasks.every(({ done }) => done) ? "disabled" : ""
        } class = "js-section__buttonDoneAll  section__buttonDoneAll">
          Ukończ wszystkie
        </button> `;
      markAllAsDoneButtonEvent();
      hideDoneTasksButtonEvent();
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();
  };

  const onFormSubmitEvent = (event) => {
    event.preventDefault();
    const newTaskContent = document
      .querySelector(".js-form__newTask")
      .value.trim();

    if (newTaskContent === "") {
      return;
    }
    addNewTask(newTaskContent);
    document.querySelector(".js-form").reset();
    document.querySelector(".js-form__newTask").focus();
  };

  const formSubmit = () => {
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmitEvent);
  };

  const init = () => {
    formSubmit();
    render();
  };

  init();
}
