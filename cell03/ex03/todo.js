var list = document.getElementById("ft_list");
var btn = document.getElementById("new");
var COOKIE_NAME = "todos";

function setCookie(name, value) {
  document.cookie = name + "=" + encodeURIComponent(value) + "; path=/";
}

function getCookie(name) {
  var parts = document.cookie.split("; ");
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].indexOf(name + "=") === 0) {
      return decodeURIComponent(parts[i].substring((name + "=").length));
    }
  }
  return null;
}

function saveAll() {
  var arr = [];
  var rows = list.children;
  for (var i = 0; i < rows.length; i++) {
    arr.push(rows[i].dataset.text); 
  }
  setCookie(COOKIE_NAME, JSON.stringify(arr));
}

function addTodo(text) {
  var row = document.createElement("div");
  row.className = "row";
  row.dataset.text = text;

  var cell = document.createElement("div");
  cell.className = "cell";
  cell.textContent = text;

  row.appendChild(cell);

  row.onclick = function () {
    if (confirm("Remove this TO DO?")) {
      row.remove();    
      saveAll();        
    }
  };


  if (list.firstChild) list.insertBefore(row, list.firstChild);
  else list.appendChild(row);

  saveAll();
}

function loadTodos() {
  var raw = getCookie(COOKIE_NAME);
  if (!raw) return [];
  try {
    var arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

btn.onclick = function () {
  var t = prompt("New TO DO:");
  if (t === null) return;
  t = t.trim();
  if (t === "") return;
  addTodo(t);
};

var saved = loadTodos();
for (var i = saved.length - 1; i >= 0; i--) {
  addTodo(saved[i]);
}
