<script lang="ts" setup>
interface Props {
    linktext: string;
    newwindow?: boolean;
    linkurl: string | null;
}
const props = defineProps<Props>();
const target = props.newwindow ? "_blank" : null;
const title = props.newwindow ? `${props.linktext} (Nouvelle fenêtre)` : null;
</script>
<template>
    <p class="cust_cta">
        <NuxtLink :target="target" :title="title" :href="linkurl">
            {{ linktext }}
        </NuxtLink>
    </p>
</template>
