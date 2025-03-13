<script setup lang="ts">
import type { Database, Tables } from "~/types/supabase";
const client = useSupabaseClient<Database>();
const nuxtApp = useNuxtApp();

const { data, error } = await useAsyncData(
    "intro",

    async () => {
        const cachedData =
            nuxtApp.payload.data["intro"] || nuxtApp.static.data["intro"];

        if (cachedData) {
            console.log("cachedData", cachedData);
            return cachedData;
        }

        const { data, error } = await client.from("intro").select();
        // console.log("data", data);

        if (error) {
            console.error("Error fetching intro:", error.message);
            throw error;
        }

        return data[0] as Tables<"intro">;
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
                </div>
            </div>
        </div>
        <div
            id="intro-footer"
            class="relative grid shrink grid-cols-2 md:grid-cols-4"
        >
            <div class="intro-footer-item">
                <p class="footer-title">{{ data.locationTitle }}</p>
                <p>{{ data.locationDescription }}</p>
            </div>
            <div v-if="data.opquastUrl" class="intro-footer-item">
                <p class="footer-title">
                    {{ data.opquastTitle }}
                </p>
                <p>
                    <a
                        :href="data.opquastUrl"
                        :title="`${data.opquastDescription} (nouvelle fenêtre)`"
                        target="_blank"
                    >
                        {{ data.opquastDescription }}
                    </a>
                </p>
            </div>
            <div class="intro-footer-item">
                <p class="footer-title">{{ data.situationTitle }}</p>
                <p>{{ data.situationDescription }}</p>
            </div>
            <div class="intro-footer-item">
                <p class="footer-title">{{ data.xpTitle }}</p>
                <p>{{ data.xpDescription }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
@reference "~/assets/styles/config/utilities.css";
@import "~/assets/styles/about.css";
</style>
