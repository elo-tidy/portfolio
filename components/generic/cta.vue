<script lang="ts" setup>
interface Props {
    linktext: string;
    newwindow?: boolean;
    linkurl: string | undefined;
    htmlTag: string;
    componentClass: string;
}
const props = defineProps<Props>();
const target: string | null = props.newwindow ? "_blank" : null;
const title: string | null = props.newwindow
    ? `${props.linktext} (Nouvelle fenêtre)`
    : null;
</script>
<template>
    <component :is="`${htmlTag}`" :class="componentClass">
        <NuxtLink :target="target" :title="title" :href="linkurl" external>
            {{ linktext }}
        </NuxtLink>
    </component>
</template>
