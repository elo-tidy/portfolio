<script lang="ts" setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
</script>
<template>
    <div>
        <layoutAppHeader />
        <main id="main" role="main">
            <slot />
        </main>
        <LayoutAppFooter />
    </div>
</template>
