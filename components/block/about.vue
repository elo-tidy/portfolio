<script setup lang="ts">
import type { Database } from "~/types/supabase";
import type { About } from "~/types/homeSections";
const client = useSupabaseClient<Database>();
const nuxtApp = useNuxtApp();

const { data, error } = await useAsyncData<About>(
    "About",

    async () => {
        const cachedData =
            nuxtApp.payload.data["intro"] || nuxtApp.static.data["intro"];

        if (cachedData) {
            return cachedData as About;
        }

        // const { data, error } = await client.from("intro").select();
        let { data, error } = await client.rpc("get_intro_data").select();
        // console.log("data", data);
        if (error) {
            // console.error("Error fetching intro:", error.message);
            throw error;
        }

        // return data[0] as Tables<"intro">;
        return data as object as About;
    },
);
</script>
<template>
    <div
        v-if="data"
        id="about"
        class="container-bloc flex h-screen grid-cols-1 flex-col"
    >
        <div id="intro-content" class="bloc grid grow">
            <div class="content-center">
                <!-- <genericTitle :data="data" /> -->
                <genericTitle
                    :title="data.title"
                    :subtitle="data.subtitle"
                    hn="1"
                />
                <div class="bloc-content">
                    <p>{{ data.description }}</p>
                    <genericTags :skills="data.skills" />
                    <genericCta
                        v-if="data.cvurl"
                        :newwindow="true"
                        :linktext="data.cvtxt"
                        :linkurl="data.cvurl"
                    />
                </div>
            </div>
        </div>
        <div
            id="intro-footer"
            class="relative grid shrink grid-cols-2 md:grid-cols-4"
        >
            <div class="intro-footer-item">
                <p class="footer-title">{{ data.locationtitle }}</p>
                <p>{{ data.locationdescription }}</p>
            </div>
            <div v-if="data.opquasturl" class="intro-footer-item">
                <p class="footer-title">
                    {{ data.opquasttitle }}
                </p>
                <p>
                    <a
                        :href="data.opquasturl"
                        :title="`${data.opquastdescription} (nouvelle fenêtre)`"
                        target="_blank"
                    >
                        {{ data.opquastdescription }}
                    </a>
                </p>
            </div>
            <div class="intro-footer-item">
                <p class="footer-title">{{ data.situationtitle }}</p>
                <p>{{ data.situationdescription }}</p>
            </div>
            <div class="intro-footer-item">
                <p class="footer-title">{{ data.xptitle }}</p>
                <p>{{ data.xpdescription }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
@reference "~/assets/styles/config/utilities.css";
@import "~/assets/styles/about.css";
</style>
