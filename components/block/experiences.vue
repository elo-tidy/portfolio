<script lang="ts" setup>
import type { Database } from "~/types/supabase";
import type { Xp } from "~/types/homeSections";

const client = useSupabaseClient<Database>();
const nuxtApp = useNuxtApp();

const { data, error } = await useAsyncData<Xp>(
    "Experiences",

    async () => {
        const cachedData =
            nuxtApp.payload.data["Experiences"] ||
            nuxtApp.static.data["Experiences"];

        if (cachedData) {
            return cachedData as Xp;
        }

        let { data, error } = await client.rpc("get_experiences_data");
        if (error) {
            throw error;
        }
        return data as object as Xp;
    },
);

const containerRef = ref<null>(null);
// const slides = ref(Array.from({ length: data.value?.length ?? 0 }));

const swiper = useSwiper(containerRef, {
    a11y: {
        prevSlideMessage: "Voir les expériences précédentes",
        nextSlideMessage: "Voir les expériences suivantes",
    },
    autoHeight: true,
    keyboard: {
        enabled: false,
    },
    watchSlidesProgress: true,

    navigation: {
        nextEl: ".swiper-btn-next",
        prevEl: ".swiper-btn-prev",
    },
    scrollbar: false,
    mousewheel: false,
    effect: "creative",
    creativeEffect: {
        prev: {
            translate: [0, "-100%", 0],
            opacity: 0,
        },
        next: {
            translate: [0, "100%", 0],
            opacity: 0,
        },
    },
    speed: 800,
    // direction: "vertical",
    // injectStyles: [`.swiper-wrapper {flex-direction:column;}`],
});

onMounted(() => {});
</script>
<template>
    <div v-if="data" id="experiences" class="section">
        <div id="xp-content" class="bloc">
            <genericTitle title="Parcours professionnel et formations" />

            <swiper-container id="XpSwiper" ref="containerRef" :init="false">
                <swiper-slide
                    v-for="slideGr in data"
                    class="slide flex flex-col"
                >
                    <div
                        v-for="(slide, id) in slideGr"
                        :class="[
                            'slide-item grid gap-2 sm:grid-cols-1 md:grid-cols-10 lg:grid-cols-25 lg:gap-3',
                            id % 2 === 0 ? 'even' : 'odd',
                            slide.gitBranch === true ? 'git-branch' : null,
                            slide.course === true ? 'formation' : null,
                        ]"
                        :data-type="slide.course === true ? 'formation' : 'xp'"
                    >
                        <GenericSlideItem :slide="slide" />
                    </div>
                </swiper-slide>
            </swiper-container>

            <div class="swiper-nav">
                <button
                    class="swiper-btn-prev"
                    type="button"
                    title="Voir les expériences précédentes"
                >
                    <span class="sr-only"
                        >Voir les expériences précédentes</span
                    >
                </button>
                <button
                    class="swiper-btn-next"
                    type="button"
                    title="Voir les expériences suivantes"
                >
                    <span class="sr-only">Voir les expériences suivantes</span>
                </button>
            </div>
        </div>
    </div>
</template>
<style lang="css" scoped>
@reference "~/assets/styles/config/utilities.css";
@import "~/assets/styles/experiences.css";
</style>
