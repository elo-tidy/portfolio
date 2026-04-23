<script lang="ts" setup>
import type { Database } from "~/../types/supabase";
import type { Skills } from "~/../types/homeSections";
const client = useSupabaseClient<Database>();
const nuxtApp = useNuxtApp();

const { data, error } = await useAsyncData<Skills>(
    "Skills",

    async () => {
        const cachedData =
            nuxtApp.payload.data["Skills"] || nuxtApp.static.data["Skills"];

        if (cachedData) {
            return cachedData as Skills;
        }

        let { data, error } = await client.rpc("get_skills_data");
        if (error) {
            throw error;
        }
        return data as Skills;
    },
);

const group_wording = (subtype: string) => {
    // return subtype === "outils et ressources" || "outils de prototyping"
    return subtype === "outils et ressources" || subtype === "outils de prototyping"
        ? subtype
        : `Liste des compétences en ${subtype}`;
};

onMounted(() => {
    const softSkillItems = document.querySelectorAll("#soft-skills li");
    const hardSkillGroups = document.querySelectorAll(".skills > li");
    let hardSkillItems: HTMLElement[] = [];
    hardSkillGroups.forEach((group) => {
        group.querySelectorAll(".skill-item").forEach((item) => {
            hardSkillItems.push(item as HTMLElement);
        });
    });

    function cycleFocus(
        items: NodeListOf<Element> | HTMLElement[],
        delay: number,
    ) {
        let index = 0;
        function focus() {
            items.forEach((item) => item.classList.remove("focus"));
            if (items.length) {
                (items[index] as HTMLElement).classList.add("focus");
                index = (index + 1) % items.length;
            }
        }
        focus();
        const interval = window.setInterval(focus, delay);
        return interval;
    }

    const delay = 2500;
    const softInterval = cycleFocus(softSkillItems, delay);
    const hardInterval = cycleFocus(hardSkillItems, delay);

    onBeforeUnmount(() => {
        clearInterval(softInterval);
        clearInterval(hardInterval);
    });
});
</script>
<template>
    <div
        v-if="data"
        id="skills"
        class="section flex min-h-screen grid-cols-1 flex-col"
    >
        <genericTitle title="Compétences" />
        <div
            id="skills-content"
            class="bloc grid grow grid-cols-1 lg:grid-cols-5 xl:grid-cols-2"
        >
            <div
                id="hard-skills"
                class="grid-cols-1 lg:col-span-3 xl:col-span-1"
            >
                <genericTitle
                    :subtitle="data.hard_skills.hard_skills_title"
                    :removeBloctitleClass="true"
                />
                <ul class="skills">
                    <li
                        v-for="(skill, key) in data.hard_skills
                            .hard_skills_list"
                        :aria-describedby="`group-${key}`"
                    >
                        <span :id="`group-${key}`" class="sr-only">
                            {{ group_wording(skill.subtype) }}
                        </span>
                        <ul
                            class="grid grid-cols-3 gap-x-1 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6"
                        >
                            <li
                                v-for="item in skill.skills"
                                class="skill-item flex flex-col-reverse flex-wrap justify-center text-center"
                            >
                                <span class="skill-label">{{ item.name }}</span>
                                <span
                                    v-if="item.icon"
                                    class="skill-icon m-auto"
                                >
                                    <NuxtImg
                                        :src="`/icons/${item.icon}`"
                                        height="45"
                                        alt=""
                                        loading="lazy"
                                        fetchpriority="low"
                                    />
                                </span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="highlight">
                    <p class="highlight-title">
                        {{ data.missing_skills.txt }}
                    </p>
                    <p class="highlight-desc">
                        <span>{{ data.missing_skills.description }}</span>
                    </p>
                </div>
            </div>
            <div
                id="soft-skills"
                class="grid-cols-1 lg:col-span-2 xl:col-span-1"
            >
                <genericTitle
                    :subtitle="data.soft_skills.soft_skills_title"
                    :removeBloctitleClass="true"
                />
                <ul
                    class="skills list grid grid-cols-1 md:grid-cols-2 md:gap-x-2 lg:grid-cols-1"
                >
                    <li v-for="skill in data.soft_skills.soft_skills_list">
                        {{ skill }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="css" scoped>
    @reference "~/assets/styles/config/utilities.css";
    /* @import "~/assets/styles/skills.css"; */
    #skills {
        &::after {
            content: "";
            position: absolute;

            background: linear-gradient(
                0deg,
                transparent,
                var(--primary-30),
                transparent
            );
            width: 2px;
            height: 80%;
            left: 50%;
            transform: translateX(50%);
            z-index: 2;
        }
        #skills-content {
            gap: 10rem;
        }
        .skills {
            padding-top: clamp(2em, -1.31em + 5.172vw, 5em);
            padding-bottom: clamp(2em, -1.31em + 5.172vw, 5em);
            margin-bottom: 0;
        }

        #hard-skills {
            li {
                font-size: 1em;
            }
            ul {
                margin-bottom: 0;
            }
            .skill-item {
                margin: 0 0 1.5rem;
                .skill-label {
                    @apply title-picto-small;
                    margin-top: 1rem;
                    min-height: 2.4rem;
                    max-width: 100%;
                    display: inline-flex;
                    justify-content: center;
                }
                .skill-icon {
                    filter: drop-shadow(0 0 0.5rem transparent);
                    /* transition: all 1s ease; */
                    img {
                        height: clamp(3rem, 1.897rem + 1.724vw, 4rem);
                        max-width: 6rem;
                        transition: all 1s ease;
                        transform: scale(0.9);
                    }
                }
                &.focus .skill-icon {
                    filter: drop-shadow(0 0 0.5rem var(--primary-50));
                    img {
                        transform: scale(1);
                    }
                }
            }
        }
    }
    .mode-light {
        #skills {
            & #hard-skills {
                & .skill-item {
                    .skill-icon img,
                    .highlight-desc {
                        filter: invert(0.95);
                    }
                    .highlight-desc span {
                        filter: invert(1);
                    }
                    &.focus .skill-icon {
                        filter: drop-shadow(0 0 0.5rem var(--primary-80));
                    }
                }
            }
        }
    }

    /************************/
    /****** Responsive ******/
    /************************/
    @media only screen and (64rem <= width < 89.375rem) {
        #skills {
            &::after {
                left: calc(
                    60% - var(--gap) * 4 / 5 * 3 + var(--gap) * 2.5 +
                        (100% - var(--container)) / 2
                );
            }
        }
    }

    @media only screen and (0 < width < 64rem) {
        #skills {
            &::after {
                display: none;
            }
            #skills-content {
                gap: 4rem;
            }
            #hard-skills {
                .skill-item {
                    .skill-label {
                        font-size: 1rem;
                    }
                }
            }

            #soft-skills {
                .skills {
                    margin-top: -2rem;
                    margin-bottom: -3rem;
                }
                li:first-child {
                    margin-top: 1rem;
                }
            }
        }
    }

</style>
