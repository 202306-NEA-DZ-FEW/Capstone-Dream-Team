import { useEffect, useState } from "react";

export default function useIsVisible(ref) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        if (ref.current) {
            const observer = new IntersectionObserver(([entry]) => {
                setIntersecting(entry.isIntersecting);
            });

            observer.observe(ref.current);

            return () => {
                observer.disconnect();
            };
        }
    }, [ref]);

    return isIntersecting;
}
