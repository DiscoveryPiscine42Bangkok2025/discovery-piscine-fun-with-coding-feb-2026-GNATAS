$(function () {
  const $list = $("#ft_list");
  const $btn = $("#new");
  const COOKIE_NAME = "todos";

  function setCookie(name, value) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; path=/";
  }

  function getCookie(name) {
    const parts = document.cookie.split("; ");
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].indexOf(name + "=") === 0) {
        return decodeURIComponent(parts[i].substring((name + "=").length));
      }
    }
    return null;
  }

  function saveAll() {
    const arr = [];
    $list.children().each(function () {
      arr.push($(this).data("text"));
    });
    setCookie(COOKIE_NAME, JSON.stringify(arr));
  }

  function addTodo(text) {
    const $row = $("<div></div>")
      .addClass("row")
      .data("text", text);

    const $cell = $("<div></div>")
      .addClass("cell")
      .text(text);

    $row.append($cell);

    $row.on("click", function () {
      if (confirm("Remove this TO DO?")) {
        $(this).remove();
        saveAll();
      }
    });

    $list.prepend($row);
    saveAll();
  }

  function loadTodos() {
    const raw = getCookie(COOKIE_NAME);
    if (!raw) return [];
    try {
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  $btn.on("click", function () {
    let t = prompt("New TO DO:");
    if (t === null) return;
    t = t.trim();
    if (t === "") return;
    addTodo(t);
  });

  const saved = loadTodos();
  for (let i = saved.length - 1; i >= 0; i--) {
    addTodo(saved[i]);
  }
});
