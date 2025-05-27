function renderBlogUI(allPosts, options = {}) {
    options = {
        mode: 'pagination',
        lazyload: true,
        lazyloadSpinner: true,
        perPage: 4,
        showFilter: false,
        showSidebar: false,
        search: {
            text: true,
            category: true,
            tag: true,
            ...options.search
        }, ...options
    }
    let {target, showFilter, showSidebar, mode, perPage, lazyload, lazyloadSpinner, search} = options;

    const DEF_PER_PAGE = 4;
    const root = target || document.getElementById('app');
    root.innerHTML = '';

    let filteredPosts = allPosts;
    let currentFilters = {
        search: '',
        category: 'All',
        tag: ''
    };
    let pageIndex = 0;
    let shownCount = perPage || DEF_PER_PAGE;

    const layout = helper.el('div', '', { class: 'layout' });
    const content = helper.el('div', '', { class: 'content' });
    const postListWrapper = helper.el('div', '', { class: 'post-list-wrapper' });

    const filters = ui.createFilters(allPosts, ({ search, category, tag }) => {
        const postList = postListWrapper.querySelector('.post-list');
        if (postList) postList.innerHTML = '';

        currentFilters = { search, category, tag };
        filteredPosts = allPosts.filter(p =>
            (!search || p.title.toLowerCase().includes(search.toLowerCase())) &&
            (category === 'All' || !category || p.category === category) &&
            (!tag || (p.tags && p.tags.includes(tag)))
        );
        pageIndex = 0;
        shownCount = perPage || DEF_PER_PAGE;
        renderPosts(true);
    }, search);

    const sidebar = ui.createSidebar(
        search.categories || [...new Set(allPosts.map(p => p.category))],
        allPosts.slice(0, DEF_PER_PAGE)
    );

    content.appendChild(postListWrapper);
    if(showFilter)
        layout.appendChild(filters);
    layout.appendChild(content);
    if(showSidebar)
        layout.appendChild(sidebar);
    root.appendChild(layout);

    const loadMoreBtn = helper.el('button', 'Load More', { class: 'load-more' });
    loadMoreBtn.addEventListener('click', () => {
        shownCount += perPage || DEF_PER_PAGE;
        renderPosts();
    });

    const lazyTrigger = helper.el('div', '', {
        class: lazyloadSpinner ? 'lazy-trigger loading' : 'lazy-trigger'
    });

    if (mode !== 'pagination' && lazyload) {
        content.appendChild(lazyTrigger);
        const observer = new IntersectionObserver(helper.debounce(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    shownCount += perPage || DEF_PER_PAGE;
                    renderPosts();
                }
            });
        }));
        observer.observe(lazyTrigger);
    }

    function renderPosts(reset = false) {
        if (mode === 'pagination') {
            ui.renderBlogPosts(postListWrapper, filteredPosts, {
                mode: 'pagination',
                perPage: perPage,
                pageIndex,
                onPageChange(i) {
                    pageIndex = i;
                    renderPosts();
                }
            });
            loadMoreBtn.style.display = 'none';
            const oldPagination = content.querySelector('.pagination');
            if (oldPagination) content.appendChild(oldPagination);
        } else {
            ui.renderBlogPosts(postListWrapper, filteredPosts, {
                mode: 'loadmore',
                shownCount,
                reset
            });

            // Lazyload vs Load More
            if (options.lazyload) {
                loadMoreBtn.style.display = 'none';
                if (shownCount >= filteredPosts.length) {
                    lazyTrigger.style.display = 'none';
                } else {
                    lazyTrigger.style.display = 'flex';
                }
            } else {
                if (shownCount >= filteredPosts.length) {
                    loadMoreBtn.style.display = 'none';
                } else {
                    loadMoreBtn.style.display = 'block';
                    if (!content.contains(loadMoreBtn)) content.appendChild(loadMoreBtn);
                }
                lazyTrigger.remove();
            }

            const oldPagination = content.querySelector('.pagination');
            if (oldPagination) oldPagination.remove();
        }
    }

    filteredPosts = allPosts;
    renderPosts();

    return { sidebar, filteredPosts };
}
