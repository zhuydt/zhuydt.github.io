function renderBlogUIFromAPI(apiUrl, options = {}) {
    options = {
        mode: 'pagination',
        lazyload: true,
        lazyloadSpinner: true,
        categories: ["All", 'Travel'],
        tags: [],
        perPage: 4,
        showFilter: false,
        showSidebar: false,
        search: {
            text: true,
            category: true,
            tag: true,
            ...options.search
        },
        ...options
    }

    let { target, showFilter, showSidebar, mode, lazyload, perPage, lazyloadSpinner, categories, tags, search } = options;

    const DEF_PER_PAGE = 4;
    const root = target || document.getElementById('app');
    root.innerHTML = '';

    let currentFilters = {
        search: '',
        category: 'All',
        tag: ''
    };
    let pageIndex = 0;
    let shownCount = perPage || DEF_PER_PAGE;
    let totalCount = 0;
    let loading = false;
    let shownPosts = [];

    const layout = helper.el('div', '', { class: 'layout' });
    const content = helper.el('div', '', { class: 'content' });
    const postListWrapper = helper.el('div', '', { class: 'post-list-wrapper' });

    const filters = ui.createFilters([], onFilterChange, {
        ...search,
        categories,
        tags
    });
    const sidebar = ui.createSidebar(categories, []);

    content.appendChild(postListWrapper);
    if(showFilter)
        layout.appendChild(filters);
    layout.appendChild(content);
    if(showSidebar)
        layout.appendChild(sidebar);
    root.appendChild(layout);

    const loadMoreBtn = helper.el('button', 'Load More', { class: 'load-more' });
    loadMoreBtn.addEventListener('click', () => {
        if (loading) return;
        pageIndex++;
        fetchAndRenderPosts();
    });

    const lazyTrigger = helper.el('div', '', {
        class: lazyloadSpinner ? 'lazy-trigger loading' : 'lazy-trigger'
    });

    let observer;
    if (mode !== 'pagination' && lazyload) {
        content.appendChild(lazyTrigger);
        observer = new IntersectionObserver(helper.debounce((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !loading && shownCount < totalCount) {
                    pageIndex++;
                    fetchAndRenderPosts();
                }
            });
        }));
        observer.observe(lazyTrigger);
    }

    async function fetchAndRenderPosts(reset = false) {
        if (loading) return;
        loading = true;

        const params = new URLSearchParams();
        params.append('page', pageIndex + 1);
        params.append('perPage', perPage || DEF_PER_PAGE);
        if (currentFilters.search) params.append('search', currentFilters.search);
        if (currentFilters.category && currentFilters.category !== 'All') params.append('category', currentFilters.category);
        if (currentFilters.tag) params.append('tag', currentFilters.tag);

        try {
            const response = await fetch(`${apiUrl}?${params.toString()}`);
            if (!response.ok) throw new Error('Network error');
            const data = await response.json();

            totalCount = data.total || data.totalCount || 0;

            // Cập nhật filter và sidebar nếu ở page đầu
            if (pageIndex === 0 && data.posts && typeof ui.updateFilters === 'function') {
                ui.updateFilters(filters, data.posts, search);
            }
            if (pageIndex === 0 && data.categories && typeof ui.updateSidebar === 'function') {
                ui.updateSidebar(sidebar, data.categories, data.recentPosts || []);
            }

            if (mode === 'pagination') {
                ui.renderBlogPosts(postListWrapper, data.posts, {
                    mode: 'pagination',
                    perPage: perPage,
                    totalPost: totalCount,
                    pageIndex,
                    onPageChange(i) {
                        pageIndex = i;
                        fetchAndRenderPosts();
                    }
                });
                loadMoreBtn.style.display = 'none';
                lazyTrigger.style.display = 'none';
            } else {
                // Load-more mode
                shownPosts = shownPosts.concat(data.posts);
                shownCount = shownPosts.length;

                ui.renderBlogPosts(postListWrapper, data.posts, {
                    mode: 'loadmore',
                    shownCount,
                    reset
                });

                if (lazyload) {
                    loadMoreBtn.style.display = 'none';
                    lazyTrigger.style.display = shownCount >= totalCount ? 'none' : 'flex';
                } else {
                    lazyTrigger.style.display = 'none';
                    loadMoreBtn.style.display = shownCount >= totalCount ? 'none' : 'block';
                    if (!postListWrapper.contains(loadMoreBtn)) {
                        postListWrapper.appendChild(loadMoreBtn);
                    }
                }
            }
        } catch (err) {
            console.error('Failed to load posts:', err);
        } finally {
            loading = false;
        }
    }

    function onFilterChange(filtersChanged) {
        currentFilters = filtersChanged;
        pageIndex = 0;
        shownCount = perPage || DEF_PER_PAGE;
        shownPosts = [];

        // Xóa toàn bộ bài viết hiện tại khi filter thay đổi
        const postList = postListWrapper.querySelector('.post-list');
        if (postList) postList.innerHTML = '';

        fetchAndRenderPosts(true);
    }

    fetchAndRenderPosts();

    return { sidebar, filters };
}
