// Initialize Firebase
var a;
var config = {
  apiKey: "AIzaSyA0816xskmsl83KMHC0Bj3AvN5G2QxtMZc",
  authDomain: "cloudrdev.firebaseapp.com",
  databaseURL: "https://cloudrdev.firebaseio.com",
  projectId: "cloudrdev",
  storageBucket: "cloudrdev.appspot.com",
  messagingSenderId: "667804694667"
};
firebase.initializeApp(config);
var emailTxt = document.getElementById('email');
var passwordTxt = document.getElementById('pw');
var loginBtn = document.getElementById('login');
var signUpBtn = document.getElementById('signup');
var logoutBtn = document.getElementById('logout');
var verifyBtn = document.getElementById('verify');

loginBtn.addEventListener('click', event => {
  var email = emailTxt.value;
  var password = passwordTxt.value;
  var auth = firebase.auth();

  var promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch(error => console.log(error.message));
});

signUpBtn.addEventListener('click', event => {
  var email = emailTxt.value;
  var password = passwordTxt.value;
  var auth = firebase.auth();

  var promise = auth.createUserWithEmailAndPassword(email, password);
  promise.catch(error => console.log(error.message));
});

logoutBtn.addEventListener('click', event => {
  firebase.auth().signOut();
});

verifyBtn.addEventListener('click', event => {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    console.log("Email sent.");
  }, error => console.log(error.message)
)});

firebase.auth().onAuthStateChanged(user => {
  if(user) {
    a = user;
    console.log(user);
    loginBtn.classList.add("hide");
    signUpBtn.classList.add("hide");
    emailTxt.classList.add("hide");
    passwordTxt.classList.add("hide");
    logoutBtn.classList.remove("hide");
    if(user.emailVerified) {
      verifyBtn.classList.add("hide");
    } else {
      verifyBtn.classList.remove("hide");
    }
  } else {
    console.log("Not logged in.");
    loginBtn.classList.remove("hide");
    signUpBtn.classList.remove("hide");
    emailTxt.classList.remove("hide");
    passwordTxt.classList.remove("hide");
    logoutBtn.classList.add("hide");
    verifyBtn.classList.add("hide");
  }
});
