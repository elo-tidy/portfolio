<script lang="ts" setup>
import type { SkillSubtype } from "~/types/homeSections";
interface Props {
    skills: SkillSubtype[];
    type_name: string | null;
    typeid: number;
    id: number;
}
const props = defineProps<Props>();

const skillsArray: Array<string> = [];
const skillsData = props.skills;

if (skillsData) {
    skillsData.forEach((skill) => {
        if (skill.subtype_skills) {
            skill.subtype_skills.forEach((skillItem) => {
                skillsArray.push(skillItem);
            });
        }
    });
}
</script>

<template v-for="skill in skillsData">
    <genericTags
        v-if="type_name != null"
        v-bind="
            skillsData.length > 0
                ? { 'aria-describedby': `${id}-skills-${typeid}` }
                : {}
        "
        :skills="skillsArray"
        :customClass="type_name?.toLowerCase()"
    />
</template>
