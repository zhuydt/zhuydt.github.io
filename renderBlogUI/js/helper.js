window.helper = {
  el(type = 'div', innerHTML = '', attrs = {}) {
    const target = document.createElement(type);
    target.innerHTML = innerHTML;
    for (let key in attrs) {
      if (key === 'innerHTML') continue;
      if (key.startsWith('on') && typeof attrs[key] === 'function') {
        target[key] = attrs[key];
      } else {
        target.setAttribute(key, attrs[key]);
      }
    }
    return target;
  },

  raw(html, ...elements) {
    const ID = '_ID';
    html = html.replace(/\$(\w+)/g, (_, key) =>
      elements[key] ? `<div id="${ID}-${key}"></div>` : ''
    );
    const wrapper = this.el();
    wrapper.innerHTML = html;
    for (let i in elements) {
      const el = elements[i];
      const target = wrapper.querySelector(`#${ID}-${i}`);
      if (target) {
        target.replaceWith(el);
      }
    }
    return wrapper.children;
  },
  debounce(func, wait = 300) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
};
