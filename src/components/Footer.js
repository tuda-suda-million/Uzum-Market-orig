import "../styles/footer.css"
export function renderFooter() {
    return `
        <footer class="main-footer">
            <div class="footer-container">
                <div class="footer-top">
                    <div class="footer-column">
                        <h3>О нас</h3>
                        <ul>
                            <li><a href="#">Пункты выдачи</a></li>
                            <li><a href="#">Вакансии</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Пользователям</h3>
                        <ul>
                            <li><a href="#">Связаться с нами</a></li>
                            <li><a href="#">Вопрос - Ответ</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Для предпринимателей</h3>
                        <ul>
                            <li><a href="#">Продавайте на Uzum</a></li>
                            <li><a href="#">Вход для продавцов</a></li>
                            <li><a href="#">Открыть пункт выдачи</a></li>
                        </ul>
                    </div>
                    <div class="footer-column footer-apps">
                        <h3>Скачать приложение</h3>
                        <div class="app-links">
                            <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="AppStore"></a>
                            <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="GooglePlay"></a>
                        </div>
                        <h3>Uzum в соцсетях</h3>
                        <div class="social-links">
                            <a href="#"><img class="social-icon" src="./icons/telegram.jpg" alt="Telegram"></a>
                            <a href="#"><img class="social-icon" src="./icons/instagram.avif" alt="Instagram"></a>
                            <a href="#"><img class="social-icon" src="./icons/facebook.jpg" alt="Facebook"></a>
                            <a href="#"><img class="social-icon" src="./icons/youtube.png" alt="Youtube"></a>
                        </div>
                    </div>
                </div>
                <hr class="footer-divider">
                <div class="footer-bottom">
                    <div class="legal-links">
                        <a href="#">Соглашение о конфиденциальности</a>
                        <a href="#">Пользовательское соглашение</a>
                        <a href="#">Положение по обработке персональных данных</a>
                    </div>
                    <p class="copyright">«2026© ООО «UZUM MARKET». ИНН 309376127. Все права защищены»</p>
                </div>
            </div>
        </footer>
    `;
}