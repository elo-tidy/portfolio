<script lang="ts" setup>
interface Props {
    title?: string;
    subtitle?: string;
    hn?: string;
    removeBloctitleClass?: boolean;
    //   data: Object;
}
const props = defineProps<Props>();

const hn: number = props.hn ? Number(props.hn) : 2;
const hnClass: string | null = Number(hn) !== 2 ? null : "title";

const hnNext: number = hn + 1;
const hnNextClass: string | null = Number(hnNext) !== 1 ? "title" : null;

const removeBloctitleClass: string | null =
    props.removeBloctitleClass === true ? "subtitle" : "null";
</script>
<template>
    <div :class="['bloc-title', removeBloctitleClass]">
        <component v-if="title" :is="`h${hn}`" :class="hnClass">{{
            title
        }}</component>
        <ClientOnly>
            <component
                v-if="subtitle"
                :is="`h${hnNext}`"
                :class="hnNextClass"
                v-html="subtitle"
            />
        </ClientOnly>
    </div>
</template>
