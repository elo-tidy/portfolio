<script lang="ts" setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import { Analytics } from "@vercel/analytics/nuxt";
</script>
<template>
    <div>
        <layoutAppHeader />
        <main id="main" role="main">
            <slot />
        </main>
        <LayoutAppFooter />
        <SpeedInsights />
        <Analytics />
    </div>
</template>
