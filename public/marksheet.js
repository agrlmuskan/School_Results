var rollno,exam;
function getGrade(marks,maxmarks){
  var x = parseInt(marks);
  var y = parseInt(maxmarks);
  var percent = parseInt(""+(x*100)/y);
  if((percent>90 || percent==90) && (percent<100||percent==100)){
    return 'A1';
  }else if((percent>80 || percent==80) && percent<90){
    return 'A2';
  }else if((percent>70 || percent==70) && percent<80){
    return 'B1';
  }else if((percent>60 || percent==60) && percent<70){
    return 'B2';
  }else if((percent>50 || percent==50) && percent<60){
    return 'C1';
  }else if((percent>40 || percent==40) && percent<50){
    return 'C2';
  }else if(percent<40 && percent>0){
    return 'F';
  }else{
    return '-';
  }
}
function getClass(examroll){
  if(examroll.substr(0,1)=="9"){
    return parseInt(examroll.substr(0, 2));
  }else{
    return parseInt(examroll.substr(0, 3));
  }
}
function getClassRoll(examroll){
  if(examroll.substr(0,1)=="9"){
    return parseInt(examroll.substr(2,2));
  }else{
    return parseInt(examroll.substr(3,2));
  }
}
function findResult(){
  var clas = getClass(rollno);
  var clasroll = getClassRoll(rollno);
  var table = document.getElementById("restbl");
  var nrows = table.rows.length;
  firebase.database().ref('Results/'+examno).on('value',function(data){
    var name = data.child('Name').val();
    document.getElementById('enametxt').textContent = name;
  });
  if(nrows!=1){
    clearTable();
  }else{
    var clasrollStr = "";
    if(clasroll<10){
      clasrollStr = "0"+clasroll;
    }else{
      clasrollStr = ""+clasroll;
    }
  var commentsRef = firebase.database().ref('Exams/'+examno+'/'+clas+'/'+clasrollStr);
  commentsRef.on('child_added', function(data) {
    var row = document.createElement("tr");
    var subdata = document.createElement("td");
    var msdata = document.createElement("td");
    var mmdata = document.createElement("td");
    var gddata = document.createElement("td");
    var subject = document.createTextNode(""+data.key);
    var om = (""+data.val()).split("/")[0];
    var mm = (""+data.val()).split("/")[1];
    var mark = document.createTextNode(om);
    var maxmark = document.createTextNode(mm);
    var grade = document.createTextNode(""+getGrade(""+data.val(),mm));
    subdata.appendChild(subject);
    msdata.appendChild(mark);
    mmdata.appendChild(maxmark);
    gddata.appendChild(grade);
    row.appendChild(subdata);
    row.appendChild(msdata);
    row.appendChild(mmdata);
    row.appendChild(gddata);
    table.appendChild(row);
  });
  commentsRef.on('child_changed', function(data) {});
  commentsRef.on('child_removed', function(data) {});
  }
}
function displayDetails(){
  var clas = getClass(rollno);
  var clasroll = getClassRoll(rollno);
  var rollRef = firebase.database().ref('Students/'+clas+'/'+clasroll);
  if(clas==91 || clas==92 || clas==93){
    rollRef = firebase.database().ref('Students/'+clas+'/0'+clasroll);
  }
  rollRef.on('value', function(snapshot) {
      if (snapshot.exists()){
        var name = snapshot.child("Name").val();
        var fname = snapshot.child("FName").val();
        var dob = snapshot.child("DOB").val();
        document.getElementById('canroll').textContent = rollno;
        document.getElementById('canname').textContent = name;
        document.getElementById('canfname').textContent = fname;
        document.getElementById('candob').textContent = dob;
        findResult();
      }else{
        alert ("Please check your Roll Number");
      }
  });
}
function clearTable(){
  var elmtTable = document.getElementById('restbl');
  var tableRows = elmtTable.getElementsByTagName('tr');
  var rowCount = tableRows.length;
  for (var x=rowCount-1; x>0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }
  findResult();
}
function goBack(){
  window.open("index.html","_self")
}
function initApp() {
  var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    rollno = data.roll;
    examno = data.exam;
    displayDetails();
    document.getElementById('backbtn').addEventListener('click', goBack, false);
}
window.onload = function() {
  initApp();
};
