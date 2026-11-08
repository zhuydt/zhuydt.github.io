window.postUI = {
  createPost(data) {
    const post = helper.el('div', '', { class: 'post' });

    post.innerHTML = `
      <a href="${data.link || '#'}" class="post-thumb-wrap">
        <img src="${data.thumb || ''}" alt="${data.title || ''}" loading="lazy" class="post-thumb"/>
        ${data.badge ? `<span class="post-badge">${data.badge}</span>` : ''}
      </a>
      <div class="post-content">
        <h2 class="post-title"><a href="${data.link || '#'}">${data.title || ''}</a></h2>
        ${data.desc ? `<p class="post-desc">${data.desc}</p>` : ''}
        ${(data.author || data.date) ? `
          <div class="post-meta">
            ${data.author ? `<span class="post-author">${data.author}</span>` : ''}
            ${data.date ? `<span class="post-date">${data.date}</span>` : ''}
          </div>
        ` : ''}
        ${data.tags && data.tags.length ? `
          <div class="post-tags">
            ${data.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
          </div>
        ` : ''}
        ${data.category ? `<div><a class="post-category" href="#">${data.category}</a></div>` : ''}
        ${data.views ? `<div class="post-views">${data.views} views</div>` : ''}
        ${data.extra || ''}
      </div>
    `;

    return post;
  },


  createPostList(posts, container) {
    container = container || helper.el('div', '', { class: 'post-list' });
    posts.forEach(post => container.appendChild(this.createPost(post)));
    return container;
  }
};
