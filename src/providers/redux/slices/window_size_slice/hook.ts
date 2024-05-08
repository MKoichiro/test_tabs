import { useWindowSizeSelector } from "../../store";

const BREAK_POINTS = {
    pc: 1024,
    tb: 600,
};

const getCurrentDevice = (width: number) => {
    if (width > BREAK_POINTS.pc) return "pc";
    if (width > BREAK_POINTS.tb) return "tb";
    return "sp";
}

export const useWindowSize = () => {
    const { inner, client } = useWindowSizeSelector();

    const device = getCurrentDevice(inner.width);

    return { inner, client, device };
};