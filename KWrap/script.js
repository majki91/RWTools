const sideMenu = document.getElementById("sideMenu");
const mainContainer = document.getElementById("mainContainer");
const menuIcon1 = document.getElementById("menuIcon1");

function showHideSideMenu() {
    sideMenu.classList.toggle("hidden");
    if (sideMenu.classList.contains("hidden") === false) {
        menuIcon2.classList.remove("none");
        menuIcon1.classList.add("none");
        mainContainer.classList.add("blur");
    } else {
        menuIcon1.classList.remove("none");
        menuIcon2.classList.add("none");
        mainContainer.classList.remove("blur");
    }
}

mainContainer.addEventListener("click", () => {
    menuIcon1.classList.remove("none");
    menuIcon2.classList.add("none");
    mainContainer.classList.remove("blur");
    sideMenu.classList.add("hidden");
});

sideMenu.addEventListener("click", () => {
    menuIcon1.classList.remove("none");
    menuIcon2.classList.add("none");
    mainContainer.classList.remove("blur");
    sideMenu.classList.add("hidden");
});
const swiper = new Swiper(".mainSwiper", {
    // Optional parameters

    direction: "horizontal",
    loop: true,
    centeredSlides: false,
    slidesPerView: 1,
    autoplay: {
        delay: 2000
    },
    spaceBetween: 0,
    pagination: {
        el: ".swiper-pagination"
    }
});

 var swiper2 = new Swiper(".swiperGallery1", {
                spaceBetween: 0,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                scrollbar: {
                    el: ".swiper-scrollbar",
                    hide: false
                }
            });

 var swiper4 = new Swiper(".swiperGallery2", {
                spaceBetween: 0,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                scrollbar: {
                    el: ".swiper-scrollbar",
                    hide: false
                }
            });

 var swiper6 = new Swiper(".swiperGallery3", {
                spaceBetween: 0,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                scrollbar: {
                    el: ".swiper-scrollbar",
                    hide: false
                }
            });

            var swiper8 = new Swiper(".swiperGallery4", {
                spaceBetween: 0,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                scrollbar: {
                    el: ".swiper-scrollbar",
                    hide: false
                }
            });

            var swiper10 = new Swiper(".swiperGallery5", {
                spaceBetween: 0,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                scrollbar: {
                    el: ".swiper-scrollbar",
                    hide: false
                }
            });

            var swiper12 = new Swiper(".swiperGallery6", {
                spaceBetween: 0,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                scrollbar: {
                    el: ".swiper-scrollbar",
                    hide: false
                }
            });

            var swiper13 = new Swiper(".swiperGallery7", {
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                scrollbar: {
                    el: ".swiper-scrollbar",
                    hide: true
                }
            });

silktideCookieBannerManager.updateCookieBannerConfig({
    background: {
        showBackground: true
    },
    cookieIcon: {
        position: "bottomLeft"
    },
    cookieTypes: [
        {
            id: "necessary",
            name: "Niezbędne",
            description:
                "<p>Te pliki cookie są niezbędne do prawidłowego funkcjonowania witryny i nie można ich wyłączyć. Pomagają one między innymi w logowaniu i ustawianiu preferencji prywatności.</p>",
            required: true,
            onAccept: function () {
                console.log("Add logic for the required Necessary here");
            }
        },
        {
            id: "analytics",
            name: "Analityczne",
            description:
                "<p>Te pliki cookie pomagają nam ulepszać witrynę, śledząc, które strony są najpopularniejsze i w jaki sposób użytkownicy poruszają się po witrynie.</p>",
            defaultValue: true
            /*
                        onAccept: function () {
                            gtag("consent", "update", {
                                analytics_storage: "granted"
                            });
                            dataLayer.push({
                                event: "consent_accepted_analytics"
                            });
                        },
                        onReject: function () {
                            gtag("consent", "update", {
                                analytics_storage: "denied"
                            });
                        }
                        */
        }
        /*{
                            id: "advertising",
                            name: "Reklamowe",
                            description:
                                "<p>Te pliki cookie zapewniają dodatkowe funkcje i personalizację, aby poprawić Twoje doświadczenia. Mogą być ustawione przez nas lub przez partnerów, z których usług korzystamy.</p>",
                            defaultValue: false

                        onAccept: function () {
                            gtag("consent", "update", {
                                ad_storage: "granted",
                                ad_user_data: "granted",
                                ad_personalization: "granted"
                            });
                            dataLayer.push({
                                event: "consent_accepted_advertising"
                            });
                        },
                        onReject: function () {
                            gtag("consent", "update", {
                                ad_storage: "denied",
                                ad_user_data: "denied",
                                ad_personalization: "denied"
                            });
                        }
                        }
                        */
    ],
    text: {
        banner: {
            description:
                '<p>Na naszej stronie internetowej używamy plików cookie w celu poprawnego działania animacji (1 godzina ważności ciasteczka) oraz do analizy ruchu. Korzystając ze strony, wyrażasz zgodę na użycie cookies. <a href="polityka-prywatnosci.html" target="_blank">Polityka prywatności.</a></p>',
            acceptAllButtonText: "Zaakceptuj wszystkie",
            acceptAllButtonAccessibleLabel: "Zaakceptuj wszystkie cookies",
            rejectNonEssentialButtonText: "Odrzuć niewymagane",
            rejectNonEssentialButtonAccessibleLabel:
                "Odrzuć niewymagane cookies",
            preferencesButtonText: "Preferencje",
            preferencesButtonAccessibleLabel: "Przełącz preferencje"
        },
        preferences: {
            title: "Dostosuj swoje preferencje dotyczące plików cookie",
            description:
                '<p>Szanujemy Twoje prawo do prywatności. Możesz wybrać opcję odrzucenia niektórych typów plików cookie. Twoje preferencje dotyczące plików cookie będą miały zastosowanie w całej naszej witrynie. <a href="polityka-prywatnosci.html" target="_blank">Polityka prywatności.</a></p>',
        
            creditLinkText: "Get this banner for free",
            creditLinkAccessibleLabel: "Get this banner for free"
        }
    }
});

function setCookie(name, value, hoursToLive) {
    // Encode value in order to escape semicolons, commas, and whitespace
    let cookie = name + "=" + encodeURIComponent(value);

    if (typeof hoursToLive === "number") {
        /* Sets the max-age attribute so that the cookie expires
            after the specified number of days */
        cookie += "; max-age=" + hoursToLive * 60 * 60;

        document.cookie = cookie;
        console.log("hours to live: " + hoursToLive);
    }
}

function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    let cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        /* Removing whitespace at the beginning of the cookie name
            and compare it with the given string */
        if (name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // Return null if not found
    return null;
}

function checkCookie() {
    // Get cookie using our custom function
    let first = getCookie("visited");

    console.log("after get:" + first);

    if (first != null) {
        alert("Welcome again");
        console.log("after if true:" + first);
    }
    if (first === null) {
        alert("Welcome new user");
        setCookie("visited", true, 1);
        console.log("after if null:" + first);
    }
}

function resetCookie() {
    setCookie("visited", "", 0);
}

//checkCookie();

const loader = document.getElementById("preloader");
window.onload = () => {
    setTimeout(() => {
        loader.classList.add("preloader-hidden");
    }, 2500);
};
