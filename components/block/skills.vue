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
</script>
<template>
    <div
        v-if="data"
        id="skills"
        class="section flex min-h-screen grid-cols-1 flex-col"
    >
        <div
            id="skills-content"
            class="bloc grid grow grid-cols-1 lg:grid-cols-2"
        >
            <div id="hard-skills">
                <genericTitle :title="data.hard_skills.hard_skills_title" />
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
                            class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6"
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
                        {{ data.missing_skills.description }}
                    </p>
                </div>
            </div>
            <div id="soft-skills">
                <genericTitle :title="data.soft_skills.soft_skills_title" />
                <ul
                    class="skills grid grid-cols-1 md:grid-cols-2 md:gap-x-2 lg:grid-cols-1"
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
