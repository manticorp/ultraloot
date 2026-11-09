/** Preserve callback payload shapes while retaining legacy object-alias merging. */
export declare function callbackArgs({ args, arguments: legacy }: {
    args?: unknown;
    arguments?: unknown;
}, cloneRecord?: boolean): any;
