<script setup lang="ts">
import { useIntroData } from "~/composables/useIntroData";
const { data } = useIntroData();
</script>
<template>
    <div v-if="data" id="header-links">
        <ul class="flex flex-row lg:block">
            <li class="gm">
                <NuxtLink
                    to="mailto:lombard.eloise@gmail.com"
                    target="_blank"
                    title="Me contacter par mail (nouvelle fenêtre)"
                    >Me contacter par mail</NuxtLink
                >
            </li>
            <li class="li">
                <NuxtLink
                    to="https://www.linkedin.com/in/eloiselombard"
                    target="_blank"
                    title="Mon profil LinkedIn (nouvelle fenêtre)"
                    >Mon profil LinkedIn</NuxtLink
                >
            </li>
            <genericCta
                v-if="data.cvurl"
                :newwindow="true"
                :linktext="data.cvtxt"
                :linkurl="data.cvurl"
                htmlTag="li"
                componentClass="cv"
            />
        </ul>
    </div>
</template>
