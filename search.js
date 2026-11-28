document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("site-search-input");
    const searchBtn = document.getElementById("site-search-btn");
    if (!searchInput) return;

    const cards = Array.from(document.querySelectorAll(".product-card"));
    const categories = Array.from(document.querySelectorAll(".category"));
    const groupHeadings = Array.from(document.querySelectorAll(".content > h3"));
    const noResultsEl = document.querySelector(".no-results");
    const isMenuPage = cards.length > 0;

    const MENU_PAGE_URL = "menu.html";

    function getCardSearchText(card) {
        const name = card.querySelector("h5")?.textContent || "";
        const price = card.querySelector("p")?.textContent || "";
        const desc = card.dataset.description || "";
        const imgAlt = card.querySelector("img")?.alt || "";
        const categoryTitle = card.closest(".category")?.querySelector("h4")?.textContent || "";
        return `${name} ${price} ${desc} ${imgAlt} ${categoryTitle}`.toLowerCase();
    }

    function filterMenu(keyword) {
        const query = keyword.trim().toLowerCase();
        let visibleCount = 0;

        cards.forEach((card) => {
            const haystack = getCardSearchText(card);
            const isMatch = !query || haystack.includes(query);
            card.hidden = !isMatch;
            if (isMatch) visibleCount++;
        });

        categories.forEach((category) => {
            const visibleCards = category.querySelectorAll(".product-card:not([hidden])").length;
            category.hidden = visibleCards === 0;
        });

        groupHeadings.forEach((heading) => {
            let sibling = heading.nextElementSibling;
            let hasVisibleCategory = false;

            while (sibling && sibling.tagName !== "H3") {
                if (sibling.classList.contains("category") && !sibling.hidden) {
                    hasVisibleCategory = true;
                    break;
                }
                sibling = sibling.nextElementSibling;
            }
            heading.hidden = !hasVisibleCategory;
        });

        if (noResultsEl) {
            noResultsEl.hidden = visibleCount > 0 || !query;
        }
    }

    function goToMenuSearch(query = "") {
        const params = new URLSearchParams();
        if (query.trim()) {
            params.set("cari", query.trim());
        }
        params.set("fokus", "1");
        window.location.href = `${MENU_PAGE_URL}?${params.toString()}`;
    }

    function submitSearch() {
        const query = searchInput.value.trim();

        if (isMenuPage) {
            filterMenu(query);
            const url = new URL(window.location.href);
            if (query) {
                url.searchParams.set("cari", query);
            } else {
                url.searchParams.delete("cari");
            }
            window.history.replaceState({}, "", url);
        } else {
            goToMenuSearch(query);
        }
    }

    // Di halaman menu: filter langsung saat mengetik
    searchInput.addEventListener("input", () => {
        if (isMenuPage) {
            filterMenu(searchInput.value);
        }
    });

    // Tekan Enter untuk memfilter di menu, atau pindah ke menu dari halaman lain
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            submitSearch();
        }
    });

    // Klik ikon kaca pembesar untuk menjalankan pencarian
    if (searchBtn) {
        searchBtn.addEventListener("click", submitSearch);
    }

    // Di halaman menu: terapkan kata kunci dari URL & fokuskan kursor jika diminta
    if (isMenuPage) {
        const params = new URLSearchParams(window.location.search);
        const initialQuery = params.get("cari") || "";
        const shouldFocus = params.get("fokus") === "1";

        if (initialQuery) {
            searchInput.value = initialQuery;
            filterMenu(initialQuery);
        }

        if (shouldFocus || initialQuery) {
            searchInput.focus();
            const len = searchInput.value.length;
            searchInput.setSelectionRange(len, len);
        }
    }
});