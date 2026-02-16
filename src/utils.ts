type MergeFunction<T = any> = (prev: T | undefined, next: T) => T;
export function debouncedCallback<T extends any[]>(
    fn: (...args: T) => void,
    debouncePeriod = 100,
    mergeItem: MergeFunction = sumObj
) {
    let timerId: ReturnType<typeof setTimeout> | null = null;
    let accumulatedArgs: any[] = [];

    const mergeArgs = (prev: any[], next: any[]): any[] =>
        next.map((item, i) => mergeItem(prev[i], item));

    return (...args: T) => {
        if (timerId) clearTimeout(timerId);
        accumulatedArgs = mergeArgs(accumulatedArgs, args);

        timerId = setTimeout(() => {
            fn(...(accumulatedArgs as T));
            timerId = null;
            accumulatedArgs = [];
        }, debouncePeriod);
    };
}

const sumObj = (o1: unknown, o2: unknown) => {
    const t1 = typeof o1;
    const t2 = typeof o2;
    if (t1 !== t2) return o2;

    if (o1 === null || o2 === null) return o2;
    if (t1 === "undefined") return o2;
    if (t2 === "undefined") return o2;

    if (["number", "string", "boolean"].includes(t1)) {
        return (o1 as any) + o2;
    }

    if (Array.isArray(o1) && Array.isArray(o2)) {
        return [o1, o2].flat();
    }

    if (
        (o1 as Object).constructor.name === "Object" &&
        (o2 as Object).constructor.name === "Object"
    ) {
        return { ...(o1 as Object), ...(o2 as Object) };
    }

    return o2;
};

const digits = /^\d+$/;
export const parseDigits = (str: string): string | number =>
    digits.test(str) ? parseInt(str, 10) : str;

type ClassValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | ClassValue[]
    | { [key: string]: boolean | undefined | null };

export function cx(...args: ClassValue[]): string {
    const classes: Set<string> = new Set();

    for (const arg of args) {
        if (typeof arg === "string" || typeof arg === "number") {
            classes.add(String(arg));
            continue;
        }

        if (!arg) continue;

        if (Array.isArray(arg)) {
            classes.add(cx(...arg));
            continue;
        }

        if (typeof arg === "object") {
            for (const [key, value] of Object.entries(arg)) {
                if (value) classes.add(key);
            }
            continue;
        }
    }

    return Array.from(classes).join(" ").trim();
}
