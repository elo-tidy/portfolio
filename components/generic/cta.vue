<script lang="ts" setup>
interface Props {
    linktext: string;
    newwindow?: boolean;
    linkurl: string | null;
    htmlTag: string;
    componentClass: string;
}
const props = defineProps<Props>();
const target = props.newwindow ? "_blank" : null;
const title = props.newwindow ? `${props.linktext} (Nouvelle fenêtre)` : null;
</script>
<template>
    <component :is="`${htmlTag}`" :class="componentClass">
        <NuxtLink :target="target" :title="title" :href="linkurl">
            {{ linktext }}
        </NuxtLink>
    </component>
</template>
