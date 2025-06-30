<script lang="ts" setup>
import type { Database } from "~/types/supabase";
import type { Skills } from "~/types/homeSections";
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
    return subtype === "outils et ressources" || "outils de prototyping"
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
                                        height="40"
                                        alt=""
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
@import "~/assets/styles/skills.css";
</style>
