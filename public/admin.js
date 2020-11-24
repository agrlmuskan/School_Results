var s=0;
function userLogout(){
  firebase.auth().signOut();
  window.open("index.html","_self");
}
function addExam(){
  var examcode = document.getElementById('ecodetxt').value;
  var examname = document.getElementById('enametxt').value;
  var ref = firebase.database().ref('Results/'+examcode);
  var classtring='';
  var cbs = document.getElementsByClassName('clasexam');
  for(var i=0; cbs[i]; ++i){
      if(cbs[i].checked){
           classtring += (cbs[i].value+',');
      }
    }
  ref.update({
    Name : examname,
    Public : false,
    Physics : '0',
    Chemistry : '0',
    Biology : '0',
    Maths : '0',
    English : '0',
    Computer : '0',
    Physical : '0',
    Science : '0',
    Hindi : '0',
    SSc : '0',
    Accountancy : '0',
    Business : '0',
    Economics : '0',
    Classes : classtring
  }).then(function(){
    document.getElementById('mes1txt').textContent = "Exam Added Successfully!!!";
  });
}
function listRemoveExam(){
  var list = document.getElementById('examlist');
  var resRef = firebase.database().ref('Results');
  resRef.on('child_added', function(data) {
    var examcode = data.key;
    var examname = data.child("Name").val();
    var exampub = "Not Published";
    if(data.child('Public').val()){
      exampub = "Published";
    }
    var ecb = document.createElement('input');
    var nextline = document.createElement('br');
    var cbdata = document.createTextNode(examname+' ('+exampub+')');
    ecb.type = "radio";
    ecb.name = "remexams";
    ecb.value = examcode;
    ecb.id = 're'+examcode;
    if(document.getElementById('re'+examcode)==null){
      list.appendChild(ecb);
      list.appendChild(cbdata);
      list.appendChild(nextline);
    }
  });
  resRef.on('child_changed', function(data) {listRemoveExam();});
  resRef.on('child_removed', function(data) {listRemoveExam();});
}
function delExam(){
  var cb = document.querySelector('input[name = "remexams"]:checked').value;
  firebase.database().ref('Results/'+cb).remove().then(function(){
  document.getElementById('mes2txt').textContent = 'Exam Deleted Successfully!!!';
  });
  firebase.database().ref('Exams/'+cb).remove().then(function(){
  document.getElementById('mes2txt').textContent = 'Exam Record Cleared!!!';
  });
}
function tor(snapshot,subject,clas){
  if(clas==9 || clas==10){
    if(subject=='Physical'){
      return "-";
    }else if(snapshot.child(subject).val().includes(clas+'1')
    && snapshot.child(subject).val().includes(clas+'2')
    && snapshot.child(subject).val().includes(clas+'3')){
      return "✔";
    }else{
      return "x";
    }
  }else if(clas==11 || clas==12){
    if(subject=='Hindi' || subject=='SSc' || subject=='Science'){
      return "-";
    }else if(subject=='English' || subject=='Computer' || subject=='Physical'){
      if(snapshot.child(subject).val().includes(clas+'1')
      && snapshot.child(subject).val().includes(clas+'2')
      && snapshot.child(subject).val().includes(clas+'3')){
        return "✔";
      }else{
        return "x";
      }
    }else if(subject=='Physics' || subject=='Chemistry'){
      if(snapshot.child(subject).val().includes(clas+'1')
      && snapshot.child(subject).val().includes(clas+'2')){
        return "✔";
      }else{
        return "x";
      }
    }else if(subject=='Maths'){
      if(snapshot.child(subject).val().includes(clas+'1')){
        return "✔";
      }else{
        return "x";
      }
    }else if(subject=='Biology'){
      if(snapshot.child(subject).val().includes(clas+'2')){
        return "✔";
      }else{
        return "x";
      }
    }else if(subject=='Accountancy' || subject=='Business' || subject=='Economics'){
      if(snapshot.child(subject).val().includes(clas+'3')){
        return "✔";
      }else{
        return "x";
      }
    }else{
      return "x";
    }
  }
}
function noofclas(snapshot){
  var no = 0;
  if(snapshot.includes('9')){
    no++;
  }
  if(snapshot.includes('10')){
    no++;
  }
  if(snapshot.includes('11')){
    no++;
  }
  if(snapshot.includes('12')){
    no++;
  }
  return no;
}
function addRow(snapshot,firstrow,clas){
  var row = document.createElement('tr');
  var ecode = snapshot.key;
  var ename = snapshot.child('Name').val();
  var ispub = "Not Published";
  if(snapshot.child('Public').val()){
    ispub = "Published";
  }
  if(firstrow){
  var cb = document.createElement('td');
  var checkbox = document.createElement('input');
  checkbox.type = "radio";
  checkbox.name = "pubexams";
  checkbox.value = ecode;
  checkbox.id = 'pe'+ecode;
  cb.rowSpan = ''+noofclas(snapshot.child('Classes').val());
  cb.appendChild(checkbox);
  row.appendChild(cb);
  var ec = document.createElement('td');
  ec.rowSpan = ''+noofclas(snapshot.child('Classes').val());
  ec.appendChild(document.createTextNode(ecode));
  row.appendChild(ec);
  var en = document.createElement('td');
  en.rowSpan = ''+noofclas(snapshot.child('Classes').val());
  en.appendChild(document.createTextNode(ename));
  row.appendChild(en);
  var pb = document.createElement('td');
  pb.rowSpan = ''+noofclas(snapshot.child('Classes').val());
  pb.appendChild(document.createTextNode(ispub));
  row.appendChild(pb);
  }
  var ac = document.createElement('td');
  ac.appendChild(document.createTextNode(clas));
  row.appendChild(ac);
  if(clas==11||clas==12){
  var pr = document.createElement('td');
  pr.appendChild(document.createTextNode(tor(snapshot,'Physics',clas)));
  row.appendChild(pr);
  var cr = document.createElement('td');
  cr.appendChild(document.createTextNode(tor(snapshot,'Chemistry',clas)));
  row.appendChild(cr);
  var br = document.createElement('td');
  br.appendChild(document.createTextNode(tor(snapshot,'Biology',clas)));
  row.appendChild(br);
  }else if(clas==9||clas==10){
  var sci = document.createElement('td');
  sci.colSpan = "3";
  sci.appendChild(document.createTextNode(tor(snapshot,'Science',clas)));
  row.appendChild(sci);
  }
  var mr = document.createElement('td');
  mr.appendChild(document.createTextNode(tor(snapshot,'Maths',clas)));
  row.appendChild(mr);
  var er = document.createElement('td');
  er.appendChild(document.createTextNode(tor(snapshot,'English',clas)));
  row.appendChild(er);
  var csr = document.createElement('td');
  csr.appendChild(document.createTextNode(tor(snapshot,'Computer',clas)));
  row.appendChild(csr);
  var per = document.createElement('td');
  per.appendChild(document.createTextNode(tor(snapshot,'Physical',clas)));
  row.appendChild(per);
  var hr = document.createElement('td');
  hr.appendChild(document.createTextNode(tor(snapshot,'Hindi',clas)));
  row.appendChild(hr);
  var ssr = document.createElement('td')
  ssr.appendChild(document.createTextNode(tor(snapshot,'SSc',clas)));
  row.appendChild(ssr);
  var tbl = document.getElementById('examtbl');
  tbl.appendChild(row);
}
function listPublishExam(){
  var tbl = document.getElementById('examtbl');
  var resRef = firebase.database().ref('Results');
  resRef.on('child_added', function(data) {
    var ecode = data.key;
    var ename = data.child('Name').val();
    var isepub = data.child('Public').val();
    var eclasses = data.child('Classes').val();
    if(document.getElementById('pe'+ecode)==null){
    if(eclasses.startsWith('9')){
      addRow(data,true,9);
      if(eclasses.includes('10')){
        addRow(data,false,10);
      }
      if(eclasses.includes('11')){
        addRow(data,false,11);
      }
      if(eclasses.includes('12')){
        addRow(data,false,12);
      }
    }else if(eclasses.startsWith('10')){
      addRow(data,true,10);
      if(eclasses.includes('11')){
        addRow(data,false,11);
      }
      if(eclasses.includes('12')){
        addRow(data,false,12);
      }
    }else if(eclasses.startsWith('11')){
      addRow(data,true,11);
      if(eclasses.includes('12')){
        addRow(data,false,12);
      }
    }else if(eclasses.startsWith('12')){
      addRow(data,true,12);
    }
  }
  });
  resRef.on('child_changed', function(data) {listPublishExam();});
  resRef.on('child_removed', function(data) {listPublishExam();});
}
function publishExam(){
  var ecode = document.querySelector('input[name = "pubexams"]:checked').value;
  firebase.database().ref('Results/'+ecode).update({
    Public : true
  });
}
function updateCD(){
  var clas = document.getElementById('aucdclastxt').value;
  var num = document.getElementById('nostxt').value;
  if(clas==0){
    alert("Please Select Class");
  }
  firebase.database().ref('Class/'+clas).update({
    Students : num
  }).then(function(){
    alert("Details Updated Successfully!!!");
  });
}
function loadSDForm(){
  var entrycont = document.getElementById('entryfields');
  while (entrycont.hasChildNodes()) {
      entrycont.removeChild(entrycont.lastChild);
  }
  var clas = document.getElementById('sdclastxt').value;
  var myRef = firebase.database().ref('Class/'+clas);
  myRef.on('value', function(snapshot) {
    var strength = snapshot.child("Students").val();
    s=strength;
    var i=0;
    for(i=1;i<=strength;i++){
      var container = document.createElement("div");
      var field1 = document.createElement("input");
      field1.type = 'text';
      field1.id = 'r'+i+'name';
      field1.style.display = 'inline';
      field1.placeholder = 'Name';
      var field2 = document.createElement("input");
      field2.type = 'text';
      field2.id = 'r'+i+'fname';
      field2.style.display = 'inline';
      field2.placeholder = 'Father\'s Name';
      var field3 = document.createElement("input");
      field3.type = 'text';
      field3.id = 'r'+i+'dob';
      field3.style.display = 'inline';
      field3.placeholder = 'Date of Birth';
      var field4 = document.createElement("input");
      field4.type = 'text';
      field4.id = 'r'+i+'email';
      field4.style.display = 'inline';
      field4.placeholder = 'Email';
      var label = document.createElement("div");
      label.innerHTML = "Roll No. "+i+" :- ";
      if(i<10){
        label.innerHTML = "Roll No. 0"+i+" :- ";
      }
      label.style.display = 'inline';
      container.appendChild(label);
      container.appendChild(field1);
      container.appendChild(field2);
      container.appendChild(field3);
      container.appendChild(field4);
      entrycont.appendChild(container);
    }
  });
}
function updateSD(){
  var clas = document.getElementById('sdclastxt').value;
  var myRef = firebase.database().ref('Class/'+clas);
    for(i=1;i<=s;i++){
      var name = document.getElementById('r'+i+'name').value;
      var fname = document.getElementById('r'+i+'fname').value;
      var db = document.getElementById('r'+i+'dob').value;
      var email = document.getElementById('r'+i+'email').value;
      if(name.length!=0){
      if(i<10){
        firebase.database().ref('Students/'+clas+'/0'+i).update({
          Name : name,
          FName : fname,
          Email : email,
          DOB : db
        });
      }else{
        firebase.database().ref('Students/'+clas+'/'+i).update({
          Name : name,
          FName : fname,
          Email : email,
          DOB : db
        });
      }
    }
    }
    alert("Details Updated!!!");
}
function createAccount(){
  var email = document.getElementById('emailtxt').value;
  var password = document.getElementById('pswdtxt').value;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);
  // ...
});
}
function loadLog(){
  document.getElementById('arecont').hidden = true;
  document.getElementById('prcont').hidden = true;
  document.getElementById('aucdcont').hidden = true;
  document.getElementById('ausdcont').hidden = true;
  document.getElementById('addtcont').hidden = true;
  document.getElementById('logcont').hidden = false;
  firebase.database().ref("Logs").on('child_added',function(snapshot){
    var cont = document.getElementById('logtbl');
    var tr = cont.insertRow(1);
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    td2.align = 'left';
    var dt = document.createTextNode(snapshot.child('Date').val()+" "+snapshot.child('Time').val()+" : ");
    var log = document.createTextNode(snapshot.child('Name').val()+" Uploaded "+snapshot.child('Subject').val()+" result of Class "+snapshot.child('Class').val());
    td1.appendChild(dt);
    td2.appendChild(log);
    tr.appendChild(td1);
    tr.appendChild(td2);
  });
}
function openarec(){
  document.getElementById('arecont').hidden = false;
  document.getElementById('prcont').hidden = true;
  document.getElementById('aucdcont').hidden = true;
  document.getElementById('ausdcont').hidden = true;
  document.getElementById('addtcont').hidden = true;
  document.getElementById('logcont').hidden = true;
  cwindow=1;
  listRemoveExam();
}
function openprc(){
  document.getElementById('arecont').hidden = true;
  document.getElementById('prcont').hidden = false;
  document.getElementById('aucdcont').hidden = true;
  document.getElementById('ausdcont').hidden = true;
  document.getElementById('addtcont').hidden = true;
  document.getElementById('logcont').hidden = true;
  cwindow=2;
  listPublishExam();
}
function openaucdc(){
  document.getElementById('arecont').hidden = true;
  document.getElementById('prcont').hidden = true;
  document.getElementById('aucdcont').hidden = false;
  document.getElementById('ausdcont').hidden = true;
  document.getElementById('addtcont').hidden = true;
  document.getElementById('logcont').hidden = true;
  cwindow=3;
}
function openausdc(){
  document.getElementById('arecont').hidden = true;
  document.getElementById('prcont').hidden = true;
  document.getElementById('aucdcont').hidden = true;
  document.getElementById('ausdcont').hidden = false;
  document.getElementById('addtcont').hidden = true;
  document.getElementById('logcont').hidden = true;
  cwindow=4;
}
function addtc(){
  document.getElementById('arecont').hidden = true;
  document.getElementById('prcont').hidden = true;
  document.getElementById('aucdcont').hidden = true;
  document.getElementById('ausdcont').hidden = true;
  document.getElementById('addtcont').hidden = false;
  document.getElementById('logcont').hidden = true;
  cwindow=5;
}
function setupListeners() {
  document.getElementById('logoutbtn').addEventListener('click', userLogout, false);
  document.getElementById('dashbtn').addEventListener('click',
  function(){window.open("dashboard.html","_self");}, false);
  document.getElementById('arebtn').addEventListener('click', openarec, false);
  document.getElementById('addbtn').addEventListener('click', addExam, false);
  document.getElementById('delbtn').addEventListener('click', delExam, false);
  document.getElementById('prbtn').addEventListener('click', openprc, false);
  document.getElementById('dopubbtn').addEventListener('click', publishExam, false);
  document.getElementById('aucdbtn').addEventListener('click', openaucdc, false);
  document.getElementById('cdupdatebtn').addEventListener('click', updateCD, false);
  document.getElementById('ausdbtn').addEventListener('click', openausdc, false);
  document.getElementById('sdupdatebtn').addEventListener('click', updateSD, false);
  document.getElementById('addtbtn').addEventListener('click', addtc, false);
  document.getElementById('ctabtn').addEventListener('click', createAccount, false);
  document.getElementById('logbtn').addEventListener('click', loadLog, false);
}
function initApp() {
  document.getElementById('modal').style.display = 'block';
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      var img = document.getElementById('userimg');
      img.hidden = false;
      img.title = displayName+'\n'+email;
      firebase.database().ref('Admin').once('value', function(snapshot){
        document.getElementById('modal').style.display = 'none';
        if (snapshot.child(uid).exists()){
          setupListeners();
        }
      }).catch(function() {
        window.open("dashboard.html","_self");
      });
      if(!emailVerified){
        window.open("index.html","_self");
      }
    }else{
      window.open("index.html","_self");
    }
  });
}
window.onload = function() {
  initApp();
};
