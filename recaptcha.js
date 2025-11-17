function fakeCheck() {
  const box = document.getElementById("fake-checkbox");

  if (!box.checked) {
    box.checked = true;

    // mimic Google reCAPTCHA delay
    setTimeout(() => {
      alert("✔ Verification complete (fake reCAPTCHA)");
      // call next level or game logic here
      console.log("Player can now continue to the next level!");
    }, 500);
  }
}
