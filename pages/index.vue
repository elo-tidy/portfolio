<script lang="ts" setup>
const observerOptions = {
    root: null,
    rootMargin: "0px 0px -100% 0px",
    threshold: 0,
};
const imageReady = ref(false);

onMounted(() => {
    const img = new Image();
    img.src = "/bgi.webp"; // Image réelle (dans /public)
    img.onload = () => {
        imageReady.value = true;
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id: string | null = entry.target.getAttribute("id");
            const eltToActive: HTMLElement | null | undefined =
                document.querySelector(
                    `#header-nav a[href="#${id}"]`,
                )?.parentElement;
            /*const otherEl: HTMLElement | null | undefined =
                document.querySelector(
                    `#header-nav a:not([href="#${id}"])`,
                )?.parentElement;*/
            // const li = document.querySelectorAll("#header-nav li");
            if (entry.isIntersecting && eltToActive) {
                // eltToActive.className = "";
                // (eltToActive as HTMLElement).removeAttribute("style");
                eltToActive.classList.add("active");
                eltToActive.setAttribute("aria-current", "true");
                // aria-current="true"
                // getPrevNextEl();
            } else {
                eltToActive?.classList.remove("active");
                eltToActive?.removeAttribute("aria-current");
            }
        });
    }, observerOptions);
    document.querySelectorAll(".section").forEach((section) => {
        observer.observe(section);
    });

    /*const getPrevNextEl = function () {
        // const degre: number = 0;
        const transform: number = 1;
        const prevLi: boolean = true;
        const li = document.querySelectorAll("#header-nav li");
        const activeLi = document.querySelector("#header-nav li.active");
        if (activeLi) {
            let nextElement = activeLi.nextElementSibling;
            let nextIndex = 1;
            while (nextElement) {
                nextElement.className = "";
                nextElement.classList.add(`next-${nextIndex}`);
                (nextElement as HTMLElement).style.transform =
                    `translateY(calc(${transform * nextIndex}00% - 50%))`;
                nextElement = nextElement.nextElementSibling;
                nextIndex++;
            }
            let prevElement = activeLi.previousElementSibling;
            let prevIndex = 1;
            while (prevElement) {
                prevElement.className = "";
                prevElement.classList.add(`prev-${prevIndex}`);
                (prevElement as HTMLElement).style.transform =
                    `translateY(calc(-${transform * prevIndex}00% - 50%))`;
                prevElement = prevElement.previousElementSibling;
                prevIndex++;
            }
        }
        console.log("test");
    };*/

    const unobserveSections = () => {
        const currentDevice = getBreakpoints();

        if (currentDevice !== "is-lg+") {
            document.querySelectorAll(".section").forEach((section) => {
                observer.unobserve(section);
            });

            const navElt = document.querySelectorAll("#header-nav li");
            navElt.forEach((element) => {
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                }
            });
        } else {
            document.querySelectorAll(".section").forEach((section) => {
                observer.observe(section);
            });
        }
    };
    unobserveSections();
    window.addEventListener("resize", () => {
        unobserveSections();
    });
    const storedPrimary = localStorage.getItem("primary-init");
    const storedL = localStorage.getItem("primary-init-l");
    const storedC = localStorage.getItem("primary-init-c");
    const storedH = localStorage.getItem("primary-init-h");

    if (storedPrimary && storedL && storedC && storedH) {
        document.documentElement.style.setProperty(
            "--primary-init",
            storedPrimary,
        );
        document.documentElement.style.setProperty("--primary-init-l", storedL);
        document.documentElement.style.setProperty("--primary-init-c", storedC);
        document.documentElement.style.setProperty("--primary-init-h", storedH);
    }
});
</script>
<template>
    <div class="container-bloc mx-auto">
        <blockAbout />
        <blockSkills />
        <blockExperiences />
    </div>
    <div v-if="imageReady" id="anim-img">
        <NuxtImg src="bgi.webp" height="1920" alt="1229" />
    </div>
</template>
