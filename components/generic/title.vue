<script lang="ts" setup>
interface Props {
    title: string;
    subtitle?: string;
    hn?: string;
    //   data: Object;
}
const props = defineProps<Props>();

const hn: number = props.hn ? Number(props.hn) : 2;
const hnClass: string | null = Number(hn) !== 2 ? null : "title";

const hnNext: number = hn + 1;
const hnNextClass: string | null = Number(hnNext) !== 1 ? "title" : null;
</script>
<template>
    <div class="bloc-title">
        <component :is="`h${hn}`" :class="hnClass">{{ title }}</component>
        <component
            v-if="props.subtitle"
            :is="`h${hnNext}`"
            :class="hnNextClass"
        >
            {{ subtitle }}
        </component>
    </div>
</template>
