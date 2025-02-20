<script setup>
const supabase = useSupabaseClient();

const skills = ref([]);

async function getSkills() {
  const { data } = await supabase.from("skills").select();
  skills.value = data;
}

onMounted(() => {
  getSkills();
});
</script>

<template>
  <h1>Skills</h1>
  <ul>
    <li v-for="skill in skills" :key="skill.id">{{ skill.name }}</li>
  </ul>
</template>
