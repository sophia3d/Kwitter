const firebaseConfig = {
    apiKey: "AIzaSyBvXdWvatmcK7S_RrpxBjDOZ7K31vh8kCI",
    authDomain: "kwitter-cf4db.firebaseapp.com",
    databaseURL: "https://kwitter-cf4db-default-rtdb.firebaseio.com",
    projectId: "kwitter-cf4db",
    storageBucket: "kwitter-cf4db.appspot.com",
    messagingSenderId: "1055710702994",
    appId: "1:1055710702994:web:2dd977cce887ef5d24a54b"
  };
//PARTE 1 - Atualize os links do firebase.

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//PARTE 2 - Atualize o elemento HTML com o nome do usuário.
userName = document.getElementById("userName").value;
document.getElementById("userName").innerHTML =
"Bem vindo" + userName + "!";

//PARTE 3 - Escrever o código para a função addRoom().
function addRoom(){
    roomName = document.getElementById("roomName").value;

    firebase.database().ref("/").child(roomName).update({
        purpose : "adicionar nome de sala"
    })

    localStorage.setItem("roomName", roomName)

    window.location = "kwitterPage.html"
}

//PARTE 4 - Completar a função getData().
function getData() {
    firebase.database().ref("/").on('value',
    function(snapshot){
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot){ childkey = childSnapshot.key;
    roomNames = childkey;
     console.log("Nome da Sala - " + roomNames);
     row = "<div class='roomName' id="+roomNames+
     " onclick='redirectToRoomName(this.id)'>#"+ roomNames +"</div><hr>";
     document.getElementById("output").innerHTML += row;

}); }); }
       


getData();
//PARTE 5 - E, escrever o código para a função redirectToRoomName().
function redirectToRoomName(name)
{
    console.log(name);
    localStorage.setItem("roomName", name);
    window.location = "kwitterPage.html";
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
    window.location = "index.html";
}
