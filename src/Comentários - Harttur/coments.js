class User {
  constructor(name, img, coment, time) {
    this.name = name;
    this.img = img;
    this.comment = coment;
    this.time = time;
  }
}

const user = new User("Antonio", "antonio.png", "", "");
var users = new Array();

function onInit() {
  const user1 = new User(
    "Julia Vasconcelos",
    "persona1.png",
    "Espero que encontre logo Antônio!",
    "16/04 às 17:45"
  );
  const user2 = new User(
    "Claudia Nogueira",
    "persona2.png",
    "Acredito ter visto ele  ontem passando pelo Santa branca.",
    "16/04 às 19:32"
  );
  const user3 = new User(
    "Guilherme Lopez",
    "persona3.png",
    "Entre em contato por Whatsapp Antônio.",
    "17/04 às 11:17"
  );
  var users = [user1, user2, user3];

  for (var i = 0; i < users.length; i++) {
    adicionarComment(users[i]);
  }

  strUsers = window.localStorage.getItem("users");
  users = JSON.parse(strUsers);
  if (users.length > 0) {
    for (var i = 0; i < users.length; i++) {
      adicionarComment(users[i]);
    }
  }
}

function showDialog() {
  const date = new Date();
  const day = date.getDate();
  const time = date.getTime();

  var dateTime = day + " às " + time;

  user.time = dateTime;

  const dialogContainer = document.getElementById("dialog-container");
  const dialogContent = `
    <dialog id="meu-dialog" >
    <textarea id="text-dialog" class="form-control" cols="30" rows="10"> </textarea>
    <button onclick="adicionarComment(user)"  class="btn btn-primary" id="close-btn">Adicionar</button>
    <button onclick="fecharDialog()" class="btn btn-primary" id="close-btn">Fechar</button>
      
    </dialog>
  `;

  dialogContainer.innerHTML = dialogContent;

  const dialog = document.getElementById("meu-dialog");
  dialog.showModal();
}

function fecharDialog() {
  const dialog = document.getElementById("meu-dialog");
  dialog.close();
}

function adicionarComment(user) {
  const dialog = document.getElementById("meu-dialog");

  if (dialog) {
    const textDialog = document.getElementById("text-dialog");
    user.comment = textDialog.value;
    users.push(user);
    window.localStorage.setItem("users", JSON.stringify(users));
  }

  const comentario = `
    <div class="coment">
        <img src="${user.img}" />

        <h2 class="name">${user.name}</h2>
        <h4 class="date">${user.time}</h4>
        <textarea readonly id="texto" class="form-control">
        ${user.comment}
        </textarea>

        <button id="botton" class="btn btn-primary" style="margin-bottom: 5px" onclick="showDialog()">
          <h5>Responder</h5>
        </button>
        <button id="botton1" class="btn btn-primary" style="margin-bottom: 5px">
          <h5>Denunciar</h5>
        </button>
      </div>
    `;

  const container = document.getElementById("container");
  container.innerHTML += comentario;

  if (dialog) {
    fecharDialog();
  }
}
