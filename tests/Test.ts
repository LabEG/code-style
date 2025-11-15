/* eslint-disable max-lines */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable preserve-caught-error */
/**
 * Complex Test file for TypeScript ESLint rules
 * This file contains various TypeScript patterns to test different linting scenarios
 * Ignoring all eslint rules for testing purposes
 */

// Testing problematic type definitions
interface BadInterface {
    // Using proper type instead of any
    data: unknown;
    callback: () => void;
    // Optional property after required
    required: string;
    optional?: number;
    anotherRequired: boolean;
}

// Interface with index signature issues
interface ProblematicIndex {
    [key: string]: unknown;
    specificProp: string;
    // This might cause issues with index signature
}

// Empty interface (should extend or use type alias)
type EmptyInterface = Record<string, never>;

// Interface extending any (using Record instead of any)
interface ExtendsAny extends Record<string, unknown> {
    customProp: string;
}

// Testing enum issues
enum NumericEnum {
    FIRST, // = 0
    SECOND, // = 1
    THIRD = 5,
    FOURTH // = 6
}

enum MixedEnum {
    STRING_VALUE = "string",
    ANOTHER_STRING = "another"
}

export const NumericMixedEnum = {
    NUMERIC_VALUE: 42
} as const;

// Const assertions and type issues
const problematicObject = {
    prop1: "value1",
    prop2: 123,
    prop3: true
}; // Should use 'as const' for immutable object

const mutableArray = [1, 2, 3]; // Should be readonly or use 'as const'

// Testing type aliases with issues
type AnyType = unknown;
type FunctionType = () => void;
type ObjectType = object; // Too broad
type EmptyObjectType = Record<string, never>; // Empty object type

// Union types with issues
type StringOrAny = string; // Fixed - removed any
type RedundantUnion = string; // Duplicate types
type ProblematicUnion = string | number | boolean | object | (() => void);

// Testing class with TypeScript issues
class ProblematicClass {

    // Public field without explicit access modifier
    publicField: string;

    // Using proper type instead of any
    private data: Record<string, unknown>;

    // Parameter properties with issues - using config object pattern
    constructor (config: {
        name: string;
        age: number;
        id: number;
        callback: () => void;
    }) {
        this.publicField = config.name;
        this.data = {};
    }

    // Method with proper types
    public processData (input: unknown): unknown {
        return input;
    }

    // Method with specific function type
    public executeCallback (fn: () => void): void {
        fn();
    }

    // Method with more specific object parameter
    public handleObject (obj: Record<string, unknown>): void {
        console.log(obj);
    }

    // Async method with proper error handling
    public async fetchData (url: string): Promise<unknown> {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            throw new Error(`Failed to fetch data: ${String(error)}`);
        }
    }

    // Method with proper types
    public implicitAny (param: unknown): unknown {
        return param;
    }

    // Static method with proper types
    public static createInstance (data: {
        name: string;
        age: number;
        id: number;
        callback: () => void;
    }): ProblematicClass {
        return new ProblematicClass(data);
    }

}

// Generic class with constraints issues
class GenericClass<T = unknown> { // Fixed default type

    private items: T[] = [];

    // Generic method with proper typing
    public add (item: T): void {
        this.items.push(item);
    }

    // Method without type assertion
    public get (index: number): T | undefined {
        return this.items[index];
    }

    // Method with proper return type
    public unsafeGet (index: number): T | undefined {
        return this.items[index];
    }

}

// Testing function overloads with issues
function overloadedFunction (param: string): string;
function overloadedFunction (param: number): number;
function overloadedFunction (param: string | number): string | number { // Fixed implementation signature
    return param;
}

// Function with rest parameters and proper types
const variadicFunction = (...args: number[]): number => args.reduce((acc, curr) => acc + curr, 0);

// Testing type guards with proper types
const isString = (value: unknown): value is string => typeof value === "string";

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

// Problematic type assertions
const typeAssertionIssues = () => {
    const unknownValue: unknown = {name: "test"};

    // Safer type assertions
    const unsafeString = unknownValue as string;
    const unsafeNumber = unknownValue as number;
    const unsafeObject = unknownValue as {name: string;
        age: number;};

    // Direct assertion (removing unnecessary unknown step)
    const doubleAssertion = unknownValue as string;

    // Safe null check instead of non-null assertion
    const nullableValue: string | null = Math.random() > 0.5 ? "value" : null;
    const nonNullValue = nullableValue ?? "default"; // Safe alternative

    return {unsafeString,
        unsafeNumber,
        unsafeObject,
        doubleAssertion,
        nonNullValue};
};

// Testing utility types misuse
type BadPick = Pick<Record<string, unknown>, string>; // Pick from proper type
type BadOmit = Omit<Record<string, unknown>, string>; // Omit from proper type
type BadPartial = Partial<Record<string, unknown>>; // Partial of proper type
type BadRequired = Required<Record<string, unknown>>; // Required of proper type

// Complex type with issues
interface ComplexInterface {
    // Nested proper types
    metadata: {
        [key: string]: unknown;
        version: number;
    };

    // Function property with proper types
    processor: (data: unknown) => unknown;

    // Optional chain of properties
    nested?: {
        deep?: {
            value?: unknown;
        };
    };

    // Array of unknown
    items: unknown[];

    // Union without any
    status: "loading" | "success" | "error";
}

// Testing module declarations and ambient types
declare global {
    interface Window {
        customProperty: unknown;
    }

    const globalVariable: unknown;
}

// Module exports instead of namespace
export const ProblematicModule = {
    type: {} as Record<string, unknown>,

    configure: (): void => {
        // Implementation
    },

    defaultConfig: {} as Record<string, unknown>
};

// Testing error handling patterns
class ErrorHandler {

    // Method with proper error handling
    public async safeExecute (fn: () => Promise<unknown>): Promise<unknown> {
        try {
            return await fn();
        } catch (error) {
            // Proper error logging
            console.error("Execution failed:", error);
            return null;
        }
    }

    // Method with proper error typing
    public handleError (error: Error): void {
        console.error("Error occurred:", error);
    }

    // Method that throws proper Error object
    public throwError (message: string): never {
        throw new Error(message);
    }

}

// Testing async patterns with issues
class AsyncPatterns {

    // Promise with proper typing
    public fetchWithoutErrorHandling (url: string): Promise<unknown> {
        return fetch(url).then((response) => response.json());
    }

    // Async function with proper types
    public async processAsync (): Promise<unknown> {
        // Proper typing and error handling
        const result = await this.fetchWithoutErrorHandling("/api/process");
        return result;
    }

    // Promise chain with proper types
    public chainPromises (initialValue: unknown): Promise<unknown> {
        return Promise.resolve(initialValue)
            .then((value: unknown) => String(value))
            .then((str: string) => JSON.parse(str) as {result: unknown})
            .then((obj: {result: unknown}) => obj.result);
    }

}

// Testing conditional types with issues
type ConditionalType<T> = T extends unknown ? T : never; // Fixed conditional
type AnotherConditional<T> = T extends (() => void) ? T : unknown; // Fixed return type

// Mapped types with proper types
type MappedWithAny<T> = {
    [K in keyof T]: unknown; // Maps all properties to unknown
};

type ProblematicMapped = Record<string, unknown>;

// Testing decorators (if enabled) - helper function for demo purposes
const demonstrateDecorator = (target: unknown, propertyKey: string, descriptor?: PropertyDescriptor) => {
    if (descriptor && propertyKey && target) {
        const originalMethod = descriptor.value as (...args: unknown[]) => unknown;

        descriptor.value = function value (...args: unknown[]) {
            console.log(`Calling ${propertyKey} with args:`, args);
            return originalMethod.apply(this, args);
        };
    }
};

class DecoratedClass {

    // Method with proper types
    public decoratedMethod (param: unknown): unknown {
        return param;
    }

}

// Testing tuple types with proper types
type LooseTuple = [unknown, unknown, unknown]; // Fixed with unknown
type MixedTuple = [string, unknown, number]; // Mixed with unknown

// Function types with proper types
type LooseFunction = (...args: unknown[]) => unknown;
type VagueCallback = (error: Error, result: unknown) => void;

// Testing template literal types with proper types
type StringTemplate = `${string}-${string}`; // Using string in template

// Testing advanced types with proper types
interface AdvancedProblems<T = unknown> {
    // Method without unnecessary generic
    transform(input: T): unknown; // Method without generic

    // Index signature with proper type
    [key: `prefix_${string}`]: unknown;

    // Conditional property types
    conditionalProp: T extends string ? T : unknown;
}

// Testing discriminated unions with proper types
type Shape = {
    kind: "circle";
    radius: number;
} | {
    kind: "square";
    sideLength: number;
} | {
    kind: "rectangle";
    properties: {
        width: number;
        height: number;
    };
};

// Function with proper types
const complexFunction = (params: {
    param1: unknown;
    param2: unknown;
    param3: (input: unknown) => unknown;
}): Promise<unknown> => new Promise((resolve, reject) => {
    try {
        const result = params.param3(params.param1);
        resolve(result);
    } catch (error) {
        reject(error instanceof Error ? error : new Error(String(error)));
    }
});

/*
 * Testing module augmentation with issues (removed due to module not found)
 * This would normally augment an existing module but is commented out
 * To avoid compilation errors in the test environment
 */

// Array methods with proper types
const arrayProblems = () => {
    const mixedArray: unknown[] = [1, "string", true, {}];

    // Map with proper typing
    const mapped = mixedArray.map((item: unknown) => String(item));

    // Filter with proper types
    const filtered = mixedArray.filter((item: unknown) => typeof item === "string");

    // Reduce with proper types - this is tricky with mixed array
    const reduced = mixedArray.reduce((acc: number, curr: unknown) => {
        if (typeof curr === "number") {
            return acc + curr;
        }
        return acc;
    }, 0);

    return {mapped,
        filtered,
        reduced};
};

// Testing type parameter issues
interface GenericWithIssues<T, U = unknown, V = () => void> {
    prop1: T;
    prop2: U; // Defaults to unknown
    prop3: V; // Defaults to function
    method(param: T): T; // Method without unnecessary generic
}

// Class hierarchy with proper types
abstract class AbstractBase {

    protected abstract process (data: unknown): unknown;

    public execute (input: unknown): unknown {
        return this.process(input);
    }

}

class ConcreteImplementation extends AbstractBase {

    protected process (data: unknown): unknown {
        // Implementation with proper types
        return data;
    }

    // Additional method with proper types
    public transform (input: unknown, transformer: (input: unknown) => unknown): unknown {
        return transformer(input);
    }

}

// Testing readonly and mutability issues
interface MutableConfig {
    readonly id: number;
    settings: Record<string, unknown>; // Mutable object with unknown values
    readonly permissions: string[]; // Readonly array with specific type
}

const mutableConfigInstance: MutableConfig = {
    id: 1,
    settings: {},
    permissions: []
};

// Proper way to add permissions without mutation
void [...mutableConfigInstance.permissions, "new-permission"];

// Testing intersection types with proper types
type IntersectionWithAny = {name: string} & Record<string, unknown>; // Intersection with Record
type LooseIntersection = Record<string, unknown> & {customProp: unknown}; // Proper intersection

// Union types with proper types
type UnionWithAny = string | number; // Removed unknown as it overrides others

// Complex export with all problematic patterns
export {
    // Interfaces and types
    BadInterface,
    ProblematicIndex,
    EmptyInterface,
    ExtendsAny,
    ComplexInterface,
    AdvancedProblems,
    GenericWithIssues,
    MutableConfig,

    // Classes
    ProblematicClass,
    GenericClass,
    ErrorHandler,
    AsyncPatterns,
    DecoratedClass,
    AbstractBase,
    ConcreteImplementation,

    // Enums
    NumericEnum,
    MixedEnum,

    // Functions
    overloadedFunction,
    variadicFunction,
    isString,
    isObject,
    typeAssertionIssues,
    complexFunction,
    arrayProblems,
    demonstrateDecorator,

    // Constants and objects
    problematicObject,
    mutableArray,
    mutableConfigInstance

    /*
     * Module object (exported separately)
     * ProblematicModule exported above
     */
};

// Type exports with issues
export type {
    AnyType,
    FunctionType,
    ObjectType,
    EmptyObjectType,
    StringOrAny,
    RedundantUnion,
    ProblematicUnion,
    BadPick,
    BadOmit,
    BadPartial,
    BadRequired,
    ConditionalType,
    AnotherConditional,
    MappedWithAny,
    ProblematicMapped,
    LooseTuple,
    MixedTuple,
    LooseFunction,
    VagueCallback,
    StringTemplate,
    Shape,
    IntersectionWithAny,
    LooseIntersection,
    UnionWithAny
};

// Default export with proper types
export default {
    version: "1.0.0",
    config: {} as Record<string, unknown>,

    // Method with proper types
    initialize: (options: Record<string, unknown>): Record<string, unknown> => options,

    // Method with specific function parameter
    setup: (callback: () => void): void => {
        callback();
    },

    // Getter with proper return type
    get data (): Record<string, unknown> {
        return this.config;
    },

    // Setter with proper type
    set data (value: Record<string, unknown>) {
        this.config = value;
    }
};
