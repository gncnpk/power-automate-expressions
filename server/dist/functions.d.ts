interface FunctionInfo {
    name: string;
    paramTypes: string[];
    minArgs: number;
    maxArgs: number;
    returnType: string;
    description: string;
}
export declare const workflowFunctions: Map<string, FunctionInfo>;
export {};
