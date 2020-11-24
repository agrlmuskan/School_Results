var s=0;
var username;
function userLogout(){
  firebase.auth().signOut();
  window.open("index.html","_self");
}
function getSubject(code){
  if(code==101){
    return "Physics";
  }else if(code==102){
    return "Chemistry";
  }else if(code==103){
    return "Biology";
  }else if(code==104){
    return "Maths";
  }else if(code==105){
    return "English";
  }else if(code==106){
    return "Computer";
  }else if(code==107){
    return "Physical";
  }else if(code==108){
    return "Science";
  }else if(code==109){
    return "Hindi";
  }else if(code==110){
    return "SSc";
  }else if(code==111){
    return "Accountancy";
  }else if(code==112){
    return "Business";
  }else if(code==113){
    return "Economics";
  }
}
function getClassName(clas){
  if(clas==91){
    return "9th Orange";
  }else if(clas==92){
    return "9th White";
  }else if(clas==93){
    return "9th Green";
  }else if(clas==101){
    return "9th Orange";
  }else if(clas==102){
    return "9th White";
  }else if(clas==103){
    return "9th Green";
  }else if(clas==111){
    return "9th Orange";
  }else if(clas==112){
    return "9th White";
  }else if(clas==113){
    return "9th Green";
  }else if(clas==121){
    return "9th Orange";
  }else if(clas==122){
    return "9th White";
  }else if(clas==123){
    return "9th Green";
  }
}
function updateMarks(exam, clss, subject, roll, marks,mm) {
  if(marks.length==0){
    return;
  }
  var x = 0;
  firebase.database().ref('Results/'+exam).on('value', function(snapshot) {
    x = snapshot.child(getSubject(subject)).val();
  });
  if(subject==101){
  firebase.database().ref('Exams/'+exam+'/'+clss+'/'+roll).update({
    Physics : marks+'/'+mm
  });
  firebase.database().ref('Results/'+exam).update({
    Physics : x+','+clss
  });
  }else if(subject==102){
  firebase.database().ref('Exams/'+exam+'/'+clss+'/'+roll).update({
    Chemistry : marks+'/'+mm
  });
  firebase.database().ref('Results/'+exam).update({
    Chemistry : x+','+clss
  });
  }else if(subject==103){
  firebase.database().ref('Exams/'+exam+'/'+clss+'/'+roll).update({
    Biology : marks+'/'+mm
  });
  firebase.database().ref('Results/'+exam).update({
    Biology : x+','+clss
  });
  }else if(subject==104){
  firebase.database().ref('Exams/'+exam+'/'+clss+'/'+roll).update({
    Maths : marks+'/'+mm
  });
  firebase.database().ref('Results/'+exam).update({
    Maths : x+','+clss
  });
  }else if(subject==105){
  firebase.database().ref('Exams/'+exam+'/'+clss+'/'+roll).update({
    English : marks+'/'+mm
  });
  firebase.database().ref('Results/'+exam).update({
    English : x+','+clss
  });
  }else if(subject==106){
  firebase.database().ref('Exams/'+exam+'/'+clss+'/'+roll).update({
    Computer : marks+'/'+mm
  });
  firebase.database().ref('Results/'+exam).update({
    Computer : x+','+clss
  });
  }else if(subject==107){
  firebase.database().ref('Exams/'+exam+'/'+clss+'/'+roll).update({
    Physical : marks+'/'+mm
  });
  firebase.database().ref('Results/'+exam).update({
    Physical : x+','+clss
  });
  }else if(subject==108){
  firebase.database().ref('Exams/'+exam+'/'+clss+'/'+roll).update({
    Science : marks+'/'+mm
    });
    firebase.database().ref('Results/'+exam).update({
    Science : x+','+clss
    });
  }else if(subject==109){
  firebase.database().ref('Exams/'+exam+'/'+clss+'/'+roll).update({
    Hindi : marks+'/'+mm
    });
    firebase.database().ref('Results/'+exam).update({
    Hindi : x+','+clss
    });
  }else if(subject==110){
  firebase.database().ref('Exams/'+exam+'/'+clss+'/'+roll).update({
    SSc : marks+'/'+mm
    });
    firebase.database().ref('Results/'+exam).update({
    SSc : x+','+clss
    });
  }else if(subject==111){
  firebase.database().ref('Exams/'+exam+'/'+clss+'/'+roll).update({
    Accountancy : marks+'/'+mm
    });
    firebase.database().ref('Results/'+exam).update({
    Accountancy : x+','+clss
    });
  }else if(subject==112){
  firebase.database().ref('Exams/'+exam+'/'+clss+'/'+roll).update({
    Business : marks+'/'+mm
    });
    firebase.database().ref('Results/'+exam).update({
    Business : x+','+clss
    });
  }else if(subject==113){
  firebase.database().ref('Exams/'+exam+'/'+clss+'/'+roll).update({
    Economics : marks+'/'+mm
    });
    firebase.database().ref('Results/'+exam).update({
    Economics : x+','+clss
    });
  }
}
function startEntry(){
  var exam = document.getElementById('examopt').value;
  var clas = document.getElementById('clas').value;
  var subject = document.getElementById('department').value;
  var maxm = document.getElementById('maxmarks').value;
  if(exam==0){
    alert("Please Select Exam");
    return;
  }else if(clas==0){
    alert("Please Select Class");
    return;
  }else if(subject==0){
    alert("Please Select Subject");
    return;
  }else if(maxm.length==0){
    alert("Please Enter Maximum Marks");
    return;
}
var i=0;
  for(i=1 ; i<=s;i++){
    updateMarks(exam, clas, subject,i,document.getElementById('roll'+i+'mark').value,maxm);
    document.getElementById('roll'+i+'mark').textContent = "Done";
  }
  var d = new Date();
  firebase.database().ref('Logs').push({
    Name : username,
    Class : getClassName(clas),
    Subject : getSubject(subject),
    Time : d.getHours()+":"+d.getMinutes(),
    Date : d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()
  });
  alert("Done");
}
function loadForm(){
  var entrycont = document.getElementById('entryfields');
  while (entrycont.hasChildNodes()) {
      entrycont.removeChild(entrycont.lastChild);
  }
  var clas = document.getElementById('clas').value;
  var myRef = firebase.database().ref('Class/'+clas);
  myRef.on('value', function(snapshot) {
    var strength = snapshot.child("Students").val();
    s=strength;
    var i=0;
    for(i=1;i<=strength;i++){
      var container = document.createElement("div");
      var field = document.createElement("input");
      field.type = 'text';
      field.id = 'roll'+i+'mark';
      var label = document.createElement("div");
      label.innerHTML = "Roll No. "+i+" Marks :- ";
      if(i<10){
        label.innerHTML = "Roll No. 0"+i+" Marks :- ";
      }
      label.style.display = 'inline';
      container.appendChild(label);
      container.appendChild(field);
      entrycont.appendChild(container);
    }
  });
}
function loadExams(){
  var resRef = firebase.database().ref('Results');
  resRef.on('child_added', function(data) {
    var examcode = data.key;
    var examname = data.child("Name").val();
    var sel = document.getElementById('examopt');
    var opt = document.createElement("option");
    opt.value = examcode;
    opt.innerHTML = examname;
    sel.appendChild(opt);
  });
  resRef.on('child_changed', function(data) {});
  resRef.on('child_removed', function(data) {});
}
function onClick(element,fun) {
  document.getElementById(element).addEventListener('click',fun,false);
}
function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      username = displayName;
      if(emailVerified){
        document.getElementById('userimg').title = displayName+'\n'+email;
        loadExams();
      }else{
         window.open("index.html","_self");
      }
    }else{
      window.open("index.html","_self");
    }
  });
  onClick('startbtn',startEntry);
}
window.onload = function() {
  initApp();
};
