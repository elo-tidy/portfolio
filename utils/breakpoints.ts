export function getBreakpoints(): string {
    // Get CSS custom properties for breakpoints
    const breakpointName: string[] = ["sm", "md", "lg"];
    const breakpoints: { [key: string]: number } = {};
    for (const name of breakpointName) {
        const value = getComputedStyle(
            document.documentElement,
        ).getPropertyValue(`--breakpoint-${name}`);
        breakpoints[name] = parseFloat(value.replace("rem", ""));
    }

    // Get current window width in rem
    const currentWindowWidth: number = window.innerWidth / 16;
    breakpoints["currentWidth"] = currentWindowWidth;
    // Get current device
    switch (true) {
        case currentWindowWidth < breakpoints.sm:
            return "is-sm";
        case currentWindowWidth < breakpoints.md:
            return "is-md";
        case currentWindowWidth < breakpoints.lg:
            return "is-lg";
        default:
            return "is-lg+";
    }
}
