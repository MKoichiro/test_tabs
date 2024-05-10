import { useEffect, useRef, useState } from "react";

export const useHeightGetter = (skipCondition?: boolean) => {

    const [height, setHeight] = useState<number | null>(null);
    const heightGetterRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            entries.forEach((el) => {
                if (skipCondition) return;
                setHeight(el.contentRect.height);
            });
        });

        if (heightGetterRef.current) observer.observe(heightGetterRef.current);

        return () => observer.disconnect();

    }, []);

    return { height, heightGetterRef };
};