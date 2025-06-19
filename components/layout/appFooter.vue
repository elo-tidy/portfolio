<script setup lang="ts">
const currentYear: number = new Date().getFullYear();
</script>
<template>
    <footer id="footer" role="contentinfo">
        <div class="container-bloc mx-auto">
            <div id="back-to-top">
                <p>
                    <NuxtLink
                        to="#main"
                        class="top-btn"
                        title="Retourner en haut de page"
                    >
                        <span class="sr-only">Accueil</span>
                    </NuxtLink>
                </p>
            </div>
            <p>
                © Eloïse Lombard {{ currentYear }} -
                <span lang="en">All rights reserved</span>
            </p>
        </div>
    </footer>
</template>
