// Глобальные переменные
let currentPage = 'home';
let currentCategory = '';
let cart = [];
let isAdminLoggedIn = false;
let menuData = {};

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
    Object.keys(category.items).forEach(itemKey => {
        const item = category.items[itemKey];
        const menuItemElement = createMenuItemElement(categoryKey, itemKey, item);
        menuItemsContainer.appendChild(menuItemElement);
    });
}

function createMenuItemElement(categoryKey, itemKey, item) {
    const div = document.createElement('div');
    div.className = `menu-item ${!item.available ? 'unavailable' : ''}`;
    
    const priceText = typeof item.price === 'string' ? item.price : `${item.price}`;
    
    div.innerHTML = `
        <div class="menu-item-header">
            <div class="menu-item-name">${item.name}</div>
            <div class="menu-item-price">${priceText} ₽</div>
        </div>
        <button class="add-to-cart" 
                onclick="addToCart('${categoryKey}', '${itemKey}')" 
                ${!item.available ? 'disabled' : ''}>
            ${item.available ? 'Добавить в корзину' : 'Нет в наличии'}
        </button>
        ${!item.available ? '<div class="unavailable-badge">Нет в наличии</div>' : ''}
    `;
    
    return div;
}

// Функции корзины
function addToCart(categoryKey, itemKey) {
    const item = menuData[categoryKey].items[itemKey];
    if (!item.available) return;
    
    const existingItem = cart.find(cartItem => 
        cartItem.categoryKey === categoryKey && cartItem.itemKey === itemKey
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            categoryKey,
            itemKey,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    renderCart();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCartDisplay();
        renderCart();
    }
}

function updateCartDisplay() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
        if (cartCount > 0) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });
}

function openCart() {
    renderCart();
    document.getElementById('cart-modal').classList.remove('hidden');
}

function closeCart() {
    document.getElementById('cart-modal').classList.add('hidden');
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyContainer = document.getElementById('cart-empty');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        cartEmptyContainer.classList.remove('hidden');
        cartTotalElement.textContent = '0';
        return;
    }
    
    cartEmptyContainer.classList.add('hidden');
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        
        // Обработка цены (может быть строкой с несколькими ценами)
        let itemPrice = 0;
        let priceDisplay = item.price;
        
        if (typeof item.price === 'number') {
            itemPrice = item.price;
            priceDisplay = `${item.price} ₽`;
        } else if (typeof item.price === 'string') {
            // Для цен вида "290/470" берем первую цену
            const firstPrice = item.price.match(/\d+/);
            if (firstPrice) {
                itemPrice = parseInt(firstPrice[0]);
            }
            priceDisplay = `${item.price} ₽`;
        }
        
        total += itemPrice * item.quantity;
        
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${priceDisplay}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart(${index})">Удалить</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    cartTotalElement.textContent = total;
}

// Админ-панель
function showAdminLogin() {
    window.adminLogin = adminLogin;
    document.getElementById('admin-login').classList.remove('hidden');
    document.getElementById('admin-panel').classList.add('hidden');
}

function showAdminPanel() {
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    renderAdminPanel();
}

function adminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    const errorElement = document.getElementById('login-error');
    
    if (username === 'Denis' && password === 'AshtoneIzoldaFedor') {
        isAdminLoggedIn = true;
        errorElement.classList.add('hidden');
        showAdminPanel();
    } else {
        errorElement.classList.remove('hidden');
    }
}

function adminLogout() {
    isAdminLoggedIn = false;
    window.location.hash = '';
    goHome();
    document.getElementById('admin-username').value = '';
    document.getElementById('admin-password').value = '';
}

function renderAdminPanel() {
    const adminCategoriesContainer = document.getElementById('admin-categories');
    adminCategoriesContainer.innerHTML = '';
    
    Object.keys(menuData).forEach(categoryKey => {
        const category = menuData[categoryKey];
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'admin-category';
        
        let categoryHTML = `<h3>${category.name}</h3>`;
        
        Object.keys(category.items).forEach(itemKey => {
            const item = category.items[itemKey];
            categoryHTML += `
                <div class="admin-item" data-category="${categoryKey}" data-item="${itemKey}">
                    <div class="admin-item-name">${item.name}</div>
                    <div class="admin-controls">
                        <input type="text" class="price-input" value="${item.price}" 
                               onchange="updatePrice('${categoryKey}', '${itemKey}', this.value)">
                        <label class="availability-toggle">
                            <input type="checkbox" ${item.available ? 'checked' : ''} 
                                   onchange="updateAvailability('${categoryKey}', '${itemKey}', this.checked)">
                            <span class="slider"></span>
                        </label>
                        <span class="status">${item.available ? 'В наличии' : 'Нет в наличии'}</span>
                    </div>
                </div>
            `;
        });
        
        categoryDiv.innerHTML = categoryHTML;
        adminCategoriesContainer.appendChild(categoryDiv);
    });
}

function updatePrice(categoryKey, itemKey, newPrice) {
    menuData[categoryKey].items[itemKey].price = isNaN(newPrice) ? newPrice : parseInt(newPrice);
    
    // Обновляем отображение меню, если оно открыто
    if (currentPage === 'menu-page' && currentCategory === categoryKey) {
        renderMenuItems(categoryKey);
    }
}

function updateAvailability(categoryKey, itemKey, isAvailable) {
    menuData[categoryKey].items[itemKey].available = isAvailable;
    
    // Обновляем отображение меню, если оно открыто
    if (currentPage === 'menu-page' && currentCategory === categoryKey) {
        renderMenuItems(categoryKey);
    }
    
    // Обновляем статус в админ-панели
    const adminItem = document.querySelector(`[data-category="${categoryKey}"][data-item="${itemKey}"]`);
    if (adminItem) {
        const statusSpan = adminItem.querySelector('.status');
        statusSpan.textContent = isAvailable ? 'В наличии' : 'Нет в наличии';
    }
}

// Обработка клика по оверлею модального окна
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        closeCart();
    }
});

// Обработка клавиши Escape для закрытия модального окна
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCart();
    }
});

// Секретная комбинация для доступа к админ-панели
let adminKeySequence = '';
document.addEventListener('keydown', function(event) {
    adminKeySequence += event.key.toLowerCase();
    if (adminKeySequence.includes('admin')) {
        adminKeySequence = '';
        window.location.hash = 'admin';
        showAdminPage();
    }
    if (adminKeySequence.length > 10) {
        adminKeySequence = adminKeySequence.slice(-5);
    }
});

// Добавляем в консоль браузера подсказку для админ-доступа
console.log('%cДля доступа к админ-панели:', 'color: #8b5cf6; font-size: 16px; font-weight: bold');
console.log('%c1. Перейти по ссылке: window.location.hash = "admin"', 'color: #f59e0b');
console.log('%c2. Или вызвать функцию: openAdmin()', 'color: #f59e0b');
console.log('%c3. Или набрать на клавиатуре: admin', 'color: #f59e0b');
