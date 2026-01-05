import "../styles/register.css";


export function showLogin(app) {
  app.innerHTML = `
    <div class="app">
      <div class="register">
        <h1 class="register_title">Регистрация</h1>
        
        <input class="register_input" type="text" id="user-name" placeholder="Имя">
        <input class="register_input" id="user-phone" type="tel" value="+998 " placeholder="00 000-00-00">

        <p id="error-msg" style="color: red; font-size: 12px; margin-top: 5px; min-height: 15px;"></p>

        <button class="register_btn" id="registerBtn">
          Зарегистрироваться
        </button>

        <p class="reg-text">
          Продолжая, я соглашаюсь с 
          <a href="https://legal.uzum.uz/privacy-policy-uz.html">политикой обработки персональных данных</a> 
          и принимаю публичную акцию <a href="#">Uzum ID</a>.
          <br><br>
          <a href="#">Что такое Uzum ID?</a>
        </p>
      </div>
    </div>
  `;

  const nameInput = document.getElementById("user-name");
  const phoneInput = document.getElementById("user-phone");
  const registerBtn = document.getElementById("registerBtn");
  const errorDisplay = document.getElementById("error-msg");


  nameInput.addEventListener("input", (e) => {
    let val = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, ""); 
    if (val.length > 0) {
      val = val[0].toUpperCase() + val.slice(1);
    }
    e.target.value = val;
    errorDisplay.textContent = ""; 
  });


  phoneInput.addEventListener("input", (e) => {
    if (!e.target.value.startsWith("+998 ")) {
      e.target.value = "+998 ";
    }
    
    let digits = e.target.value.slice(5).replace(/\D/g, "");
    if (digits.length > 9) digits = digits.slice(0, 9);
    
    e.target.value = "+998 " + digits;
    errorDisplay.textContent = "";
  });

  
  registerBtn.addEventListener("click", () => {
    const nameVal = nameInput.value.trim();
    const phoneVal = phoneInput.value.trim();
    const phoneDigits = phoneVal.slice(5).replace(/\D/g, "");

    
    if (nameVal.length < 2) {
      errorDisplay.textContent = "Имя слишком короткое";
      return;
    }

    if (phoneDigits.length < 9) {
      errorDisplay.textContent = "Введите номер полностью (9 цифр)";
      return;
    }

    
localStorage.setItem("username", nameVal);
 localStorage.setItem("phone", phoneVal);
    
localStorage.setItem("access-token", "fake-token-123"); 
    
    
location.reload();
  });
}