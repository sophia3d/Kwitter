//LINKS FIREBASE
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
  userName = localStorage.getItem("userName");
  roomName = localStorage.getItem("roomName");
  function send()
  {
      msg = document.getElementById("msg").value;
      firebase.database().ref(roomName).push({
            name:userName,
            message:msg,
            like:0 
      });
      document.getElementById("msg").value = "";
  }
function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;
//Início do código
console.log(firebaseMessageId);
console.log(messageData);

name = messageData['name'];
message = messageData['message'];
like = messageData['like'];

nameWithTag = "<h4>"+ name +"<img class='user_tick' src='tick.png'></h4>";
messageWithTag = "<h4 class='message_h4'>" + message+"</h4>";

like_button ="<button class='btn btn-warning' id="+firebaseMessageId+
" value="+like+" onclick='updateLike(this.id)'>";
spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+
"</span></button><hr>";

row = nameWithTag + messageWithTag + like_button + spanWithTag;

document.getElementById("output").innerHTML += row;

//Fim do código
      } });  }); }
getData();

function updateLike(menssageId)
{
buttonId = menssageId;
likes = document.getElementById(buttonId).value;
updateLIke = Number(likes) + 1;
firebase.database().ref(roomName).child(menssageId).update({
      like : updateLIke
});
}
function logout() {
      localStorage.removeItem("userName");
      localStorage.removeItem("roomName");
          window.location = "index.html";
      }