export interface TableValidationIssue {
    path: string;
    code: string;
    message: string;
}
export interface TableValidationOptions {
    mode?: 'sync' | 'async';
    tables?: Record<string, unknown>;
    allowExternalReferences?: boolean;
    functions?: Record<string, unknown>;
    conditions?: Record<string, unknown>;
}
export interface TableValidationResult {
    valid: boolean;
    errors: TableValidationIssue[];
}
/** Validate structure and references without rolling, invoking callbacks, or consuming RNG. */
export declare function validateTable(definition: unknown, options?: TableValidationOptions): TableValidationResult;
