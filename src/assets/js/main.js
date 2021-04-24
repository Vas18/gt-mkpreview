function menu(button, item, closeIcon) {
  const body = document.body;
  let hamburger = document.querySelector(button);
  let menu = document.querySelector(item);
  const closeBurgerMenu = document.querySelector(closeIcon);
  const overlay = document.querySelector('.js-overlay');

  const toggleMenu = () => {
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('lock');
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener('click', (e) => {
    let target = e.target;
    let its_menu = target == menu || menu.contains(target);
    let its_hamburger = target == hamburger;
    let menu_is_active = menu.classList.contains('active');

    if (!its_menu && !its_hamburger && menu_is_active) {
      toggleMenu();
    }
  });

  closeBurgerMenu.addEventListener('click', function (e) {
    e.preventDefault();
    menu.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('lock');
  });
}
menu('.js-burger-menu', '.js-menu', '.js-menu-close');
menu('.js-burger-menu-mobile', '.js-menu', '.js-menu-close');
menu('.js-button-open', '.js-playlist-player', '.js-playlist-close');

let acc = document.getElementsByClassName('accordion');
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    this.classList.toggle('active');
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
}
class Tabs {
  constructor() {
    this.$wrapper;
    this.$triggers;
    this.$body;

    document.querySelectorAll('[data-tabs]').forEach((wrapper) => {
      this.$wrapper = wrapper;
      this.$triggers = [...wrapper.querySelector('[data-triggers]').children];
      this.$body = [...wrapper.querySelector('[data-body]').children];

      this.init();
      this.addListenerClick();
      this.addListenerHash();
    });
  }

  init() {
    const trigger = this.$wrapper.querySelector(`a[href="${window.location.hash}"]`);
    const content = this.$wrapper.querySelector(`[data-id="${window.location.hash}"]`);

    this.$triggers.forEach((trigger) => {
      trigger.classList.remove('active');
    });

    this.$body.forEach((content) => {
      content.classList.remove('active');
    });

    if (window.location.hash && trigger && content) {
      trigger.classList.add('active');
      content.classList.add('active');
    } else if (this.$triggers && this.$body) {
      this.$triggers[0].classList.add('active');
      this.$body[0].classList.add('active');
    }
  }

  addListenerClick() {
    this.$triggers.forEach((trigger) => {
      trigger.addEventListener('click', this.changeTab.bind(this));
    });
  }

  addListenerHash() {
    window.addEventListener('hashchange', this.init.bind(this));
  }

  changeTab(event) {
    event.preventDefault();

    const trigger = event.target.closest('a[href^="#"]');
    const content = this.$wrapper.querySelector(`[data-id="${trigger.hash}"]`);

    this.$triggers.forEach((trigger) => {
      trigger.classList.remove('active');
    });

    this.$body.forEach((content) => {
      content.classList.remove('active');
    });

    trigger.classList.add('active');
    content.classList.add('active');

    window.location.hash = trigger.hash;
  }
}

new Tabs();

// select

for (const dropdown of document.querySelectorAll('.custom-select-wrapper')) {
  dropdown.addEventListener('click', function () {
    this.querySelector('.custom-select').classList.toggle('open');
  });
}
window.addEventListener('click', function (e) {
  for (const select of document.querySelectorAll('.custom-select')) {
    if (!select.contains(e.target)) {
      select.classList.remove('open');
    }
  }
});
for (const option of document.querySelectorAll('.custom-option')) {
  option.addEventListener('click', function () {
    if (!this.classList.contains('selected')) {
      this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
      this.classList.add('selected');
      this.closest('.custom-select').querySelector(
        '.custom-select__trigger span',
      ).textContent = this.textContent;
    }
  });
}
