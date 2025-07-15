export const useActiveSection = () => {
    const activeSection = useState<string>("activeSection", () => "about");
    const setActiveSection = (id: string) => {
        activeSection.value = id;
    };
    return { activeSection, setActiveSection };
};
