class List {
  constructor(name, section) {
    this.name = name;
    this.section = document.querySelector(section);
    this.form = this.section.querySelector("form");
    this.list = this.section.querySelector(".list");
    this.items = [];
  }

  init() {
    if (localStorage.getItem(this.name)) {
      this.items = JSON.parse(localStorage.getItem(this.name));
      this.items.forEach((item) => {
        this.drawItem(item);
      });
    }
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.addItem();
      event.target.reset();
    });
  }

  // =============================
  addItem() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      // =============================
      // +
      //   let elems = event.target.elements;
      //   if (this.name === "homeTasks") {
      //     let item = new Item(elems[0].value, this.items.length);
      //     this.drawItem(item);
      //     this.items.push(item);
      //   } else if (this.name === "homeTasks") {
      //     let item = new WorkTask(
      //       elems[0].value,
      //       elems[1].value,
      //       this.items.length
      //     );
      //     this.drawItem(item);
      //     this.items.push(item);
      //   } else if (this.name === "shoppingList") {
      //     let item = new ShoppingTask(elems[0].value, elems[1].value,
      //       this.items.length);
      //     this.drawItem(item);
      //     this.items.push(item);
      //   }
      //   this.addToLocalStorage();
      // }

      if (this.name === "homeTasks") {
        Array.from(event.target.elements).forEach((input) => {
          if (input.tagName.toLowerCase() === "input") {
            this.items.push(new Item(input.value, this.items.length));
            this.drawItem(new Item(input.value, this.items.length));
          }
        });
      } else if (this.name === "workTasks") {
        this.items.push(
          new WorkTask(
            event.target.elements[0].value,
            event.target.elements[1].value,
            this.items.length
          )
        );
        this.drawItem(
          new WorkTask(
            event.target.elements[0].value,
            event.target.elements[1].value,
            this.items.length
          )
        );
      } else if (this.name === "shoppingList") {
        this.items.push(
          new ShoppingTask(
            event.target.elements[0].value,
            event.target.elements[1].value,
            this.items.length
          )
        );
        this.drawItem(
          new ShoppingTask(
            event.target.elements[0].value,
            event.target.elements[1].value
          )
        );
      }
      event.target.reset();
    });
  }
  //  After this
  drawItem(item) {
    let li = document.createElement("li");

    if (this.name === "workTasks") {
      // li.innerText = item.text + item.deadLine;

      let span = document.createElement("span");
      span.innerHTML += item.text + " before  " + item.deadLine;
      li.appendChild(span);
    } else if (this.name === "homeTasks") {
      // li.innerText = item.text;

      let span = document.createElement("span");
      span.innerHTML += item.text;
      li.appendChild(span);
    } else if (this.name === "shoppingList") {
      let link = document.createElement("a");
      link.setAttribute("href", item.url);
      link.setAttribute("target", "_blank");
      link.innerText = item.text;
      li.appendChild(link);
    }
    item.done ? li.classList.add("checked") : li.classList.remove("checked");

    this.addChecker(li, item.id);
    this.list.appendChild(li);
  }

  addChecker(parent, id) {
    let checker = document.createElement("input");
    checker.setAttribute("type", "checkbox");

    checker.addEventListener("input", () => {
      let index = this.items.findIndex((item) => item.id === id);
      if (index >= 0) {
        this.items[id - 1].done = !this.items[id - 1].done;
        console.log(this.items);
      }
    });

    parent.appendChild(checker);
  }

  addDeleteBtn(parent, id) {
    let btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.classList.add("remove_item");
    btn.setAttribute("data-id-to-remove", id);
    btn.innerHTML = "&times;";
    btn.addEventListener("click", () => {
      let index = this.items.findIndex((item) => item.id === id);
      if (index >= 0) {
        this.items.splice(index, 1);
        event.target.closest("li").remove();
        this.addToLocalStorage();
      }
    });
    parent.appendChild(btn);
  }

  addEditBtn(parent, id) {
    let btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.classList.add("edit_item");
    btn.setAttribute("data-id-to-edit", id);
    btn.innerHTML = "Edit";
    btn.addEventListener("click", () => {
      let index = this.items.findIndex((item) => item.id === id);
      if (index >= 0) {
        this.startEdit(this.items[index], id);
      }
    });
    parent.appendChild(btn);
  }

  startEdit(item, id) {
    let inputs = event.target
      .closest(".list_wrap")
      .querySelector(".form").elements;

    for (let key in item) {
      if (inputs[key]) {
        inputs[key].value = item[key];
      }
    }
  }

  addToLocalStorage() {
    if (checkStotage("localStorage")) {
      localStorage[this.name] = JSON.stringify(this.items);
    } else {
      alert("The site may not work correctly!");
    }
  }
}
