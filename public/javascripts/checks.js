function validateForm() {
  console.log("Here");
  if (document.getElementById("username").value === "") {
    console.log("Username empty");
    document.getElementById("error-message").innerHTML =
      "Username cannot be blank";
    return false;
  }
  if (document.getElementById("password").value === "") {
    console.log("Password empty");
    document.querySelector(".error-message").innerHTML =
      "Password cannot be blank";
    return false;
  }
  return true;
}
