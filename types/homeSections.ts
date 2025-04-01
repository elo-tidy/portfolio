import type { Tables } from "./supabase";

// Intro section
export type Intro = Tables<"intro">;
export type Topskills = Tables<"skills">["name"];
export interface About extends Intro {
    skills: Topskills[];
}

// Skill item type
export type skillItem = {
    icon: Tables<"skills">["icon"];
    name: Tables<"skills">["name"];
};
export type skillGroup = {
    skills: skillItem[];
    subtype: Tables<"skillsSubtype">["name"];
};
// Skills section
export type hardSkills = {
    hard_skills_title: Tables<"skillsType">["name"];
    hard_skills_list: skillGroup[];
};
export type softskills = {
    soft_skills_title: Tables<"skillsType">["name"];
    soft_skills_list: Tables<"skills">["name"][];
};
export type missingskills = {
    txt: Tables<"skillsType">["titleTxt"];
    description: Tables<"skillsType">["textDescription"];
};
export type Skills = {
    hard_skills: hardSkills;
    soft_skills: softskills;
    missing_skills: missingskills;
};
