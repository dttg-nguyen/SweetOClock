/* Add any JavaScript you need to this file. */
const $ = window.$;
window.onload = function() {
  populateCategories();
  populateItems(findItemsByCategory(categories[0]));
};

function populateCategories() {
  var categoriesNav = document.querySelector('#categories-nav');
  for (var i = 0; i < categories.length; i++) {
    var category = categories[i];
    var categoryNode = document.createElement('div');

    categoryNode.setAttribute('id', category);
    if (i === 0) {
      categoryNode.setAttribute('class', 'nav-link active');
    } else {
      categoryNode.setAttribute('class', 'nav-link');
    }
    categoryNode.setAttribute('href', '#');
    categoryNode.appendChild(document.createTextNode(category));

    categoryNode.onclick = categoryOnclick;

    categoriesNav.appendChild(categoryNode);
  }
}

function categoryOnclick() {
  var activeCategory = document.querySelector('.nav-link.active');
  activeCategory.setAttribute('class', 'nav-link');
  this.setAttribute('class', 'nav-link active');
  populateItems(findItemsByCategory(this.id));
}

function findItemsByCategory(category) {
  const itemsByCategory = items.filter(item => item.category === category);
  return itemsByCategory;
}

function populateItems(items) {
  var itemsMenu = document.querySelector('#items-menu');
  var existingItemsContainer = document.querySelector('#items-container');
  if (existingItemsContainer) {
    itemsMenu.removeChild(existingItemsContainer);
  }
  var itemsContainer = document.createElement('div');
  itemsContainer.setAttribute('id', 'items-container');
  itemsContainer.setAttribute('class', 'row');
  itemsMenu.appendChild(itemsContainer);

  for (var i = 0; i < items.length; i++) {
    var column = document.createElement('div');
    column.setAttribute('class', 'col-lg-4 col-md-6 mb-4');

    var card = document.createElement('div');
    card.setAttribute('id', items[i].id);
    card.setAttribute('class', 'card h-100');
    card.setAttribute('style', 'cursor: pointer;');

    var imgTop = document.createElement('img');
    card.appendChild(imgTop);
    imgTop.setAttribute('class', 'card-img-top');
    imgTop.setAttribute('src', items[i].src);
    imgTop.setAttribute('alt', items[i].alt);
    imgTop.setAttribute('height', '200');

    var cardBody = document.createElement('div');
    var cardTitle = document.createElement('h5');
    var itemDescCardText = document.createElement('div');
    var itemPriceCardText = document.createElement('div');
    var badge = document.createElement('span');

    cardBody.setAttribute('class', 'card-body');
    cardTitle.setAttribute('class', 'card-title');
    itemDescCardText.setAttribute('class', 'card-text');
    itemPriceCardText.setAttribute('class', 'card-text');
    badge.setAttribute('class', 'badge badge-info');
    cardTitle.appendChild(document.createTextNode(items[i].title));
    itemDescCardText.appendChild(document.createTextNode(items[i].desc));
    badge.appendChild(document.createTextNode(items[i].price));

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(itemDescCardText);
    itemPriceCardText.appendChild(badge);
    cardBody.appendChild(itemPriceCardText);

    card.appendChild(cardBody);
    column.appendChild(card);
    itemsContainer.appendChild(column);

    card.onclick = itemCardOnclick;
  }
}

function itemCardOnclick() {
  var item = items.filter(item => item.id === this.id)[0];

  //modal-header
  var title = document.querySelector('.modal-title');
  if (title.firstChild) {
    title.removeChild(title.firstChild);
  }
  title.appendChild(document.createTextNode(item.title));

  //modal-body
  var modalBody = document.querySelector('.modal-body');
  var existingImg = document.querySelector('#modal-img');
  if (existingImg) {
    modalBody.removeChild(existingImg);
  }
  var img = document.createElement('img');
  modalBody.appendChild(img);

  img.setAttribute('id', 'modal-img');
  img.setAttribute('src', item.src);
  img.setAttribute('class', 'img-fluid');
  img.setAttribute('alt', item.title);

  //modal-footer
  var modalFooter = document.querySelector('.modal-footer');
  var existingContent = document.querySelector('#modal-footer-content');
  if (existingContent) {
    modalFooter.removeChild(existingContent);
  }

  var modalFooterContent = document.createElement('div');
  modalFooterContent.setAttribute('id', 'modal-footer-content');
  modalFooterContent.setAttribute('class', 'mr-auto');

  var modalFooterIntro = document.createElement('p');
  modalFooterIntro.setAttribute('id', 'modal-footer-paragraph');
  modalFooterIntro.appendChild(document.createTextNode(item.intro));

  var modalFooterPrice = document.createElement('p');
  modalFooterPrice.setAttribute('class', 'badge badge-info');
  modalFooterPrice.appendChild(document.createTextNode(item.price));

  modalFooterContent.appendChild(modalFooterIntro);
  modalFooterContent.appendChild(modalFooterPrice);
  modalFooter.appendChild(modalFooterContent);

  //show modal
  $('#product-view-modal').modal('show');
}

/** Form **/
function displayOrderNumberBox() {
  var orderNumberBox = document.querySelector("#order-number-box");
  orderNumberBox.required = true;
  orderNumberBox.style.display = "block";
}

function hideOrderNumberBox() {
  var orderNumberBox = document.querySelector("#order-number-box");
  orderNumberBox.value = "";
  orderNumberBox.required = false;
  orderNumberBox.style.display = "none";
}

function onSubmit(e) {
  var form = document.querySelector('#contact-form');
  form.classList.add('was-validated');

  if (!form.checkValidity()) {
    e.preventDefault();
  }
}

/** Data **/
var categories = ['Cake', 'Tea', 'Coffee'];
var items = [
  {
    id: '1',
    category: 'Cake',
    title: 'Fruity Mousse Cake',
    desc: 'Hot - New Item',
    price: 'CAD 8',
    src: 'images/cake/Fruity mousse.jpg',
    alt: '',
    intro: 'Fruity Mousse Cake is a light, elegant, flavorful dessert bursting of summer flavor.'
  },
  {
    id: '2',
    category: 'Cake',
    title: 'Orange Mini Tart',
    desc: 'Hot - New Item',
    price: 'CAD 5',
    src: 'images/cake/orange_tart.jpg',
    alt: '',
    intro:
      'Lovely Orange Mini Tart is a fantastic dessert with citrus-forward and tart sweet flavours.'
  },
  {
    id: '3',
    category: 'Cake',
    title: 'Raspberry-Choco Cake',
    desc: 'Hot - New Item',
    price: 'CAD 35',
    src: 'images/Cake/Rasberry_chocolate.jpg',
    alt: '',
    intro:
      'This Raspberry Chocolate Cake is super moist and layered with smooth chocolate ganache and raspberry filling, all covered in a fudgy chocolate frosting.'
  },
  {
    id: '4',
    category: 'Cake',
    title: 'Tiramisu',
    desc: "Store's signature",
    price: 'CAD 10',
    src: 'images/cake/tiramisu.jpg',
    alt: '',
    intro:
      'Tiramisu is a timeless no-bake Italian dessert combining espresso-dipped ladyfingers and a creamy lightly sweetened mascarpone cream.'
  },
  {
    id: '5',
    category: 'Cake',
    title: 'New York Cheesecake',
    desc: "Store's signature",
    price: 'CAD 50',
    src: 'images/cake/NY_cheesecake.jpg',
    alt: '',
    intro: 'A classic New York Cheesecake which is known for its rich, creamy, satiny texture.'
  },
  {
    id: '6',
    category: 'Cake',
    title: 'Chocolate Cake',
    desc: "Store's signature",
    price: 'CAD 50',
    src: 'images/cake/chocolate_cake.jpg',
    alt: '',
    intro:
      'This super moist Chocolate Cake combines unsweetened natural cocoa powder and dark cocoa powder for an extra rich flavor.'
  },
  {
    id: '7',
    category: 'Cake',
    title: 'Red velvet Cake',
    desc: "Store's signature",
    price: 'CAD 15',
    src: 'images/cake/red_velvet.jpg',
    alt: '',
    intro:
      'An incredible Red velvet Cake with superior buttery, vanilla, and cocoa flavors, as well as a delicious tang from buttermilk.'
  },
  {
    id: '8',
    category: 'Cake',
    title: 'Traditional Apple Pie',
    desc: "Store's signature",
    price: 'CAD 8',
    src: 'images/cake/apple_pie.jpg',
    alt: '',
    intro:
      'A lovely Apple Pie combines the sweet and tender flavors of baked apples with a deliciously flaky pie crust.'
  },
  {
    id: '9',
    category: 'Coffee',
    title: 'Americano',
    desc: 'Hot coffees',
    price: 'CAD 3',
    src: 'images/Coffee/americano.jpg',
    alt: '',
    intro:
      'A type of coffee drink prepared by diluting an espresso with hot water, giving it a similar strength to, but different flavor from, traditionally brewed coffee.'
  },
  {
    id: '10',
    category: 'Coffee',
    title: 'Caffe Latte',
    desc: 'Hot coffees',
    price: 'CAD 8',
    src: 'images/Coffee/caffe_latte.jpg',
    alt: '',
    intro:
      'A coffee drink made with dark, rich espresso balanced with steamed milk and a light layer of foam.'
  },
  {
    id: '11',
    category: 'Coffee',
    title: 'Iced Caffe Latte',
    desc: 'Cold Coffees',
    price: 'CAD 8',
    src: 'images/Coffee/ice_caffelatte.jpg',
    alt: '',
    intro:
      'Dark, rich espresso combined with milk and served over ice. A perfect milk-forward cooldown for summer.'
  },
  {
    id: '12',
    category: 'Coffee',
    title: 'Capuccino',
    desc: 'Hot coffees',
    price: 'CAD 5',
    src: 'images/Coffee/capuccino.jpg',
    alt: '',
    intro:
      'Dark, rich espresso lies in wait under a smoothed and stretched layer of thick milk foam.'
  },
  {
    id: '13',
    category: 'Coffee',
    title: 'Espresso',
    desc: 'Hot coffees',
    price: 'CAD 3',
    src: 'images/Coffee/espresso.jpg',
    alt: '',
    intro:
      'Small amount of nearly boiling water is forced under pressure through finely-ground coffee beans.'
  },
  {
    id: '14',
    category: 'Coffee',
    title: 'Mocha',
    desc: 'Hot coffees',
    price: 'CAD 10',
    src: 'images/Coffee/mocha_drink.jpg',
    alt: '',
    intro:
      'Rich espresso combined with bittersweet mocha sauce and steamed milk, topped with whipped cream.'
  },
  {
    id: '15',
    category: 'Tea',
    title: 'Chamomile Tea',
    desc: 'Hot - New Item',
    price: 'CAD 3',
    src: 'images/Tea/camomile_tea.jpg',
    alt: '',
    intro: 'A lovely cup of chamomile infused tea for a peaceful day.'
  },
  {
    id: '16',
    category: 'Tea',
    title: 'Orange Tea',
    desc: 'Hot - New Item',
    price: 'CAD 5',
    src: 'images/Tea/orange_tea.jpg',
    alt: '',
    intro: 'Store unique and fun tea for tea lovers.'
  },
  {
    id: '17',
    category: 'Tea',
    title: 'Rose Tea',
    desc: 'Hot - New Item',
    price: 'CAD 6',
    src: 'images/Tea/rose_tea.jpg',
    alt: '',
    intro: 'An aromatic herbal beverage made from the fragrant petals and buds of rose flowers.'
  },
  {
    id: '18',
    category: 'Tea',
    title: 'Green Tea',
    desc: "Store's signature",
    price: 'CAD 3',
    src: 'images/Tea/greentea.jpg',
    alt: '',
    intro: 'A cup of green tea that goes well with anything.'
  },
  {
    id: '19',
    category: 'Tea',
    title: 'Herbal Tea',
    desc: "Store's signature",
    price: 'CAD 3',
    src: 'images/Tea/herbal_tea.jpg',
    alt: '',
    intro:
      'A cup of tea made from the infusion or decoction of herbs, spices, or other plant material in hot water.'
  },
  {
    id: '20',
    category: 'Tea',
    title: 'Honey Lemon Tea',
    desc: "Store's signature",
    price: 'CAD 5',
    src: 'images/Tea/lemon_tea.jpg',
    alt: '',
    intro: 'Warm your body and soothe your day with a cup of honey lemon tea!'
  }
];
