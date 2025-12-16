import { useState, useEffect, useCallback, useRef } from "react";
import { ScrollState } from "../../types";

export function useScrollFade() {
    const [scrollState, setScrollState] = useState<ScrollState>({ atTop: true, atBottom: false });
    const listRef = useRef<HTMLDivElement>(null);

    const checkScrollPosition = useCallback(() => {
        const element = listRef.current;
        if (!element) return;
        const threshold = 10;
        const atTop = element.scrollTop <= threshold;
        const atBottom = element.scrollHeight - element.scrollTop - element.clientHeight <= threshold;
        setScrollState({ atTop, atBottom });
    }, []);

    useEffect(() => {
        const list = listRef.current;
        checkScrollPosition();
        list?.addEventListener('scroll', checkScrollPosition);
        return () => {
            list?.removeEventListener('scroll', checkScrollPosition);
        };
    }, [checkScrollPosition]);

    return {
        scrollState,
        listRef,
        checkScrollPosition,
    };
}

interface ScrollFadeGradientsProps {
    scrollState: ScrollState;
}

export function ScrollFadeGradients({ scrollState }: ScrollFadeGradientsProps) {
    return (
        <>
            {/* Top fade gradient */}
            <div 
                className={`absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white/30 dark:from-black/30 to-transparent z-10 pointer-events-none rounded-t-lg transition-opacity duration-200 ${scrollState.atTop ? 'opacity-0' : 'opacity-100'}`} 
            />
            {/* Bottom fade gradient */}
            <div 
                className={`absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/30 dark:from-black/30 to-transparent z-10 pointer-events-none rounded-b-lg transition-opacity duration-200 ${scrollState.atBottom ? 'opacity-0' : 'opacity-100'}`} 
            />
        </>
    );
}
