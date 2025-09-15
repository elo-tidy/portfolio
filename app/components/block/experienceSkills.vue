<script lang="ts" setup>
import type { SkillSubtype } from "~/../types/homeSections";
interface Props {
    skills: SkillSubtype[];
    type_name: string | null;
    typeid: number;
    id: number;
}
const props = defineProps<Props>();

const skillsArray = computed(() => {
    const arr: Array<{ name: string }> = [];
    if (props.skills) {
        props.skills.forEach((skill) => {
            if (skill.subtype_skills) {
                skill.subtype_skills.forEach((skillItem) => {
                    arr.push({ name: skillItem });
                });
            }
        });
    }
    return arr;
});
</script>

<template>
    <genericTags
        v-if="type_name != null"
        v-bind="
            props.skills.length > 0
                ? { 'aria-describedby': `${id}-skills-${typeid}` }
                : {}
        "
        :skills="skillsArray"
        :customClass="type_name?.toLowerCase()"
    />
</template>
