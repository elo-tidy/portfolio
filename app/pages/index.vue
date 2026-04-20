<script lang="ts" setup>
import { useActiveSection } from "~/composables/useActiveSection";

const { activeSection, setActiveSection } = useActiveSection();
const observerOptions = {
    root: null,
    rootMargin: "0px 0px -99% 0px",
    threshold: 0,
};
// const imageReady = ref(false);
const sections = ref<HTMLElement[]>([]);
let observer: IntersectionObserver | null = null;

const unobserveSections = () => {
    if (!observer) return;

    const currentDevice = getBreakpoints();

    if (currentDevice !== "is-lg+") {
        sections.value.forEach((el) => observer!.unobserve(el));
    } else {
        sections.value.forEach((el) => observer!.observe(el));
    }
};

onMounted(async () => {
    // const img = new Image();
    // img.src = "/bgi.webp";
    // img.onload = () => {
    //     imageReady.value = true;
    // };
    sections.value = Array.from(document.querySelectorAll(".section"));

    observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        }
    }, observerOptions);

    sections.value.forEach((el) => observer?.observe(el));

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

    unobserveSections();
    window.addEventListener("resize", unobserveSections);

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
onUnmounted(() => {
    window.removeEventListener("resize", unobserveSections);
    observer?.disconnect();
});
</script>
<template>
    <div class="container-bloc mx-auto">
        <blockAbout :class="{ active: activeSection === 'about' }" />
        <blockSkills :class="{ active: activeSection === 'skills' }" />
        <blockExperiences
            :class="{ active: activeSection === 'experiences' }"
        />
    </div>
    <div id="anim-img">
        <NuxtImg
            src="/bgi.webp"
            width="1920"
            height="1229"
            alt=""
            priority
            fetchpriority="high"
            loading="eager"
            quality="55"
            preload
        />
    </div>
    <!-- <div v-if="imageReady" id="anim-img">
        <NuxtImg src="bgi.webp" width="1920" height="1229" alt="" />
    </div> -->
</template>
