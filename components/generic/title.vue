<script lang="ts" setup>
interface Props {
    title: string;
    subtitle?: string;
    hn?: string;
    //   data: Object;
}
const props = defineProps<Props>();

const hn = props.hn ? Number(props.hn) : 2;
const hnClass = Number(props.hn) !== 2 ? null : "title";

const hnNext = hn + 1;
const hnNextClass = Number(props.hn) !== 2 ? "title" : "subtitle";
</script>
<template>
    <div class="bloc-title">
        <component :is="`h${hn}`" :class="hnClass"> {{ title }}</component>
        <component :is="`h${hnNext}`" :class="hnNextClass">
            {{ subtitle }}
        </component>
    </div>
</template>
