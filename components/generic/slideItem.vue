<script lang="ts" setup>
import type { XpItem } from "~/types/homeSections";
interface Props {
    slide: XpItem;
}
const props = defineProps<Props>();
const startDate = new Date(props.slide.startDate).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
});
const endDate = props.slide.endDate
    ? new Date(props.slide.endDate).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
      })
    : null;
const slideDate =
    startDate === endDate || endDate == null
        ? startDate
        : endDate + " - " + startDate;

const calculateDuration = () => {
    if (!props.slide.endDate) return "";

    const start = new Date(props.slide.startDate);
    const end = new Date(props.slide.endDate);

    const months = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44),
    );

    if (months == 0) {
        return;
    }

    if (months >= 12) {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        return remainingMonths > 0
            ? ` (${years} an${years > 1 ? "s" : ""} ${remainingMonths} mois)`
            : ` (${years} an${years > 1 ? "s" : ""})`;
    }

    return ` (${months} mois)`;
};
const duration = props.slide.course ? "" : calculateDuration();
</script>

<template>
    <div class="xp-content sm:col-span-1 md:col-span-8 lg:col-span-12">
        <h3 class="xp-title">{{ slide.title }}{{ duration }}</h3>
        <p v-if="slide.location">{{ slide.location }}</p>
        <p v-if="slide.attendance">{{ slide.attendance }}</p>
        <p v-if="slide.description" class="xp-desc">
            {{ slide.description }}
        </p>
    </div>
    <p class="xp-date order-first sm:col-span-1 md:col-span-2 lg:col-span-3">
        {{ slideDate }}
    </p>
    <div
        v-if="slide.skills && Object.keys(slide.skills).length > 0"
        class="tags-container sm:col-span-1 md:col-span-8 md:col-start-3 lg:col-span-10"
    >
        <template v-for="(skillType, typeid) in slide.skills">
            <p :id="`${slide.id}-skills-${typeid}`" class="sr-only">
                {{
                    skillType.type_name?.toLowerCase() === "personal"
                        ? "Softskills :"
                        : skillType.type_name?.toLowerCase() === "other"
                          ? "Outils et ressources :"
                          : "Hardskills :"
                }}
            </p>
            <blockExperienceSkills
                :skills="skillType.skills_list"
                :type_name="skillType.type_name"
                :typeid="Number(typeid)"
                :id="slide.id"
            />
        </template>
    </div>
</template>
<style lang="css" scoped>
@reference "~/assets/styles/config/utilities.css";
@import "~/assets/styles/slide.css";
</style>
