var banner_index = -1;

const banner = document.querySelector(".banner");
const carrousel_icon = document.querySelector("#carrousel_icon")

setInterval(() => {
    banner_index++;
    if(banner_index > banner.children.length - 1)
    {
        for (let i = 0; i < banner.children.length; i++) {
            banner.children[i].style.transform = `translateX(${100 * i}%)`
        }

        banner_index = 0;
    }
    carrousel_icon.children[banner_index - 1 == -1 ? carrousel_icon.children.length - 1 : banner_index - 1].classList.remove("big")
    carrousel_icon.children[banner_index].classList.add("big")
    banner.children[banner_index].style.transform = `translateX(-${100 * (banner_index)}%)`
}, 15000);