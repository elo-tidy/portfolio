<script lang="ts" setup>
interface Props {
    skills: string[];
}
const props = defineProps<Props>();
</script>

<template>
    <ul class="tags flex flex-wrap">
        <li v-for="skill in skills" class="shrink">
            {{ skill }}
        </li>
    </ul>
</template>
