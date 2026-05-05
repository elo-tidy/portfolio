<script lang="ts" setup>
import type { Database } from "~/../types/supabase";
import type { Xp } from "~/../types/homeSections";

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

const updatedExperiences = ref<Xp | null>(null);
const activeFilter = ref<"xp" | "course" | null>(null);
const loading = ref(false);
const loadFilteredData = async (
    rpcName: "get_experiences_xp_data" | "get_experiences_formations_data",
    filter: "xp" | "course",
) => {
    loading.value = true;
    const { data, error } = await client.rpc(rpcName);

    if (error) {
        console.error(`Error fetching ${rpcName}:`, error);
    } else {
        updatedExperiences.value = data as Xp;
        activeFilter.value = filter;
    }

    loading.value = false;
};
const resetData = () => {
    updatedExperiences.value = null;
    activeFilter.value = null;
};
const currentExperiences = computed(
    () => updatedExperiences.value ?? data.value,
);

const containerRef = ref<null>(null);
const activeIndex = ref(0);
// const slides = ref(Array.from({ length: data.value?.length ?? 0 }));

const swiper = useSwiper(containerRef, {
    a11y: {
        id: "XpSwiper",
        prevSlideMessage: "Voir les expériences précédentes",
        nextSlideMessage: "Voir les expériences suivantes",
        slideLabelMessage: "{{index}} sur {{slidesLength}}",
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
    pagination: {
        type: "custom",
        el: ".swiper-pagination",
        renderCustom: function (swiper, current, total) {
            return "<p>" + current + " / " + total + "</p>";
        },
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
    on: {
        slideChange() {
            activeIndex.value = swiper.instance.value?.activeIndex ?? 0;
        },
    },
});

const scrollToSliderTop = () => {
    const section = document.getElementById("XpSwiper");
    const yOffset: number =
        -1 * (document.getElementById("filters")?.clientHeight ?? 0);
    if (section) {
        const y =
            section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        setTimeout(() => {
            window.scrollTo({ top: y, behavior: "smooth" });
        }, 100);
    }
};

watch(loading, (isLoading) => {
    if (isLoading) {
        document.body.classList.add("reveal-is-open");
    } else {
        document.body.classList.remove("reveal-is-open");
    }
});
onMounted(() => {
    const stickyElement = document.querySelector<HTMLElement>("#filters");

    if (stickyElement) {
        window.addEventListener("scroll", () => {
            const rect = stickyElement.getBoundingClientRect();

            if (rect.top === 0) {
                stickyElement.classList.add("sticky-active");
            } else {
                stickyElement.classList.remove("sticky-active");
            }
        });
    }
});
</script>
<template>
    <div v-if="data" id="experiences" class="section">
        <div id="xp-content" class="bloc">
            <genericTitle title="Parcours professionnel et formations" />
            <div id="filters">
                <ul
                    class="grid grid-flow-dense justify-end justify-items-end gap-x-2 gap-y-2 md:grid-flow-col md:gap-y-0"
                >
                    <li class="cta">
                        <button
                            type="button"
                            title="Afficher uniquement les expériences"
                            class="button"
                            :aria-pressed="
                                activeFilter === 'xp' ? 'true' : 'false'
                            "
                            @click="
                                () =>
                                    loadFilteredData(
                                        'get_experiences_xp_data',
                                        'xp',
                                    )
                            "
                        >
                            Expériences
                        </button>
                    </li>
                    <li class="cta">
                        <button
                            type="button"
                            title="Afficher uniquement les formations"
                            class="button"
                            :aria-pressed="
                                activeFilter === 'course' ? 'true' : 'false'
                            "
                            @click="
                                () =>
                                    loadFilteredData(
                                        'get_experiences_formations_data',
                                        'course',
                                    )
                            "
                        >
                            Formations
                        </button>
                    </li>
                    <li class="cta col-span-2 md:col-span-1">
                        <button
                            type="button"
                            title="Afficher toutes les données"
                            class="button"
                            :aria-pressed="
                                activeFilter === null ? 'true' : 'false'
                            "
                            @click="resetData"
                        >
                            Toutes les données
                        </button>
                    </li>
                </ul>
            </div>
            <transition name="fade"
                ><div v-if="loading" class="loader-wrapper">
                    <div class="loader">
                        <p class="sr-only">Chargement en cours...</p>
                    </div>
                </div></transition
            >
            <swiper-container
                id="XpSwiper"
                ref="containerRef"
                :init="false"
                :class="loading ? 'loading' : null"
                :swiper="swiper"
            >
                <swiper-slide
                    v-for="(slideGr, i) in currentExperiences"
                    class="slide flex flex-col"
                    :aria-current="activeIndex === i ? 'true' : undefined"
                    :aria-hidden="activeIndex === i ? 'false' : 'true'"
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

            <div class="swiper-nav grid auto-cols-max grid-flow-col gap-2">
                <button
                    class="swiper-btn-prev"
                    type="button"
                    title="Voir les expériences précédentes"
                    @click="scrollToSliderTop"
                >
                    <span class="sr-only"
                        >Voir les expériences précédentes</span
                    >
                </button>
                <button
                    class="swiper-btn-next"
                    type="button"
                    title="Voir les expériences suivantes"
                    @click="scrollToSliderTop"
                >
                    <span class="sr-only">Voir les expériences suivantes</span>
                </button>
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </div>
</template>
<style lang="css" scoped>
@reference "~/assets/styles/config/utilities.css";
/* @import "~/assets/styles/experiences.css"; */
#experiences {
    #filters {
        position: sticky;
        top: 0;
        padding: 2rem 0;
        margin-top: 2rem;
        z-index: 2;
        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 50%;
            width: 100vw;
            transform: translateX(-50%);
            height: 100%;

            z-index: -1;
            transition: 0.3s all ease;
        }
        &.sticky-active::before {
            background-color: var(--dark-80);
            backdrop-filter: blur(0.5rem);
        }
        ul,
        li {
            margin: 0;
        }
    }
    #XpSwiper {
        /* position: relative;
            z-index: -1; */
        &.loading {
            &::before,
            .slide-item {
                opacity: 0.2;
            }
        }
        &::before {
            content: "";
            position: absolute;
            top: 3.5rem;
            left: clamp(0.7rem, -0.867rem + 1.531vw, 1rem);
            width: 0.2rem;
            height: calc(100% - 3.5rem);
            background-color: var(--light);
        }
    }

    .slide {
        padding-left: clamp(5rem, -73.367rem + 76.531vw, 20rem);
        /* overflow: hidden; */
        font-size: inherit;
        margin: 0;
    }
    .slide-item {
        padding: 3rem 1rem;
        position: relative;
    }
    .slide-item:not(.git-branch) {
        &::before {
            content: "";
            position: absolute;
            top: 9.8rem;
            left: clamp(-18.9rem, 72.6rem + -75vw, -4.2rem);
            width: clamp(1.5rem, -1.112rem + 2.551vw, 2rem);
            height: clamp(1.5rem, -1.112rem + 2.551vw, 2rem);
            background-color: var(--light);
            border-radius: 50%;
            transform: translateX(-50%);
        }
        &::after {
            border-radius: 0 5.4rem 0 0;
            border-top: 0.2rem solid var(--primary);
            border-right: 0.2rem solid var(--primary);
            content: "";
            position: absolute;
            top: clamp(10.4rem, 7.788rem + 2.551vw, 10.9rem);
            left: clamp(-19rem, 72.5rem + -75vw, -4.3rem);
            width: clamp(2.2rem, -14.518rem + 16.327vw, 5.4rem);
            height: calc(100% - clamp(6.8rem, 4.188rem + 2.551vw, 7.3rem));
            z-index: -1;
        }
    }

    .slide-item:not(:first-child) {
        background-image:
            repeating-linear-gradient(
                90deg,
                var(--primary),
                var(--primary) 0.4rem,
                transparent 0.4rem,
                transparent 0.8rem
            ),
            repeating-linear-gradient(
                180deg,
                var(--primary),
                var(--primary) 0.4rem,
                transparent 0.4rem,
                transparent 0.8rem
            ),
            repeating-linear-gradient(
                90deg,
                var(--primary),
                var(--primary) 0.4rem,
                transparent 0.4rem,
                transparent 0.8rem
            ),
            repeating-linear-gradient(
                180deg,
                var(--primary),
                var(--primary) 0.4rem,
                transparent 0.4rem,
                transparent 0.8rem
            );
        background-position:
            0.4rem 0,
            right top,
            left bottom,
            left top;
        background-repeat: repeat-x, repeat-y, repeat-x, repeat-y;
        background-size:
            100% 0.1rem,
            0,
            0,
            0;
    }
    .slide-item.odd {
        background-color: var(--dark-30);
    }

    .slide-item:last-child::after {
        height: calc(100% - 10rem);
    }
    .slide-item:last-child::after {
        display: none;
    }
    .swiper-nav {
        margin-left: clamp(5rem, -73.367rem + 76.531vw, 20rem);
        margin-top: 3rem;
    }
    .swiper-pagination p {
        margin: 0;
    }
}

@keyframes move-dash-right {
    to {
        background-position:
            12rem 0,
            right top,
            left bottom,
            left top;
    }
}
@-webkit-keyframes move-dash-right {
    to {
        background-position:
            12rem 0,
            right top,
            left bottom,
            left top;
    }
}
@-moz-keyframes move-dash-right {
    to {
        background-position:
            12rem 0,
            right top,
            left bottom,
            left top;
    }
}
@-o-keyframes move-dash-right {
    to {
        background-position:
            12rem 0,
            right top,
            left bottom,
            left top;
    }
}

@keyframes move-dash-left {
    to {
        background-position:
            -12rem 0,
            right top,
            left bottom,
            left top;
    }
}
@-webkit-keyframes move-dash-left {
    to {
        background-position:
            -12rem 0,
            right top,
            left bottom,
            left top;
    }
}
@-moz-keyframes move-dash-left {
    to {
        background-position:
            -12rem 0,
            right top,
            left bottom,
            left top;
    }
}
@-o-keyframes move-dash-left {
    to {
        background-position:
            -12rem 0,
            right top,
            left bottom,
            left top;
    }
}

@supports (animation-range: entry 0% exit 100%) {
    #experiences {
        view-timeline-name: --slide-item-scroll;
        view-timeline-axis: block;

        .slide-item:not(.odd):not(:first-child) {
            -webkit-animation: move-dash-right linear both;
            -moz-animation: move-dash-right linear both;
            -o-animation: move-dash-right linear both;
            animation: move-dash-right linear both;
            animation-timeline: view();
            animation-range: entry 0% exit 100%;
            animation-timeline: --slide-item-scroll;
        }
        .slide-item.odd:not(:first-child) {
            -webkit-animation: move-dash-left linear both;
            -moz-animation: move-dash-left linear both;
            -o-animation: move-dash-left linear both;
            animation: move-dash-left linear both;
            animation-timeline: view();
            animation-range: entry 0% exit 100%;
            animation-timeline: --slide-item-scroll;
        }
    }
}
</style>
