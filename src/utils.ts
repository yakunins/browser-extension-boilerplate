type MergeFunction = (prev: unknown, next: unknown) => unknown;
export function debouncedCallback<T extends unknown[]>(
    fn: (...args: T) => void,
    debouncePeriod = 100,
    mergeItem: MergeFunction = sumObj
) {
    let timerId: ReturnType<typeof setTimeout> | null = null;
    let accumulatedArgs: unknown[] = [];

    const mergeArgs = (prev: unknown[], next: unknown[]): unknown[] =>
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

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        Object.getPrototypeOf(value) === Object.prototype
    );
}

const sumObj = (o1: unknown, o2: unknown): unknown => {
    const t1 = typeof o1;
    const t2 = typeof o2;
    if (t1 !== t2) return o2;

    if (o1 === null || o2 === null) return o2;
    if (t1 === "undefined") return o2;
    if (t2 === "undefined") return o2;

    if (typeof o1 === "number" && typeof o2 === "number") {
        return o1 + o2;
    }
    if (typeof o1 === "string" && typeof o2 === "string") {
        return o1 + o2;
    }

    if (Array.isArray(o1) && Array.isArray(o2)) {
        return [o1, o2].flat();
    }

    if (isPlainObject(o1) && isPlainObject(o2)) {
        return { ...o1, ...o2 };
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
