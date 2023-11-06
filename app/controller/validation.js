// Kiểm tra dữ liệu đã nhập hay chưa
function kiemTraRong(value, idCanhBao, mess) {
  if (value == "") {
    document.getElementById(idCanhBao).innerHTML = mess;
    document.getElementById(idCanhBao).style.display = "block";
    return false;
  } else {
    document.getElementById(idCanhBao).innerHTML = "";
    return true;
  }
}
// Kiểm tra định dạng chữ
function kiemTraChu(value, idCanhBao, mess) {
  var regexAlphabet = /^(?!.*[\d!@#$%^&*()_+={}\[\]:;"'<>,.?/~\\]).*$/;
  var isValid = regexAlphabet.test(value);
  if (isValid) {
    document.getElementById(idCanhBao).innerHTML = "";
    return true;
  }
  document.getElementById(idCanhBao).innerHTML = mess;
  document.getElementById(idCanhBao).style.display = "block";
  return false;
}
// Kiểm tra định dạng email
function kiemTraEmail(email, idCanhBao, mess) {
  var regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  var isValid = regexEmail.test(email);
  if (isValid) {
    document.getElementById(idCanhBao).innerHTML = "";
    return true;
  } else {
    document.getElementById(idCanhBao).innerHTML = mess;
    //?
    document.getElementById(idCanhBao).style.display = "block";
    return false;
  }
}
