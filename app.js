// Глобальные переменные
let currentPage = 'home';
let currentCategory = '';
let cart = [];
let isAdminLoggedIn = false;
let menuData = {};

// Данные для входа в админ-панель
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'kaif2024'
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadMenuData();
    updateCartDisplay();
    // Проверка URL для админ-панели
    checkAdminAccess();
    // Обработка изменений в URL
    window.addEventListener('hashchange', checkAdminAccess);
});

function checkAdminAccess() {
    if (window.location.hash === '#admin' || window.location.pathname.includes('/admin')) {
        showAdminPage();
    }
}

// Функция для прямого доступа к админ-панели (можно вызвать из консоли браузера)
window.openAdmin = function() {
    window.location.hash = 'admin';
    showAdminPage();
};

// Загрузка данных меню
function loadMenuData() {
    // Проверяем, есть ли сохраненные данные в localStorage
    const savedData = localStorage.getItem('kaif_menu_data');
    if (savedData) {
        try {
            menuData = JSON.parse(savedData);
        } catch (e) {
            console.error('Ошибка загрузки сохраненных данных:', e);
            loadDefaultMenuData();
        }
    } else {
        loadDefaultMenuData();
    }
}

function loadDefaultMenuData() {
    // Данные меню встроены в код
    menuData = {
        "drinks": {
            "name": "Напитки",
            "items": {
                "dr_pepper": {"name": "Dr Pepper", "price": 250, "available": true},
                "fanta": {"name": "Fanta original", "price": 230, "available": true},
                "coca_cola": {"name": "Coca cola original", "price": 230, "available": true},
                "coca_cola_glass": {"name": "Coca cola original glass", "price": 300, "available": true},
                "sprite": {"name": "Sprite original", "price": 230, "available": true},
                "mountain_dew": {"name": "Mountain Dew", "price": 230, "available": true},
                "juice": {"name": "Сок", "price": 250, "available": true},
                "tonic_lemon": {"name": "Тоник лимон", "price": 230, "available": true},
                "home_lemonade": {"name": "Домашний лимонад", "price": "290/470", "available": true},
                "tea_berries": {"name": "Чай в чайнике (черные, фруктовые, зелёные, улун)", "price": 270, "available": true},
                "chinese_tea": {"name": "Китайский чай (пуэр, габа, да хун пао)", "price": 490, "available": true},
                "cherry_bubble": {"name": "Вишневый пузырь", "price": 490, "available": true},
                "sea_buckthorn": {"name": "Облепиховый", "price": 490, "available": true}
            }
        },
        "coffee": {
            "name": "Кофе",
            "items": {
                "espresso": {"name": "Эспрессо", "price": 150, "available": true},
                "americano": {"name": "Американо", "price": 180, "available": true},
                "cappuccino": {"name": "Капучино", "price": 220, "available": true},
                "author_coffee": {"name": "Авторское кофе", "price": 300, "available": true}
            }
        },
        "hookah": {
            "name": "Кальян",
            "items": {
                "standard": {"name": "Стандарт (Starline, Darkside, Sebero, Blackburn, Overdose, Deus, Element, Haw, Duft, Сарма)", "price": 1000, "available": true},
                "premium": {"name": "Premium (Tgismund, Drugna, Bonch)", "price": 1500, "available": true},
                "fruit_hookah": {"name": "Авторские на фруктах", "price": 1900, "available": true}
            }
        },
        "salads": {
            "name": "Салаты",
            "items": {
                "caesar_chicken": {"name": "Цезарь с курицей", "price": 460, "available": true},
                "caesar_shrimp": {"name": "Цезарь с креветками", "price": 520, "available": true},
                "liver_orange": {"name": "Салат с печенью и апельсином", "price": 450, "available": true},
                "yan_mamun": {"name": "Ян Мамун (с креветками, манго, орешками кешью)", "price": 590, "available": true},
                "vegetable_avocado": {"name": "Овощной салат с авокадо и виноградом", "price": 430, "available": true}
            }
        },
        "soups": {
            "name": "Супы",
            "items": {
                "chicken": {"name": "Куриный", "price": 390, "available": true},
                "mushroom_champignon": {"name": "Суп пюре из шампиньонов", "price": 480, "available": true},
                "tom_yam": {"name": "Том Ям с морепродуктами", "price": 540, "available": true},
                "miso_truffle": {"name": "Мисо суп с форелью", "price": 460, "available": true}
            }
        },
        "hot_dishes": {
            "name": "Горячее",
            "items": {
                "fried_cheese": {"name": "Жаркое в горшочке", "price": 460, "available": true},
                "pork_ribs": {"name": "Рёбра свиные (от 700гр.)", "price": "100 (100гр)", "available": true},
                "chicken_skewers": {"name": "Куриные шашлычки с овощами 3 шпажки", "price": 410, "available": true},
                "sausages_potato": {"name": "Колбаски с запеченным картофелем и разносолом", "price": 530, "available": true},
                "handmade_dumplings": {"name": "Пельмени ручной лепки запеченные/отварные", "price": 530, "available": true},
                "roasted_breast": {"name": "Запеченная грудка с запеченным картофелем", "price": 510, "available": true},
                "burger_fri": {"name": "Бургер-фри", "price": 490, "available": true},
                "hotdog": {"name": "Хот-дог свинина/куриный", "price": 420, "available": true}
            }
        },
        "pasta": {
            "name": "Паста",
            "items": {
                "carbonara_bacon": {"name": "Карбонара с беконом", "price": 420, "available": true},
                "pasta_shrimp": {"name": "Паста с креветками и сыром дор блю", "price": 520, "available": true},
                "udon_chicken": {"name": "Удон(рисовая, гречневая, пшеничная) с курицей", "price": 420, "available": true}
            }
        },
        "rolls": {
            "name": "Роллы",
            "items": {
                "philadelphia_avocado": {"name": "Филадельфия с авокадо/огурцом", "price": "480/460", "available": true},
                "california_avocado": {"name": "Калифорния с авокадо/огурцом", "price": "470/450", "available": true},
                "bonito": {"name": "Бонито", "price": 480, "available": true}
            }
        },
        "pizza": {
            "name": "Пицца",
            "items": {
                "pizza_assorted": {"name": "Пицца (в ассортименте)", "price": 500, "available": true}
            }
        },
        "appetizers": {
            "name": "Закуски",
            "items": {
                "bruschetta_tuna": {"name": "Брускета с тунцом", "price": 560, "available": true},
                "garlic_croutons": {"name": "Гренки чесночные", "price": 230, "available": true},
                "french_fries": {"name": "Картофель фри/по деревенски с соусом", "price": 250, "available": true},
                "nuggets": {"name": "Наггетсы", "price": 400, "available": true},
                "strips": {"name": "Стрипсы", "price": 430, "available": true},
                "fried_cheese_sticks": {"name": "Сыр жареный", "price": 450, "available": true},
                "chicken_wings": {"name": "Крылья куриные барбекю / острые", "price": 410, "available": true},
                "tempura_shrimp": {"name": "Креветки темпура", "price": 560, "available": true},
                "chili_shrimp": {"name": "Креветки в соусе чили", "price": 530, "available": true},
                "bacon_croutons": {"name": "Сало с гренками", "price": 390, "available": true}
            }
        },
        "sets": {
            "name": "Сеты",
            "items": {
                "set1": {"name": "№1 - гренки, фри, крылья, колбаски, стрипсы, чипсы начос", "price": 790, "available": true},
                "set2": {"name": "№2 - гренки, луковые кольца, картофель по деревенски, сыр жареный, наггетсы, сыр косичка", "price": 890, "available": true},
                "set3": {"name": "№3 - колбаски, наггетсы, стрипсы, крылья, чипсы начос", "price": 1090, "available": true}
            }
        },
        "fruits": {
            "name": "Фрукты",
            "items": {
                "grapes": {"name": "Виноград", "price": "100", "available": true},
                "lemon": {"name": "Лимон", "price": "100", "available": true},
                "orange": {"name": "Апельсин", "price": "100", "available": true},
                "mango": {"name": "Манго", "price": "150", "available": true}
            }
        },
        "sauces": {
            "name": "Соусы",
            "items": {
                "cheese": {"name": "Сырный", "price": 50, "available": true},
                "barbecue": {"name": "Барбекю", "price": 50, "available": true},
                "sweet_sour": {"name": "Кисло-сладкий", "price": 50, "available": true},
                "cream_garlic": {"name": "Сливочно-чесночный", "price": 50, "available": true},
                "burger": {"name": "Бургер", "price": 50, "available": true},
                "ketchup": {"name": "Кетчуп", "price": 50, "available": true},
                "curry": {"name": "Карри", "price": 50, "available": true},
                "mustard": {"name": "Горчичный", "price": 50, "available": true}
            }
        },
        "snacks": {
            "name": "Снеки",
            "items": {
                "chips_lays": {"name": "Чипсы lays в ассортименте", "price": 250, "available": true},
                "chips_cheetos": {"name": "Чипсы cheetos в ассортименте", "price": 200, "available": true},
                "pistachio": {"name": "Фисташки", "price": 400, "available": true},
                "chicken_jerky": {"name": "Джерки куриные", "price": 200, "available": true},
                "beef_jerky": {"name": "Джерки говядина", "price": 250, "available": true}
            }
        }
    };

    // Сохраняем данные по умолчанию
    saveMenuData();
}

// Сохранение данных меню в localStorage
function saveMenuData() {
    try {
        localStorage.setItem('kaif_menu_data', JSON.stringify(menuData));
        console.log('Данные меню сохранены');
    } catch (e) {
        console.error('Ошибка сохранения данных:', e);
        alert('Ошибка сохранения данных. Проверьте настройки браузера.');
    }
}

// Навигация между страницами
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    currentPage = pageId;
}

function openMenu() {
    window.location.hash = '';
    showPage('menu-page');
    renderCategories();
    if (Object.keys(menuData).length > 0) {
        showCategory(Object.keys(menuData)[0]);
    }
}

function goHome() {
    window.location.hash = '';
    showPage('home-page');
    currentCategory = '';
}

function showAdminPage() {
    showPage('admin-page');
    if (isAdminLoggedIn) {
        showAdminPanel();
    } else {
        showAdminLogin();
    }
}

// АДМИН-ПАНЕЛЬ

// Показ формы входа в админ-панель
function showAdminLogin() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = \`
        <div class="admin-login">
            <h2>Вход в админ-панель</h2>
            <form onsubmit="adminLogin(event)">
                <div class="form-group">
                    <label for="admin-username">Логин:</label>
                    <input type="text" id="admin-username" required>
                </div>
                <div class="form-group">
                    <label for="admin-password">Пароль:</label>
                    <input type="password" id="admin-password" required>
                </div>
                <button type="submit" class="btn-primary">Войти</button>
                <div id="admin-error" class="error-message" style="display: none;"></div>
            </form>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">
                Логин: admin<br>
                Пароль: kaif2024
            </p>
        </div>
    \`;
}

// Авторизация в админ-панель
function adminLogin(event) {
    event.preventDefault();

    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    const errorDiv = document.getElementById('admin-error');

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        isAdminLoggedIn = true;
        showAdminPanel();
    } else {
        errorDiv.textContent = 'Неверный логин или пароль';
        errorDiv.style.display = 'block';

        // Скрыть ошибку через 3 секунды
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }
}

// Выход из админ-панели
function adminLogout() {
    isAdminLoggedIn = false;
    showAdminLogin();
}

// Показ админ-панели
function showAdminPanel() {
    const adminContent = document.getElementById('admin-content');

    let html = \`
        <div class="admin-header">
            <h2>Управление меню</h2>
            <div class="admin-actions">
                <button onclick="exportMenuData()" class="btn-secondary">Экспорт данных</button>
                <button onclick="importMenuData()" class="btn-secondary">Импорт данных</button>
                <button onclick="resetMenuData()" class="btn-secondary">Сброс к умолчанию</button>
                <button onclick="adminLogout()" class="btn-primary">Выйти</button>
            </div>
        </div>
        <input type="file" id="import-file" accept=".json" style="display: none;" onchange="handleFileImport(event)">
    \`;

    // Генерируем админ-панель для каждой категории
    Object.keys(menuData).forEach(categoryKey => {
        const category = menuData[categoryKey];
        html += \`
            <div class="admin-category">
                <h3>\${category.name}</h3>
                <div class="category-actions">
                    <button onclick="addNewItem('\${categoryKey}')" class="btn-primary btn-small">Добавить товар</button>
                </div>
        \`;

        Object.keys(category.items).forEach(itemKey => {
            const item = category.items[itemKey];
            html += \`
                <div class="admin-item" data-category="\${categoryKey}" data-item="\${itemKey}">
                    <div class="admin-item-name">
                        <input type="text" value="\${item.name}" onchange="updateItemName('\${categoryKey}', '\${itemKey}', this.value)" class="name-input">
                    </div>
                    <div class="admin-controls">
                        <input type="text" value="\${item.price}" onchange="updateItemPrice('\${categoryKey}', '\${itemKey}', this.value)" class="price-input" placeholder="Цена">
                        <label class="availability-toggle">
                            <input type="checkbox" \${item.available ? 'checked' : ''} onchange="toggleItemAvailability('\${categoryKey}', '\${itemKey}')">
                            <span class="slider"></span>
                        </label>
                        <button onclick="removeItem('\${categoryKey}', '\${itemKey}')" class="btn-danger btn-small">Удалить</button>
                    </div>
                </div>
            \`;
        });

        html += '</div>';
    });

    adminContent.innerHTML = html;
}

// Функции управления товарами в админ-панели

function updateItemName(categoryKey, itemKey, newName) {
    if (menuData[categoryKey] && menuData[categoryKey].items[itemKey]) {
        menuData[categoryKey].items[itemKey].name = newName;
        saveMenuData();
        // Обновляем меню, если оно открыто
        if (currentPage === 'menu-page' && currentCategory === categoryKey) {
            renderMenuItems(categoryKey);
        }
    }
}

function updateItemPrice(categoryKey, itemKey, newPrice) {
    if (menuData[categoryKey] && menuData[categoryKey].items[itemKey]) {
        // Проверяем, является ли цена числом
        const numPrice = parseFloat(newPrice);
        menuData[categoryKey].items[itemKey].price = isNaN(numPrice) ? newPrice : numPrice;
        saveMenuData();
        // Обновляем меню, если оно открыто
        if (currentPage === 'menu-page' && currentCategory === categoryKey) {
            renderMenuItems(categoryKey);
        }
    }
}

function toggleItemAvailability(categoryKey, itemKey) {
    if (menuData[categoryKey] && menuData[categoryKey].items[itemKey]) {
        menuData[categoryKey].items[itemKey].available = !menuData[categoryKey].items[itemKey].available;
        saveMenuData();
        // Обновляем меню, если оно открыто
        if (currentPage === 'menu-page' && currentCategory === categoryKey) {
            renderMenuItems(categoryKey);
        }
    }
}

function removeItem(categoryKey, itemKey) {
    if (confirm('Вы уверены, что хотите удалить этот товар?')) {
        delete menuData[categoryKey].items[itemKey];
        saveMenuData();
        showAdminPanel(); // Перерисовываем админ-панель

        // Обновляем меню, если оно открыто
        if (currentPage === 'menu-page' && currentCategory === categoryKey) {
            renderMenuItems(categoryKey);
        }
    }
}

function addNewItem(categoryKey) {
    const itemName = prompt('Введите название нового товара:');
    if (!itemName) return;

    const itemPrice = prompt('Введите цену товара:');
    if (!itemPrice) return;

    // Генерируем уникальный ключ для товара
    const itemKey = 'item_' + Date.now();

    // Проверяем, является ли цена числом
    const numPrice = parseFloat(itemPrice);
    const finalPrice = isNaN(numPrice) ? itemPrice : numPrice;

    menuData[categoryKey].items[itemKey] = {
        name: itemName,
        price: finalPrice,
        available: true
    };

    saveMenuData();
    showAdminPanel(); // Перерисовываем админ-панель

    // Обновляем меню, если оно открыто
    if (currentPage === 'menu-page' && currentCategory === categoryKey) {
        renderMenuItems(categoryKey);
    }
}

// Экспорт данных меню
function exportMenuData() {
    const dataStr = JSON.stringify(menuData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kaif_menu_data.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Импорт данных меню
function importMenuData() {
    document.getElementById('import-file').click();
}

function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (confirm('Вы уверены, что хотите заменить текущие данные меню?')) {
                menuData = importedData;
                saveMenuData();
                showAdminPanel();
                alert('Данные успешно импортированы!');

                // Обновляем меню, если оно открыто
                if (currentPage === 'menu-page') {
                    renderCategories();
                    if (Object.keys(menuData).length > 0) {
                        showCategory(Object.keys(menuData)[0]);
                    }
                }
            }
        } catch (error) {
            alert('Ошибка при импорте файла. Проверьте формат данных.');
        }
    };
    reader.readAsText(file);
}

// Сброс данных к умолчанию
function resetMenuData() {
    if (confirm('Вы уверены, что хотите сбросить все данные к настройкам по умолчанию? Все изменения будут потеряны.')) {
        loadDefaultMenuData();
        showAdminPanel();
        alert('Данные сброшены к настройкам по умолчанию');

        // Обновляем меню, если оно открыто
        if (currentPage === 'menu-page') {
            renderCategories();
            if (Object.keys(menuData).length > 0) {
                showCategory(Object.keys(menuData)[0]);
            }
        }
    }
}

// Рендер категорий
function renderCategories() {
    const categoriesContainer = document.getElementById('categories');
    categoriesContainer.innerHTML = '';

    Object.keys(menuData).forEach(categoryKey => {
        const category = menuData[categoryKey];
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.textContent = category.name;
        button.onclick = () => showCategory(categoryKey);
        categoriesContainer.appendChild(button);
    });
}

// Показ товаров категории
function showCategory(categoryKey) {
    currentCategory = categoryKey;

    // Активация кнопки категории
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const activeBtn = Array.from(document.querySelectorAll('.category-btn'))
        .find(btn => btn.textContent === menuData[categoryKey].name);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Рендер товаров
    renderMenuItems(categoryKey);
}

function renderMenuItems(categoryKey) {
    const menuItemsContainer = document.getElementById('menu-items');
    menuItemsContainer.innerHTML = '';

    const category = menuData[categoryKey];
    if (!category || !category.items) return;

    Object.keys(category.items).forEach(itemKey => {
        const item = category.items[itemKey];
        const menuItemElement = createMenuItemElement(categoryKey, itemKey, item);
        menuItemsContainer.appendChild(menuItemElement);
    });
}

function createMenuItemElement(categoryKey, itemKey, item) {
    const div = document.createElement('div');
    div.className = \`menu-item \${!item.available ? 'unavailable' : ''}\`;

    const priceText = typeof item.price === 'string' ? item.price : \`\${item.price}\`;

    div.innerHTML = \`
        \${!item.available ? '<div class="unavailable-overlay">Нет в наличии</div>' : ''}
        <div class="menu-item-content">
            <h3 class="menu-item-title">\${item.name}</h3>
            <div class="menu-item-footer">
                <span class="menu-item-price">\${priceText}₽</span>
                \${item.available ? \`<button onclick="addToCart('\${categoryKey}', '\${itemKey}')" class="btn-primary btn-small">В корзину</button>\` : ''}
            </div>
        </div>
    \`;

    return div;
}

// Функции корзины
function addToCart(categoryKey, itemKey) {
    const item = menuData[categoryKey].items[itemKey];
    if (!item.available) return;

    // Проверяем, есть ли товар уже в корзине
    const existingItem = cart.find(cartItem => 
        cartItem.categoryKey === categoryKey && cartItem.itemKey === itemKey
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            categoryKey: categoryKey,
            itemKey: itemKey,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }

    updateCartDisplay();

    // Показываем уведомление
    showNotification('Товар добавлен в корзину');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function updateCartQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
        cartTotal.textContent = '0';
        if (cartCount) cartCount.textContent = '0';
        return;
    }

    let total = 0;
    let totalItems = 0;

    cartItems.innerHTML = cart.map((item, index) => {
        const itemPrice = typeof item.price === 'string' ? 0 : item.price;
        const itemTotal = itemPrice * item.quantity;
        total += itemTotal;
        totalItems += item.quantity;

        return \`
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>\${item.name}</h4>
                    <span class="cart-item-price">\${item.price}₽</span>
                </div>
                <div class="cart-item-controls">
                    <button onclick="updateCartQuantity(\${index}, -1)" class="btn-small">-</button>
                    <span class="cart-quantity">\${item.quantity}</span>
                    <button onclick="updateCartQuantity(\${index}, 1)" class="btn-small">+</button>
                    <button onclick="removeFromCart(\${index})" class="btn-danger btn-small">×</button>
                </div>
            </div>
        \`;
    }).join('');

    cartTotal.textContent = total;
    if (cartCount) cartCount.textContent = totalItems;
}

function clearCart() {
    if (cart.length === 0) return;

    if (confirm('Очистить корзину?')) {
        cart = [];
        updateCartDisplay();
    }
}

// Модальные окна
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Закрытие модального окна при клике вне его
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

// Уведомления
function showNotification(message) {
    // Создаем элемент уведомления если его нет
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.classList.add('show');

    // Автоматически скрываем через 3 секунды
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// CSS для уведомлений (добавим в style.css)
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = \`
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--color-primary);
            color: white;
            padding: 12px 20px;
            border-radius: var(--radius-base);
            font-size: var(--font-size-sm);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 10000;
            box-shadow: var(--shadow-lg);
        }

        .notification.show {
            transform: translateX(0);
        }

        @media (max-width: 768px) {
            .notification {
                right: 12px;
                bottom: 12px;
                left: 12px;
                right: 12px;
                transform: translateY(100px);
            }

            .notification.show {
                transform: translateY(0);
            }
        }
    \`;
    document.head.appendChild(style);
}
