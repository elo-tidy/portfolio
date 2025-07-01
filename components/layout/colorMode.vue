<script setup lang="ts">
interface Props {
    isOpen?: boolean;
}
const props = defineProps<Props>();

const isPanelOpen = ref(false);

const dataState = ref("closed");
const dataTitle = ref("Ouvrir le panneau de sélection de couleurs");

const togglePanel = (): void => {
    console.log("test" + isPanelOpen);
    isPanelOpen.value = !isPanelOpen.value;
    isPanelOpen.value
        ? ((dataState.value = "open"),
          (dataTitle.value = "Fermer le panneau de sélection de couleurs"))
        : ((dataState.value = "closed"),
          (dataTitle.value = "Ouvrir le panneau de sélection de couleurs"));
    // Toggle tabindex between -1 and 0 for color panel buttons
    document.querySelectorAll("#color-panel button").forEach((btn: Element) => {
        const currentTabIndex = btn.getAttribute("tabindex");
        btn.setAttribute("tabindex", currentTabIndex === "0" ? "-1" : "0");
    });
};

const changePrimaryColor = (
    colorL: string,
    colorC: string,
    colorH: string,
): void => {
    const colorInit: string = `${colorL} ${colorC} ${colorH}`;
    document.documentElement.style.setProperty("--primary-init", colorInit);
    document.documentElement.style.setProperty("--primary-init-l", colorL);
    document.documentElement.style.setProperty("--primary-init-c", colorC);
    document.documentElement.style.setProperty("--primary-init-h", colorH);
    localStorage.setItem("primary-init", colorInit);
    localStorage.setItem("primary-init-l", colorL);
    localStorage.setItem("primary-init-c", colorC);
    localStorage.setItem("primary-init-h", colorH);
};

const colorMode = useColorMode();
const currentColorMode = ref<string>(colorMode.preference);
const oppositeColorMode = ref<string>(
    currentColorMode.value === "dark" ? "light" : "dark",
);
const oppositeColorModeTitle = ref<string>(
    oppositeColorMode.value === "dark" ? "foncé" : "clair",
);

const toggleColorMode = (): void => {
    currentColorMode.value = colorMode.preference;
    colorMode.preference = currentColorMode.value === "dark" ? "light" : "dark";
    oppositeColorMode.value =
        oppositeColorMode.value === "dark" ? "light" : "dark";
    oppositeColorModeTitle.value =
        oppositeColorMode.value === "dark" ? "foncé" : "clair";
};
onMounted(() => {});

watch(
    () => props.isOpen,
    (newVal) => {
        if (newVal === false && isPanelOpen.value === true) {
            togglePanel();
        }
    },
);
</script>
<template>
    <div id="color-tools" class="grid grid-cols-2 gap-1">
        <div id="color-choice" class="grid grid-flow-row">
            <button
                type="button"
                :title="dataTitle"
                aria-controls="color-panel"
                :aria-expanded="isPanelOpen"
                :data-state="dataState"
                class="button shrink"
                @click="togglePanel"
            >
                <span>Changer le thème de couleur</span>
            </button>
            <div id="color-panel" :aria-hidden="!isPanelOpen">
                <ul class="flex flex-row">
                    <li>
                        <button
                            type="button"
                            class="orange"
                            tabindex="-1"
                            title="Orange"
                            @click="changePrimaryColor('80%', '0.257', '442')"
                        >
                            <span class="sr-only">orange</span>
                        </button>
                    </li>

                    <li>
                        <button
                            type="button"
                            class="jaune"
                            tabindex="-1"
                            title="Jaune"
                            @click="changePrimaryColor('88%', '0.257', '472')"
                        >
                            <span class="sr-only">jaune</span>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            class="vert-init"
                            title="Vert"
                            tabindex="-1"
                            @click="
                                changePrimaryColor('80%', '0.257', '133.88')
                            "
                        >
                            <span class="sr-only">Vert</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <ClientOnly>
            <button
                type="button"
                id="color-mode-toggle"
                :title="`Visualiser le site en mode ${oppositeColorModeTitle}`"
                :data-mode-color="currentColorMode"
                @click="toggleColorMode"
                class="button"
            >
                <span>
                    Visualiser le site en mode
                    {{ oppositeColorModeTitle }}</span
                >
            </button>
        </ClientOnly>
    </div>
</template>
