<script setup lang="ts">
import { useActiveSection } from "~/composables/useActiveSection";
const isOpen = ref(false);
const dataState = ref("closed");
const dataTitle = ref("Ouvrir le menu principal");
const ariaHidden = ref(!isOpen.value);
const { activeSection } = useActiveSection();

const toggleMenu = (): void => {
    isOpen.value = !isOpen.value;
    isOpen.value
        ? ((dataState.value = "open"),
          (dataTitle.value = "Fermer le menu principal"),
          document.body.classList.add("reveal-is-open"))
        : ((dataState.value = "closed"),
          (dataTitle.value = "Ouvrir le menu principal"),
          document.body.classList.remove("reveal-is-open"));
    ariaHidden.value = !isOpen.value;
};

const removeTransition = () => {
    const currentDevice = getBreakpoints();
    if (currentDevice !== "is-lg+") {
        const headerNav = document.querySelector("#header-nav");
        headerNav?.classList.add("no-transition");
        setTimeout(() => {
            headerNav?.classList.remove("no-transition");
            toggleMenu();
        }, 500);
    }
};
onMounted(() => {
    const currentDevice = getBreakpoints();
    const resetRevealOverlay = (currentDevice: string) => {
        if (
            currentDevice === "is-lg+" &&
            document.body.classList.contains("reveal-is-open")
        ) {
            // document.body.classList.remove("reveal-is-open");
            toggleMenu();
        }
    };

    const menuAria = (currentDevice: string) => {
        if (currentDevice === "is-lg+") {
            if (ariaHidden.value !== false) {
                ariaHidden.value = false;
            }
        } else {
            if (ariaHidden.value !== true) {
                ariaHidden.value = true;
            }
        }
    };
    menuAria(currentDevice);
    // resetRevealOverlay();
    window.addEventListener("resize", () => {
        const currentDevice = getBreakpoints();
        resetRevealOverlay(currentDevice);
        menuAria(currentDevice);
    });
});
</script>
<template>
    <LayoutColorMode :isOpen="isOpen" :class="isOpen ? 'show-tools' : null" />
    <button
        class="visible lg:invisible"
        id="hamburger"
        aria-haspopup="dialog"
        aria-controls="header-nav"
        :data-state="dataState"
        :aria-expanded="isOpen"
        :title="dataTitle"
        @click="toggleMenu()"
        type="button"
    >
        <span class="inner">
            <span class="sr-only">
                {{ dataTitle }}
            </span>
        </span>
    </button>
    <div
        id="header-nav"
        class="flex flex-wrap content-center justify-center lg:inline-block"
        :aria-hidden="ariaHidden"
    >
        <nav role="navigation" aria-label="Menu">
            <ul>
                <li :class="{ active: activeSection === 'about' }">
                    <NuxtLink
                        :aria-current="activeSection === 'about'"
                        to="#about"
                        @click="removeTransition"
                        ><span>Profil</span></NuxtLink
                    >
                </li>
                <li :class="{ active: activeSection === 'skills' }">
                    <NuxtLink
                        :aria-current="activeSection === 'skills'"
                        to="#skills"
                        @click="removeTransition"
                        ><span>Compétences</span></NuxtLink
                    >
                </li>
                <li :class="{ active: activeSection === 'experiences' }">
                    <NuxtLink
                        :aria-current="activeSection === 'experiences'"
                        to="#experiences"
                        @click="removeTransition"
                        ><span
                            >Parcours professionnel et formations</span
                        ></NuxtLink
                    >
                </li>
            </ul>
        </nav>
    </div>
</template>
