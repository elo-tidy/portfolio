<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
<template>
    <footer id="footer" role="contentinfo">
        <div class="container-bloc mx-auto">
            <div id="back-to-top">
                <p>
                    <NuxtLink
                        to="#main"
                        class="top-btn"
                        title="Retourner à l'accueil"
                    >
                        <span class="sr-only">Accueil</span>
                    </NuxtLink>
                </p>
            </div>
            <p>© Eloïse Lombard {{ currentYear }} - All rights reserved</p>
        </div>
    </footer>
</template>
