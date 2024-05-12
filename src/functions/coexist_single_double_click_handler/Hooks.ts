import { MouseEvent, useState } from 'react';

interface Handlers<T, U> {
    single: (e: MouseEvent, singleArgs?: T) => void;
    double: (e: MouseEvent, doubleArgs?: U) => void;
}
interface Args<T, U> {
    handlers: Handlers<T, U>;
    delay: number;
}
/**
 * @example
 * #### Simple Usage
 * ```tsx
 * const MyComponent = () => {
 *     const netClickHandler       = (e: MouseEvent) => console.log('single clicked: ', e.target);
 *     const netDoubleClickHandler = (e: MouseEvent) => console.log('double clicked: ', e.target);
 *     const handlers = {
 *         single: netClickHandler,
 *         double: netDoubleClickHandler,
 *     };
 *    // You can set delay time in milliseconds. If not set, default value (200ms) will be used.
 *     const delay = 200;
 *     const handleClick = useCoexistSingleDoubleClickHandler({ handlers, delay });
 *     // You need not bind any handlers to 'onDoubleClick' event.
 *     return (
 *         <div onClick={handleClick}>
 *             Click me
 *         </div>
 *     );
 * };
 * ```
 *
 * #### Advanced Usage
 * If you want to pass some additional arguments to the handlers, you can do like this:
 * ```tsx
 * interface Single {
 *     id: number;
 * }
 * interface Double {
 *     id: number;
 * }
 *
 * const MyComponent = () => {
 *     const netClickHandler       = (e: MouseEvent, args: Single) => console.log('single clicked: ', e.target, args);
 *     const netDoubleClickHandler = (e: MouseEvent, args: Double) => console.log('double clicked: ', e.target, args);
 *     const handlers = {
 *         single: netClickHandler,
 *         double: netDoubleClickHandler,
 *     };
 *
 *     // You should pass the type of the additional arguments in '<>' to the generic type of the hook.
 *     const handleClick = useCoexistSingleDoubleClickHandler<Single, Double>({ handlers });
 *     const handleClickForBind = (e: MouseEvent) => handleClick(e, { singleArgs: { id: 1 }, doubleArgs: { id: 2 } });
 *     return (
 *         <div onClick={handleClickForBind}>
 *             Click me
 *         </div>
 *     );
 * };
 * ```
 *
 */
export const useCoexistSingleDoubleClickHandler = <T, U>({ handlers, delay = 200 }: Args<T, U>) => {
    const [clickCount, setClickCount] = useState(0);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    return (e: MouseEvent, { singleArgs, doubleArgs }: { singleArgs?: T; doubleArgs?: U } = {}) => {
        if (timer !== null) clearTimeout(timer);
        const newCount = clickCount + 1;
        setClickCount(newCount);

        const newTimer = setTimeout(() => {
            if (newCount < 2) {
                handlers.single(e, singleArgs);
            } else {
                handlers.double(e, doubleArgs);
            }
            setClickCount(0);
        }, delay);

        setTimer(newTimer);
    };
};
