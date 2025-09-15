import type { About } from "~/../types/homeSections";
import type { Database } from "~/../types/supabase";

export function useIntroData() {
    const client = useSupabaseClient<Database>();
    const nuxtApp = useNuxtApp();

    return useAsyncData<About>("Intro", async () => {
        const cachedData =
            nuxtApp.payload.data["Intro"] || nuxtApp.static.data["Intro"];
        if (cachedData) {
            return cachedData as About;
        }
        let { data, error } = await client.rpc("get_intro_data");
        if (error) throw error;
        return data as object as About;
    });
}
