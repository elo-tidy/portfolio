import type { Tables } from "./supabase";

// About section
export type Intro = Tables<"intro">;
export type Topskills = Tables<"skills">["name"];
export interface About extends Intro {
    skills: Topskills[];
}
