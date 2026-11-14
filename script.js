
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. MENGAMBIL ELEMEN HTML
    // =====================================

    const content = document.querySelector(".content");

    const searchInput = document.getElementById("search-menu");

    const searchButton = document.getElementById("search-button");

    const categories = document.querySelectorAll(".category");


    // Membuat pesan ketika menu tidak ditemukan

    const noResults = document.createElement("p");

    noResults.className = "no-results";

    noResults.textContent = "Menu tidak ditemukan.";

    noResults.hidden = true;

    content.insertBefore(noResults, content.firstChild);


    // =====================================
    // 2. MENCARI JUDUL KELOMPOK KATEGORI
    // =====================================

    function getGroupHeading(section) {

        let previous = section.previousElementSibling;

        while (previous && previous.tagName !== "H3") {

            previous = previous.previousElementSibling;

        }

        return previous;

    }


    // =====================================
    // 3. FUNGSI PENCARIAN MENU
    // =====================================

    function searchMenu() {

        const keyword = searchInput.value.trim().toLowerCase();

        let totalFound = 0;


        categories.forEach(function (section) {

            const categoryName =
                section.querySelector("h4")?.textContent.toLowerCase() || "";

            const groupHeading = getGroupHeading(section);

            const groupName =
                groupHeading?.textContent.toLowerCase() || "";

            const products = section.querySelectorAll(".product-card");


            // Jika kolom pencarian kosong

            if (keyword === "") {

                section.hidden = false;

                products.forEach(function (product) {

                    product.hidden = false;

                });

                totalFound += products.length;

                return;

            }


            // Kategori yang belum memiliki produk

            if (products.length === 0) {

                section.hidden = true;

                return;

            }


            // Memeriksa nama kategori atau kelompok

            const categoryMatches =
                categoryName.includes(keyword) ||
                groupName.includes(keyword);


            let foundInCategory = 0;


            products.forEach(function (product) {

                const productName =
                    product.textContent.toLowerCase();

                const matches =
                    categoryMatches || productName.includes(keyword);


                product.hidden = !matches;


                if (matches) {

                    foundInCategory++;

                }

            });


            // Menyembunyikan kategori yang tidak sesuai

            section.hidden = foundInCategory === 0;

            totalFound += foundInCategory;

        });


        // =====================================
        // 4. MENYEMBUNYIKAN JUDUL KATEGORI KOSONG
        // =====================================

        const headings = content.querySelectorAll(":scope > h3");

        headings.forEach(function (heading) {

            let next = heading.nextElementSibling;

            let hasVisibleCategory = false;


            while (next && next.tagName !== "H3") {

                if (
                    next.classList.contains("category") &&
                    !next.hidden
                ) {

                    hasVisibleCategory = true;

                }

                next = next.nextElementSibling;

            }


            heading.hidden =
                keyword !== "" && !hasVisibleCategory;

        });


        // =====================================
        // 5. PESAN JIKA PRODUK TIDAK DITEMUKAN
        // =====================================

        noResults.hidden =
            keyword === "" || totalFound > 0;

    }


    // =====================================
    // 6. AKTIVASI PENCARIAN
    // =====================================

    searchInput.addEventListener("input", searchMenu);

    searchButton.addEventListener("click", searchMenu);


    // Pencarian menggunakan tombol Enter

    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            searchMenu();

        }

    });


    // =====================================
    // 7. EFEK SIDEBAR KATEGORI AKTIF
    // =====================================

    const sidebarLinks =
        document.querySelectorAll(".sidebar a[href^='#']");


    sidebarLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            sidebarLinks.forEach(function (item) {

                item.classList.remove("active");

            });

            link.classList.add("active");

        });

    });


    // =====================================
    // 8. FORMULIR RESERVASI
    // =====================================

    const reservationForm =
        document.querySelector("#layanan-popup form");


    if (reservationForm) {

        reservationForm.addEventListener("submit", function (event) {

            event.preventDefault();

            alert(
                "Formulir berhasil diisi. Namun, data belum tersimpan karena website belum terhubung ke server."
            );

        });

    }

});
