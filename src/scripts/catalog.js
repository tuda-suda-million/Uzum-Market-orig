import "../styles/catalog.css";
import { showHome } from "./home.js";


const categoryNames = {
    "furniture": "Мебель",
    "PC": "Компьютеры",
    "audio": "Аудио",
    "TV": "Телевизоры",
    "kitchen": "Кухоныые аксессуары"
};

export function initCatalog() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('#catalog-trigger');
        const menu = document.getElementById('catalog-menu');

        if (btn) {
            if (menu) {
                menu.classList.toggle('active');
            } else {
                fetchDataAndRender();
            }
        } else if (menu && !menu.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
}

async function fetchDataAndRender() {
    try {
        const res = await fetch('/backend/db.json');
        if (!res.ok) throw new Error("Файл не найден");
        
        const data = await res.json();
        
        const goods = data.goods; 

        const counts = goods.reduce((acc, item) => {
            const type = item.type || "other";
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});

        renderCatalogUI(counts);
        document.getElementById('catalog-menu').classList.add('active');
    } catch (err) {
        console.error("Ошибка каталога:", err);
    }
}

function renderCatalogUI(counts) {
    let menu = document.getElementById('catalog-menu');
    if (!menu) {
        menu = document.createElement('div');
        menu.id = 'catalog-menu';
        menu.className = 'catalog-overlay';
        document.body.appendChild(menu);
    }

    const types = Object.keys(counts);

    menu.innerHTML = `
        <div class="container">
            <p class="catalog-subtitle">Категории товаров</p>
            <div class="category-list">
                ${types.map(type => `
                    <div class="category-item" data-category="${type}">
                        ${categoryNames[type] || type} 
                        <span class="category-badge">${counts[type]}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    
    menu.querySelectorAll('.category-item').forEach(item => {
        item.onclick = () => {
            const selectedType = item.getAttribute('data-category');
            menu.classList.remove('active');
            showHome(document.getElementById('app'), selectedType);
        };
    });
}