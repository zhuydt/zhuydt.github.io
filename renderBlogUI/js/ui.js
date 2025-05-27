window.ui = {
    renderBlogPosts(container, posts, options) {
        const {
            mode = 'pagination',
            perPage = 4,
            pageIndex = 0,
            shownCount = 0,
            totalPost = posts.length,
            onPageChange,
            reset = false     // 👈 thêm tùy chọn để biết có cần render lại toàn bộ không
        } = options;

        const useServerPaging = totalPost > posts.length;

        if (mode === 'pagination') {
            container.innerHTML = '';

            let currentPagePosts, totalPages;

            if (useServerPaging) {
                currentPagePosts = posts;
                totalPages = Math.ceil(totalPost / perPage);
            } else {
                const pages = ui.paginatePosts(posts, perPage);
                currentPagePosts = pages[pageIndex] || [];
                totalPages = pages.length;
            }

            const list = postUI.createPostList(currentPagePosts);
            container.appendChild(list);

            const oldPagination = container.parentNode.querySelector('.pagination');
            if (oldPagination) oldPagination.remove();

            const pagination = ui.createPaginationControls(pageIndex, totalPages, i => {
                if (onPageChange) onPageChange(i);
            });
            container.parentNode.appendChild(pagination);
        } else {
            let postListContainer = container.querySelectorAll('.post-list')[0];
            const alreadyRendered = container.querySelectorAll('.post').length;
            let newPosts = posts.slice(alreadyRendered, shownCount);
            newPosts = newPosts.length? newPosts: posts;

            if(reset) postListContainer.innerHTML = "";

            if(postListContainer)
                postUI.createPostList(newPosts, postListContainer);
            else{
                const list = postUI.createPostList(newPosts);
                container.appendChild(list);
            }
        }
    },

    createFilters(allPosts, onFilterChange, options = {}) {
        const wrapper = helper.el('div', '', {
            class: 'filters'
        });

        const state = {
            search: '',
            category: 'All',
            tag: ''
        };

        function triggerChange() {
            onFilterChange({
                ...state
            });
        }

        if (options.text) {
            const input = helper.el('input', '', {
                type: 'text',
                placeholder: 'Search by title…'
            });

           let debounceTimeout;
            const debouncedSearch = helper.debounce((e) => {
                state.search = e.target.value;
                triggerChange();
            }, 300); // debounce 300ms (tùy bạn chỉnh)

            input.addEventListener('input', debouncedSearch);
            
            wrapper.appendChild(input);
        }

        // Category dropdown filter
        if (options.category) {
            // Ưu tiên dùng options.categories, nếu không có thì lấy từ allPosts
            const categories = options.categories || ['All', ...new Set(allPosts.map(p => p.category))];
            const select = helper.el('select');
            categories.forEach(cat => {
                const option = helper.el('option', cat, {
                    value: cat
                });
                select.appendChild(option);
            });
            select.addEventListener('change', e => {
                state.category = e.target.value;
                triggerChange();
            });
            wrapper.appendChild(select);
        }

        // Tag dropdown filter
        if (options.tag) {
            // Ưu tiên dùng options.tags, nếu không có thì lấy từ allPosts
            const allTags = options.tags || [...new Set(allPosts.flatMap(p => p.tags || []))];
            const select = helper.el('select');
            select.appendChild(helper.el('option', 'All Tags', {
                value: ''
            }));
            allTags.forEach(tag => {
                const option = helper.el('option', tag, {
                    value: tag
                });
                select.appendChild(option);
            });
            select.addEventListener('change', e => {
                state.tag = e.target.value;
                triggerChange();
            });
            wrapper.appendChild(select);
        }

        return wrapper;
    },

    // Giữ nguyên các hàm khác...
    paginatePosts(posts, size = 6) {
        const pages = [];
        for (let i = 0; i < posts.length; i += size) {
            pages.push(posts.slice(i, i + size));
        }
        return pages;
    },

    createPaginationControls(pageIndex, totalPages, onPageClick) {
    const wrapper = document.createElement('div');
    wrapper.className = 'pagination';

    function createButton(text, disabled, onClick, extraClass = '') {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.className = `page-btn ${extraClass}`.trim();
        btn.disabled = disabled;
        if (onClick) btn.addEventListener('click', onClick);
        return btn;
    }

    function createEllipsis() {
        const span = document.createElement('span');
        span.className = 'page-ellipsis';
        span.textContent = '...';
        return span;
    }

    // Prev
    wrapper.appendChild(createButton('« Prev', pageIndex <= 0, () => onPageClick(pageIndex - 1)));

    const range = 1;
    const startPage = Math.max(0, pageIndex - range);
    const endPage = Math.min(totalPages - 1, pageIndex + range);

    // Show first page if not in range
    if (startPage > 0) {
        wrapper.appendChild(createButton('1', false, () => onPageClick(0)));
        if (startPage > 1) {
            wrapper.appendChild(createEllipsis());
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const isActive = i === pageIndex;
        wrapper.appendChild(createButton((i + 1).toString(), false, () => onPageClick(i), isActive ? 'active' : ''));
    }

    // Show last page if not in range
    if (endPage < totalPages - 1) {
        if (endPage < totalPages - 2) {
            wrapper.appendChild(createEllipsis());
        }
        wrapper.appendChild(createButton(totalPages.toString(), false, () => onPageClick(totalPages - 1)));
    }

    // Next
    wrapper.appendChild(createButton('Next »', pageIndex >= totalPages - 1, () => onPageClick(pageIndex + 1)));

    return wrapper;
},

    createSidebar(categories = [], recentPosts = []) {
        const catList = categories.map(c => `<li><a href="#">${c}</a></li>`).join('');
        const recentList = recentPosts.map(p => `<li><a href="#">${p.title}</a></li>`).join('');
        return helper.el('aside', `
        <div class="sidebar-section">
          <h3>Categories</h3>
          <ul>${catList}</ul>
        </div>
        <div class="sidebar-section">
          <h3>Recent Posts</h3>
          <ul>${recentList}</ul>
        </div>
      `, {
            class: 'sidebar'
        });
    }
};