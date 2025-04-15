<script lang="ts" setup>
interface Props {
    skills: string[] | null;
    customClass?: string | null;
}
const props = defineProps<Props>();
const customClass: string | null = props.customClass
    ? props.customClass
    : "technique";
</script>

<template>
    <ul v-if="skills" class="tags flex flex-row flex-wrap" :class="customClass">
        <li v-for="skill in skills" class="shrink">
            {{ skill }}
        </li>
    </ul>
</template>
