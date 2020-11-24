
function userSignin(){
  window.open("login.html","_self");
}
function loadExams(){
  var resRef = firebase.database().ref('Results');
  resRef.on('child_added', function(data) {
    var examcode = data.key;
    var examname = data.child("Name").val();
    var pub = data.child('Public').val();
    var sel = document.getElementById('examtxt');
    var opt = document.createElement("option");
    opt.value = examcode;
    opt.innerHTML = examname;
    if(pub){
      sel.appendChild(opt);
    }
  });
  resRef.on('child_changed', function(data) {});
  resRef.on('child_removed', function(data) {});
}
function findResult(){
  var rollno = document.getElementById('rolltxt').value;
  var exam = document.getElementById('examtxt').value;
  if(exam==0){
    alert('Please Select Exam');
    return;
  }
  if(rollno.length==4 || rollno.length==5){
    url = 'marksheet.html?roll='+encodeURIComponent(rollno)+'&exam='+encodeURIComponent(exam);
    document.location.href = url;
  }else{
    alert("Please Check Your Roll No.");
  }
}
function initApp() {
  loadExams();
  document.getElementById('loginbtn').addEventListener('click', userSignin, false);
  document.getElementById('searchbtn').addEventListener('click', findResult, false);
}
window.onload = function() {
  initApp();
};
