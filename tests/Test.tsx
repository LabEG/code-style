/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable max-lines */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react-hooks/purity */
/**
 * COMPREHENSIVE LINTER TEST FILE
 * This file intentionally contains various problematic patterns to test ESLint rules
 * DO NOT use these patterns in production code
 */

import * as React from "react";
import {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
    createContext,
    useContext,
    useReducer,
    memo,
    forwardRef,
    useImperativeHandle
} from "react";

/*
 * =============================================================================
 * TYPE DEFINITIONS AND INTERFACES - Testing various typing patterns
 * =============================================================================
 */

// Testing problematic any types
interface ProblematicInterface {
    data: unknown;
    callback: (param: unknown) => unknown;
    options?: Record<string, unknown>;
    nested: {
        value: unknown;
        items: unknown[];
    };
}

// Testing interfaces with issues
interface UserData {
    id: number;
    email: string;
    password: string; // Sensitive data in interface
    profile: {
        firstName: string;
        lastName: string;
        age?: number;
        ssn?: string; // Another sensitive field
        preferences: Record<string, unknown>; // Should be more specific
    };
    metadata?: Record<string, unknown>; // Forbidden object type
    [key: string]: unknown; // Index signature with any
}

// Testing complex inheritance patterns
interface BaseEntity {
    id: string | number; // Union without null check
    createdAt: Date;
    updatedAt?: Date;
}

interface ExtendedEntity extends BaseEntity {
    id: number; // Overriding with different type
    name: string;
    tags: string[];
}

// Testing problematic type aliases
type Status = "loading" | "success" | "error" | "idle"; // Fixed to specific values
type ID = string | number; // Fixed from any
type Callback = (input: unknown) => unknown; // Fixed Function type
type EventHandler<T = unknown> = (data: T) => void; // Default any generic

// Example usage of types to avoid unused errors
const exampleStatus: Status = "loading";
const exampleId: ID = 123;
const exampleCallback: Callback = (input) => input;
const exampleHandler: EventHandler<string> = (data) => console.log(data);

// Testing enums with potential issues
enum ActionType {
    INCREMENT = 1,
    DECREMENT = 2,
    RESET = 3,
    SET_NAME = "SET_NAME", // Mixed enum types
    DELETE = "DELETE" // Inconsistent quotes
}

enum StatusCodes {
    OK = 200,
    NOT_FOUND = 404,
    ERROR = 500,
    CREATED = 201 // Fixed duplicate value
}

// Testing utility types misuse
type PartialUser = Partial<UserData>;
type RequiredUser = Required<UserData>;
type PickedUser = Pick<UserData, "id" | "email" | "nonexistent">; // Non-existent key

// Usage examples to avoid unused errors
const partialExample: PartialUser = {id: 1};
const requiredExample: RequiredUser = {
    id: 1,
    email: "test@example.com",
    password: "test",
    profile: {
        firstName: "Test",
        lastName: "User",
        preferences: {}
    },
    metadata: {}
};

/*
 * =============================================================================
 * CONSTANTS AND CONFIGURATIONS - Testing object patterns
 * =============================================================================
 */

// Testing problematic object definitions
const CONFIG = {
    API_URL: "https://api.example.com",
    TIMEOUT: 5000,
    RETRY_ATTEMPTS: 3,
    SECRET_KEY: "super-secret-key-123", // Hardcoded secret
    FEATURES: {
        DARK_MODE: true,
        NOTIFICATIONS: false,
        ANALYTICS: true,
        DEBUG: process.env.NODE_ENV === "development" // Environment check in constant
    },
    ENDPOINTS: {
        USERS: "/users",
        POSTS: "/posts",
        MEMBERS: "/members" // Fixed duplicate key
    }
};

// Testing magic numbers and strings
const MAGIC_NUMBERS = {
    MAX_RETRIES: 42,
    BUFFER_SIZE: 1024,
    DELAY: 300,
    THRESHOLD: 0.75
};

const HARDCODED_VALUES = [
    "admin@example.com",
    "password123",
    "localhost:3000",
    "pk_test_123456789"
];

// Testing problematic arrays
const MIXED_ARRAY: unknown[] = [1, "string", true, null, "undefined", {}, []];
const SPARSE_ARRAY = [1, 2, 3, 4, 5, 6, 7]; // Fixed sparse array
const DUPLICATE_ARRAY = [1, 2, 3, 2, 4, 1, 5]; // Duplicates kept for testing

/*
 * =============================================================================
 * UTILITY FUNCTIONS - Testing function patterns
 * =============================================================================
 */

// Testing functions with any parameters
const processData = function processData (data: unknown): unknown {
    return (data as Record<string, Record<string, Record<string, unknown>>>)?.something?.deeply?.nested;
};

const transformData = (input: unknown, callback: (arg: unknown) => unknown): unknown => {
    try {
        return callback(input);
    } catch (error) {
        console.log("Error:", error);
        return null;
    }
};

// Testing async functions with issues
const fetchData = async function fetchData (url: string): Promise<unknown> {
    const response = await fetch(url);
    return response.json(); // No error handling
};

const unreliableAsync = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            resolve("success");
        } else {
            reject(new Error("failed"));
        }
    }, Math.random() * 1000);
});

// Testing functions with side effects
let globalCounter = 0; // Global mutable state
const incrementGlobal = () => {
    globalCounter += 1; // Mutation in function
    console.log("Counter:", globalCounter);
    localStorage.setItem("counter", globalCounter.toString());
};

// Testing complex parameter patterns
const complexFunction = function complexFunction (params: {
    firstParam: unknown;
    secondParam: string | number | boolean | Record<string, unknown>;
    thirdParam?: unknown;
    restParams: unknown[];
}): unknown {
    const {firstParam, secondParam, thirdParam, restParams} = params;

    if (firstParam) {
        if (secondParam) {
            if (thirdParam) {
                return (restParams as Record<string, unknown>[]).map((item) => (item as Record<string, unknown>).value);
            }
        }
    }
    return null;
};

// Testing arrow functions with implicit any
const mapFunction = (items: unknown[]) => (items as Record<string, unknown>[]).map((item) => item.value);
const filterFunction = (items: unknown[]) => (items as Record<string, unknown>[]).filter((item) => item.active);
const reduceFunction = (items: unknown[]) => (items as Record<string, unknown>[])
    .reduce((acc, item) => (acc as number) + ((item as Record<string, unknown>).count as number), 0);

/*
 * =============================================================================
 * CLASS COMPONENTS - Testing legacy and problematic patterns
 * =============================================================================
 */

// Testing class with better types and patterns
interface ProblematicComponentProps {
    readonly data?: Record<string, unknown>[];
}

interface ProblematicComponentState {
    readonly data: Record<string, unknown>[] | null;
    readonly loading: boolean;
    readonly error: string | null;
    readonly cache: Record<string, unknown>;
    readonly history: unknown[];
    readonly clicked?: boolean;
}

class ProblematicComponent extends React.Component<ProblematicComponentProps, ProblematicComponentState> {

    constructor (props: ProblematicComponentProps) {
        super(props);
        this.state = {
            data: null,
            loading: false,
            error: null,
            cache: {},
            history: []
        };

        // Binding in constructor (anti-pattern)
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount (): void {
        // Direct DOM manipulation
        const element = document.getElementById("some-element");
        if (element) {
            element.style.display = "block";
        }

        // Memory leak - no cleanup
        window.addEventListener("resize", this.handleResize);
    }

    shouldComponentUpdate (): boolean {
        // Use this to access component properties with destructuring
        const {data: propsData} = this.props;
        const {data: stateData} = this.state;
        return propsData !== stateData;
    }

    componentDidUpdate (prevProps: ProblematicComponentProps): void {
        const {data} = this.props;
        // Potential infinite loop - fixed by removing setState
        if (data !== prevProps.data) {
            // Instead of setState, just log the change
            console.log("Data changed:", data);
        }
    }

    // Missing cleanup - now properly implemented
    componentWillUnmount (): void {
        // Clear timer and remove event listener
        if (this.timer) {
            clearInterval(this.timer);
        }
        window.removeEventListener("resize", this.handleResize);
    }

    private timer: NodeJS.Timeout | null = null;

    handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        // Arrow function property that uses this
        event.stopPropagation();
        console.log("Button clicked in component:", this.constructor.name);
    };

    handleSubmit (event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const {data, loading, error, cache, history} = this.state;
        // Async operation without error handling
        fetch("/api/submit", {
            method: "POST",
            body: JSON.stringify({
                data,
                loading,
                error,
                cache,
                history
            })
        });
    }

    handleResize = (): void => {
        this.forceUpdate(); // Force update anti-pattern
    };

    render (): React.ReactNode {
        const {data, loading, error} = this.state;

        if (error) {
            throw new Error(error); // Throwing in render
        }

        return (
            <div>
                {loading ?
                    <div>
                        Loading...
                    </div> :
                    null}

                {data ?
                    <div>
                        <span>
                            Data:
                            {JSON.stringify(data)}
                        </span>

                        <button
                            onClick={(event) => this.handleClick(event)}
                            type="button"
                        >
                            Click me
                        </button>
                    </div> :
                    null}
            </div>
        );
    }

}

/*
 * Testing PureComponent misuse - converted to functional component
 */
interface ImpurePureComponentProps {
    readonly items?: Record<string, unknown>[];
}

const ImpurePureComponent: React.FC<ImpurePureComponentProps> = (props) => {
    const {items} = props;

    // Object creation in render (breaks optimization)
    const style = {
        color: "red",
        fontSize: "14px"
    };

    const data = {
        timestamp: Date.now(),
        random: Math.random(),
        itemsCount: items?.length || 0 // Use the items prop
    };

    return (
        <div style={style}>
            {JSON.stringify(data)}
        </div>
    );
};

/*
 * =============================================================================
 * HOOKS AND FUNCTIONAL COMPONENTS - Testing hook patterns
 * =============================================================================
 */

// Testing custom hook with issues
const useProblematicHook = (initialValue: unknown) => {
    const [state, setState] = useState(initialValue);
    const [cache, setCache] = useState({});
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Effect without dependencies
    useEffect(() => {
        console.log("State changed:", state);
    });

    // Effect with wrong dependencies
    useEffect(() => {
        const timer = setInterval(() => {
            setState(Math.random());
        }, 1000);

        intervalRef.current = timer;
        return () => clearInterval(timer);
    }, []); // Missing state dependency

    // Effect without cleanup
    useEffect(() => {
        const subscription = {unsubscribe: () => {

            /* Cleanup */
        }};
        return () => subscription.unsubscribe();
    }, []);

    const updateState = (newValue: unknown) => {
        setState(newValue);
        setCache((prev) => ({...prev,
            [Date.now()]: newValue}));
    };

    return {state,
        updateState,
        cache};
};

// Testing problematic useCallback patterns
const useEventHandlers = () => {
    const [data, setData] = useState({});

    // UseCallback without dependencies
    const handleClick = useCallback(() => {
        setData((prevData) => ({...prevData,
            clicked: true}));
    }, []);

    // UseCallback with wrong dependencies
    const handleSubmit = useCallback((formData: unknown) => {
        const processedData = processData(formData);
        setData(processedData as Record<string, unknown>);
    }, []); // Missing processData dependency

    // Use data to avoid unused warning
    console.log(data);

    return {handleClick,
        handleSubmit};
};

// Testing useMemo misuse
const useExpensiveCalculation = (items: unknown[]) => {
    // Expensive calculation that's not actually expensive
    const result = useMemo(() => items.length, [items]);

    // UseMemo with side effects
    const sideEffect = useMemo(() => {
        console.log("Computing...");
        localStorage.setItem("cache", JSON.stringify(items));
        return (items as Record<string, unknown>[]).map((item) => item.value);
    }, [items]);

    return {result,
        sideEffect};
};

/*
 * =============================================================================
 * CONTEXT AND PROVIDERS - Testing context patterns
 * =============================================================================
 */

// Testing context without default value
const ProblematicContext = createContext<{
    state: Record<string, unknown>;
    setState: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
    timestamp: number;
    random: number;
} | null>(null);

// Testing context with any type
const AnyContext = createContext<unknown>(null);

// Testing provider component with issues
const ProblematicProvider: React.FC<{readonly children: React.ReactNode}> = ({children}) => {
    const [state, setState] = useState({});

    // Object created on every render - fixed with useMemo
    const contextValue = useMemo(() => ({
        state,
        setState,
        timestamp: Date.now(),
        random: Math.random()
    }), [state, setState]);

    return (
        <ProblematicContext.Provider value={contextValue}>
            {children}
        </ProblematicContext.Provider>
    );
};

// Testing context consumer with issues
const useProblematicContext = () => {
    const context = useContext(ProblematicContext);
    // No null check
    return context;
};

/*
 * =============================================================================
 * REDUCER PATTERNS - Testing useReducer
 * =============================================================================
 */

// Testing reducer with better types
interface ReducerState {
    readonly data?: Record<string, unknown>;
    readonly user?: {
        name: string;
    };
}

interface ReducerAction {
    readonly type: "SET_DATA" | "UPDATE_USER" | "RESET";
    readonly payload?: unknown;
}

const problematicReducer = (state: ReducerState, action: ReducerAction): ReducerState => {
    switch (action.type) {
        case "SET_DATA":
            return {...state,
                data: action.payload as Record<string, unknown>};
        case "UPDATE_USER":
            // Direct mutation
            if (state.user && action.payload && typeof action.payload === "object" && "name" in action.payload) {
                state.user.name = (action.payload as {name: string}).name;
            }
            return state;
        case "RESET":
            return {}; // Consistent return type
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};

// Testing useReducer with issues
const useProblematicReducer = () => {
    const [state, dispatch] = useReducer(problematicReducer, {});

    // Actions without proper typing
    const setData = (data: Record<string, unknown>) => dispatch({type: "SET_DATA",
        payload: data});
    const updateUser = (user: {name: string}) => dispatch({type: "UPDATE_USER",
        payload: user});
    const reset = () => dispatch({type: "RESET"});

    return {state,
        setData,
        updateUser,
        reset};
};

/*
 * =============================================================================
 * FORWARD REF AND IMPERATIVE HANDLE - Testing ref patterns
 * =============================================================================
 */

interface CustomInputHandle {
    focus: () => void;
    getValue: () => string;
    doSomething: () => void;
}

// Testing forwardRef with issues
interface ProblematicForwardRefProps extends React.InputHTMLAttributes<HTMLInputElement> {
    readonly placeholder?: string;
}

const ProblematicForwardRef = forwardRef<CustomInputHandle, ProblematicForwardRefProps>((props, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const {placeholder} = props;

    useImperativeHandle(ref, () => ({
        focus: () => internalRef.current?.focus(),
        getValue: () => internalRef.current?.value || "",
        doSomething: () => {
            // Side effect in imperative handle
            console.log("Doing something...");
            globalCounter += 1;
        }
    }));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Input changed:", event.target.value);
    };

    return (
        <input
            onChange={handleChange}
            placeholder={placeholder}
            ref={internalRef}
            type="text"
        />
    );
});

ProblematicForwardRef.displayName = "ProblematicForwardRef";

/*
 * =============================================================================
 * MEMO COMPONENTS - Testing memoization patterns
 * =============================================================================
 */

// Testing memo components with proper types and display names
const ProblematicMemo = memo((props: {
    readonly color?: string;
    readonly size?: number;
}) => {
    // Object creation in render
    const style = {
        color: props.color || "black",
        fontSize: `${props.size || 14}px`
    };

    const data = {
        timestamp: Date.now(),
        props
    };

    return (
        <div style={style}>
            {JSON.stringify(data)}
        </div>
    );
});
ProblematicMemo.displayName = "ProblematicMemo";

// Testing memo with problematic comparison function
const ProblematicMemoWithCompare = memo((props: {readonly children: React.ReactNode}) => (
    <div>
        {props.children}
    </div>
), (
    prevProps: {readonly children: React.ReactNode},
    nextProps: {readonly children: React.ReactNode}
) => (
    // Problematic comparison
    JSON.stringify(prevProps) === JSON.stringify(nextProps)));
ProblematicMemoWithCompare.displayName = "ProblematicMemoWithCompare";

/*
 * =============================================================================
 * MAIN COMPLEX COMPONENT - Testing comprehensive patterns
 * =============================================================================
 */

export const ComplexTestComponent: React.FC<{readonly theme?: string}> = (props) => {
    // Multiple state variables with proper typing
    const [data, setData] = useState<Record<string, unknown>[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | string | null>(null);
    const [cache, setCache] = useState<Record<string, unknown>>({});
    const [history, setHistory] = useState<unknown[]>([]);
    const [filters, setFilters] = useState<Record<string, unknown>>({});
    const [selectedItems, setSelectedItems] = useState<Record<string, unknown>[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<Record<string, unknown>>({});

    // Refs with proper typing
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const customInputRef = useRef<CustomInputHandle>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Custom hooks usage - keeping variables to avoid unused errors in test file
    const {state: hookState, updateState} = useProblematicHook({});
    const {handleClick, handleSubmit} = useEventHandlers();
    const {result, sideEffect} = useExpensiveCalculation(selectedItems);
    const {state: reducerState, setData: setReducerData} = useProblematicReducer();

    // Use the variables to avoid unused warnings
    console.log(hookState, updateState, handleClick, result, sideEffect, reducerState, setReducerData, setLoading, setError);

    // Effects with various issues
    useEffect(() => {
        // No cleanup for async operation
        fetchData("/api/data").then((apiResult: unknown) => {
            if (Array.isArray(apiResult)) {
                setData(apiResult as Record<string, unknown>[]);
            }
        });
    }, []);

    useEffect(() => {
        // Timer without cleanup
        const timer = setInterval(() => {
            setHistory((prev) => [...prev, Date.now()]);
        }, 5000);
        timerRef.current = timer;
    }, []);

    useEffect(() => {
        // DOM manipulation in effect
        document.title = `Data: ${data?.length || 0} items`;
        const {theme} = props;
        document.body.style.background = theme === "dark" ? "#000" : "#fff";
    });

    useEffect(() => {
        // Event listener without cleanup
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setModalOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyPress);
    }, []);

    // Callback functions with issues - keeping for test purposes
    const handleDataUpdate = useCallback((newData: Record<string, unknown>[]) => {
        setData(newData);
        setCache((prev) => ({...prev,
            [Date.now()]: newData}));
        setHistory((prev) => [...prev, newData]);
    }, []); // Missing dependencies

    const handleFilterChange = useCallback((filterKey: string, value: unknown) => {
        setFilters((prev) => ({...prev,
            [filterKey]: value}));
        // Side effect in callback
        localStorage.setItem("filters", JSON.stringify(filters));
    }, [filters]);

    const handleItemSelect = useCallback((item: Record<string, unknown>, selected: boolean) => {
        if (selected) {
            setSelectedItems((prev) => [...prev, item]);
        } else {
            setSelectedItems((prev) => prev.filter((prevItem) => prevItem.id !== item.id));
        }
    }, []);

    // Use handleDataUpdate to avoid unused warning
    console.log(handleDataUpdate);

    // Memoized values with issues
    const filteredData = useMemo(() => {
        if (!data || !Array.isArray(data)) {
            return [];
        }

        return data.filter((item: Record<string, unknown>) => Object.entries(filters).every(([key, value]: [string, unknown]) => {
            if (!value) {
                return true;
            }
            return item[key] === value;
        }));
    }, [data, filters]); // Fixed dependencies

    const expensiveCalculation = useMemo(() => {
        console.log("Calculating..."); // Side effect in memo
        return filteredData.reduce((acc: number, item: Record<string, unknown>) => acc + ((item.value as number) || 0), 0);
    }, [filteredData]);

    // Event handlers with inline functions
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formDataObj = new FormData(event.target as HTMLFormElement);
        const formDataEntries = Object.fromEntries(formDataObj);
        handleSubmit(formDataEntries);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setFormData({});
    };

    // Conditional rendering with potential issues
    const renderContent = () => {
        if (loading) {
            return (
                <div>
                    Loading...
                </div>
            );
        }

        if (error) {
            return (
                <div>
                    Error:
                    {error instanceof Error ? error.message : String(error)}
                </div>
            );
        }

        if (!data || data.length === 0) {
            return (
                <div>
                    No data available
                </div>
            );
        }

        return (
            <div>
                {filteredData.map((item: Record<string, unknown>, index: number) => (
                    <div
                        key={item.id as string || `item-${index}`} // Better key handling
                        onClick={() => handleItemSelect(item, !selectedItems.includes(item))}
                        style={{
                            backgroundColor: selectedItems.includes(item) ? "#e0e0e0" : "transparent",
                            padding: "10px",
                            cursor: "pointer"
                        }}
                    >
                        <h3>
                            {(item.title as string) || (item.name as string) || "Untitled"}
                        </h3>

                        <p>
                            {item.description as string}
                        </p>

                        {item.tags ?
                            <div>
                                {(item.tags as unknown[]).map((tag: unknown) => (
                                    <span
                                        key={`${item.id}-tag-${tag}`} // Better key using item id and tag
                                        style={{
                                            background: "#007acc",
                                            color: "white",
                                            padding: "2px 6px",
                                            borderRadius: "3px",
                                            marginRight: "4px"
                                        }}
                                    >
                                        {tag as string}
                                    </span>
                                ))}
                            </div> :
                            null}

                        <button
                            onClick={(event) => {
                                event.stopPropagation();
                                setSelectedItems((prev) => prev.filter((prevItem) => prevItem.id !== item.id));
                            }}
                            type="button"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div
            className="complex-test-component"
            ref={containerRef}
        >
            <header>
                <h1>
                    Complex Test Component
                </h1>

                <div>
                    <button
                        onClick={() => setModalOpen(true)}
                        type="button"
                    >
                        Open Modal
                    </button>

                    <button
                        onClick={() => incrementGlobal()}
                        type="button"
                    >
                        Increment Global
                    </button>

                    <button
                        onClick={() => setData(MIXED_ARRAY as Record<string, unknown>[])}
                        type="button"
                    >
                        Load Test Data
                    </button>
                </div>
            </header>

            <main>
                <section>
                    <h2>
                        Filters
                    </h2>

                    <input
                        onChange={(event) => handleFilterChange("search", event.target.value)}
                        placeholder="Search..."
                        ref={inputRef}
                        type="text"
                    />

                    <select onChange={(event) => handleFilterChange("category", event.target.value)}>
                        <option value="">
                            All Categories
                        </option>

                        <option value="type1">
                            Type 1
                        </option>

                        <option value="type2">
                            Type 2
                        </option>
                    </select>
                </section>

                <section>
                    <h2>
                        Content (
                        {filteredData.length}

                        {" "}
                        items)
                    </h2>

                    <p>
                        Selected:
                        {selectedItems.length}
                    </p>

                    <p>
                        Cache size:
                        {Object.keys(cache).length}
                    </p>

                    <p>
                        History:
                        {history.length}

                        {" "}
                        entries
                    </p>

                    <p>
                        Expensive calculation:
                        {expensiveCalculation}
                    </p>

                    {renderContent()}
                </section>

                <section>
                    <h2>
                        Legacy Components
                    </h2>

                    <ProblematicComponent data={data} />

                    <ImpurePureComponent items={filteredData} />
                </section>
            </main>

            {modalOpen ?
                <div
                    onClick={handleModalClose}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <div
                        onClick={(event) => event.stopPropagation()}
                        style={{
                            background: "white",
                            padding: "20px",
                            borderRadius: "8px",
                            minWidth: "400px"
                        }}
                    >
                        <h2>
                            Modal Form
                        </h2>

                        <form onSubmit={handleFormSubmit}>
                            <input
                                onChange={(event) => setFormData((prev) => ({...prev,
                                    name: event.target.value}))}
                                placeholder="Name"
                                type="text"
                            />

                            <input
                                onChange={(event) => setFormData((prev) => ({...prev,
                                    email: event.target.value}))}
                                placeholder="Email"
                                type="email"
                            />

                            <textarea
                                onChange={(event) => setFormData((prev) => ({...prev,
                                    description: event.target.value}))}
                                placeholder="Description"
                            />

                            <div>
                                <button type="submit">
                                    Submit
                                </button>

                                <button
                                    onClick={handleModalClose}
                                    type="button"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div> :
                null}

            <ProblematicProvider>
                <ProblematicMemo
                    color="red"
                    size={16}
                />

                <ProblematicMemoWithCompare>
                    <span>
                        Memo content
                    </span>
                </ProblematicMemoWithCompare>
            </ProblematicProvider>

            <ProblematicForwardRef
                placeholder="Forward ref input"
                ref={customInputRef}
            />

            {/* Debug section with potential security issues */}
            <details>
                <summary>
                    Debug Info (Click to expand)
                </summary>

                <pre>
                    {JSON.stringify({
                        data,
                        cache,
                        history: history.slice(-5), // Only last 5 entries
                        selectedItems: selectedItems.map((item) => item.id),
                        filters,
                        formData,
                        globalCounter,
                        config: CONFIG,
                        secrets: {
                            apiKey: "pk_test_123456789",
                            password: "admin123"
                        }
                    }, null, 2)}
                </pre>
            </details>
        </div>
    );
};

/*
 * =============================================================================
 * EXPORTS AND MODULE PATTERNS
 * =============================================================================
 */

// Testing various export patterns
export default ComplexTestComponent;
export {ProblematicComponent, ImpurePureComponent, ProblematicProvider};
export type {UserData, ProblematicInterface, ExtendedEntity};
export {ActionType, StatusCodes, CONFIG, MAGIC_NUMBERS};

/*
 * Testing namespace export
 * Export * as Utils from "./utils"; // Non-existent file - commented out
 */

// Testing function exports with issues
export const globalHelpers = {
    processData,
    transformData,
    fetchData,
    incrementGlobal,
    complexFunction,
    mapFunction,
    filterFunction,
    reduceFunction,
    unreliableAsync
};

// Export test data for linter testing
export const testData = {
    HARDCODED_VALUES,
    SPARSE_ARRAY,
    DUPLICATE_ARRAY,
    exampleStatus,
    exampleId,
    exampleCallback,
    exampleHandler,
    partialExample,
    requiredExample
};

// Export additional test utilities
export const testUtils = {
    AnyContext,
    useProblematicContext,
    PickedUser: {} as PickedUser
};

// Some global type augmentation for testing
declare global {
    interface Window {
        myApp: Record<string, unknown>;
        debugMode: boolean;
    }
}

// Testing module augmentation
declare module "react" {
    interface HTMLAttributes<T = HTMLElement> {
        customProp?: Record<string, unknown>;
        // Using T to avoid unused error
        "data-element-type"?: T extends HTMLElement ? string : never;
    }
}
