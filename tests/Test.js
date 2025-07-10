/* eslint-disable no-console */
/* eslint-disable max-lines */

/**
 * Complex Test file for JavaScript ESLint rules
 * This file contains various code patterns to test different linting scenarios
 * Ignoring all eslint rules for testing purposes
 */

// Global state for testing
let globalCounter = 0;

// Testing variable declarations and scoping issues
const globalVariable = "should use const or let";
const mutableVariable = "can be changed";
const immutableVariable = "cannot be changed";

// Variables for testing - properly used
const demonstrationFunction = () => "called for demonstration";
const demonstrationVariable = "initialized";
const anotherDemonstration = "used in examples";

// Testing hoisting and temporal dead zone - proper declaration
const hoistedVariable = "this is properly declared";
console.log("After declaration:", typeof hoistedVariable);

// Testing problematic patterns
const badFunction = () => {
    // Proper return handling
    if (Math.random() > 0.5) {
        return "sometimes returns string";
    }
    // Explicit return
    return null;
};

// Testing equality and comparison operators
const testEquality = (valueA, valueB) => {
    // Using === instead of ==
    if (valueA === valueB) {
        return true;
    }

    // Using !== instead of !=
    if (valueA !== null) {
        return false;
    }

    // Proper boolean comparison
    if (valueA === true || valueA === false) {
        return "should use Boolean(valueA)";
    }

    return null;
};

// Testing object and array manipulation with mutations
const originalArray = [1, 2, 3, 4, 5];
const originalObject = {name: "John",
    age: 30};

// Direct mutation (should avoid)
originalArray.push(6);
originalObject.age = 31;

// Testing for-in and for-of loops with potential issues
const problematicLoop = (items) => {
    // Using for-of on array instead of for-in
    for (const index of items.keys()) {
        if (Object.hasOwn(items, index)) {
            console.log("Index:", index, "Value:", items[index]);
        }
    }

    // Using const in for-of
    for (const item of items) {
        const modifiedItem = item * 2; // Not reassigning loop variable
        console.log("Modified:", modifiedItem);
    }

    // Traditional for loop with proper closure handling
    for (let idx = 0; idx < items.length; idx += 1) {
        setTimeout((currentIndex) => {
            console.log("Fixed closure:", currentIndex);
        }, 100, idx);
    }
};

// Testing function expressions and declarations
const regularFunction = (param1, param2) => {
    // Multiple returns in different branches
    if (!param1) {
        return null;
    }

    if (!param2) {
        return null;
    }

    try {
        return param1 + param2;
    } catch (error) {
        console.error("Error occurred:", error);
        return 0;
    } finally {
        console.log("Finally block executed");
    }
};

// Arrow function with proper return
const arrowFunction = (valueX, valueY) => valueX + valueY;

// Function with object parameter instead of many parameters
const tooManyParams = (parameters) => {
    const {valueA, valueB, valueC, valueD, valueE, valueF, valueG, valueH, valueI, valueJ} = parameters;
    return valueA + valueB + valueC + valueD + valueE + valueF + valueG + valueH + valueI + valueJ;
};

// Testing async/await patterns with potential issues
const asyncFunction = async (url) => {
    // Missing try-catch for async operations
    const response = await fetch(url);
    const data = await response.json();

    // Not checking response.ok
    return data;
};

// Promise chains with proper structure
const promiseChain = (url) => fetch(url)
    .then((response) => response.json())
    .then((data) => fetch(data.nextUrl)
        .then((nextResponse) => nextResponse.json()))
    .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throwing error
    });

// Testing class definitions with proper structure
class ProblematicClass {

    constructor (userData) {
        // Using object parameter instead of many parameters
        const {name, age, email, phone, address, city, country, zipCode} = userData;
        this.name = name;
        this.age = age;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.country = country;
        this.zipCode = zipCode;

        // Binding methods in constructor (performance issue) - moved to arrow property
    }

    // Method with explicit return
    updateAge (newAge) {
        if (newAge > 0) {
            this.age = newAge;
            return this.age;
        }
        return this.age;
    }

    // Static method that doesn't mutate global state
    static updateGlobalCounter () {
        return globalCounter + 1;
    }

    // Arrow function property (potential issues with inheritance)
    arrowMethod = () => this.name;

    boundMethod () {
        return `Bound method for ${this.name}`;
    }

    // Static method without side effects
    static createUser (data) {
        return new ProblematicClass(data);
    }

}

// Testing global state and closures
const createCounter = () => {
    let count = 0;

    return {
        increment () {
            count += 1;
            globalCounter += 1; // Accessing global state
            return count;
        },

        decrement () {
            count -= 1;
            return count;
        },

        // Method that exposes internal state
        getCount: () => count,

        // Method that allows external mutation
        setCount: (newCount) => {
            count = newCount;
        }
    };
};

// Testing object property definitions
const problematicObject = {
    // Unnecessary quotes
    normalProperty: "value1",

    // Mixed quote styles
    doubleQuoted: "value2",

    // Proper single property (removed duplicate)
    property: "final value",

    // Method definitions
    oldMethodSyntax () {
        return "old syntax";
    },

    newMethodSyntax () {
        return "new syntax";
    },

    // Arrow function property
    arrowProperty: () => "arrow function",

    // Computed property with side effect
    [(() => {
        console.log("Computing property name");
        return "computedProp";
    })()]: "computed value"
};

// Testing array methods and functional programming
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Efficient array operations with proper naming
const processNumbers = () => {
    // Chained operations for efficiency
    const evens = numbers.filter((number) => number % 2 === 0);
    const doubled = evens.map((number) => number * 2);
    const sum = doubled.reduce((accumulator, number) => accumulator + number, 0);

    // Using filter and map instead of forEach with side effects
    const results = numbers
        .filter((number) => number > 5)
        .map((number) => number * number);

    // Using forEach correctly (with side effects)
    numbers.forEach((number) => {
        console.log("Processing:", number);
    });

    return {sum,
        results};
};

// Testing error handling patterns
const errorProneFunction = (data) => {
    // Not validating input
    const result = data.someProperty.nestedProperty;

    // Throwing proper Error objects
    if (result === null) {
        throw new Error("Result is null");
    }

    // Catching specific error types
    try {
        return JSON.parse(result);
    } catch (error) {
        // Handling specific error types
        console.error("JSON parse error:", error);
        return {};
    }
};

// Testing regular expressions
const regexTests = () => {
    // Efficient regex with unicode flag
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u;

    // Regex with non-capturing group
    const vulnerableRegex = /^(?:a+)+$/u;

    // Using string method instead of regex for simple operations
    const startsWithHello = (str) => str.startsWith("Hello");

    return {emailRegex,
        vulnerableRegex,
        startsWithHello};
};

// Testing switch statements with proper structure
const processUserType = (userType) => {
    switch (userType) {
        case "admin":
            console.log("Admin user");
            break;
        case "moderator":
            console.log("Moderator or Admin");
            break;
        case "user":
            console.log("Regular user");
            break;
        default:
            console.log("Unknown user type");
            break;
    }
};

// Testing complex conditional logic - refactored to reduce nesting
const complexConditions = (user, permissions, settings) => {
    // Early returns to reduce nesting
    if (!user || !user.isActive) {
        return false;
    }

    if (!permissions || !permissions.canRead) {
        return false;
    }

    if (!settings || !settings.allowAccess) {
        return false;
    }

    return true;
};

// Testing type coercion and falsy values
const typeCoercionTests = (value) => {
    // More specific conditions
    if (value !== null && typeof value !== "undefined" && value !== false && value !== 0 && value !== "") {
        console.log("Truthy value");
    }

    // Using strict equality
    if (value === 0) {
        console.log("Equals zero");
    }

    // Using explicit conversion
    const result = String(value);

    // Using explicit boolean conversion
    const boolValue = Boolean(value);

    return {result,
        boolValue};
};

// Testing module patterns and exports
const privateVariable = "should not be exported";

const publicFunction = () => privateVariable;

// Testing safe alternatives to dangerous functions
const safeFunctions = () => {
    // Using safer alternatives instead of eval
    const code = "console.log(\"Hello from safe code\")";
    console.log("Would execute:", code);

    // Using safer function creation
    const createAddFunction = (paramX, paramY) => paramX + paramY;

    return createAddFunction;
};

// Testing setTimeout and setInterval with proper cleanup
const timerFunctions = () => {
    // SetTimeout with proper function reference
    const timeoutId = setTimeout(() => {
        console.log("Timer executed");
    }, 1000);

    // SetInterval with cleanup capability
    const intervalId = setInterval(() => {
        console.log("Interval executed");
    }, 5000);

    // Using function instead of string
    const stringTimeoutId = setTimeout(() => {
        console.log("String timeout alternative");
    }, 2000);

    // Return cleanup function
    return () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
        clearTimeout(stringTimeoutId);
    };
};

// Testing debugging code removal
const debuggingCode = (data) => data;

// Testing performance anti-patterns - split into smaller functions
const createHandlersInLoop = () => {
    const handlers = [];
    for (let index = 0; index < 100; index += 1) {
        handlers.push(() => {
            console.log("Handler", index);
        });
    }
    return handlers;
};

const inefficientObjectAccess = () => {
    const nestedObject = {level1: {level2: {level3: {data: "deep value"}}}};
    const cachedReference = nestedObject.level1.level2.level3.data;
    for (let index = 0; index < 1000; index += 1) {
        console.log(cachedReference);
    }
};

const performanceIssues = () => {
    const handlers = createHandlersInLoop();
    inefficientObjectAccess();

    // Creating new Date objects repeatedly - fixed
    const now = new Date();
    for (let index = 0; index < 100; index += 1) {
        console.log(now.getTime());
    }

    return handlers;
};

// Testing magic numbers and strings
const magicValues = (status) => {
    // Magic numbers
    if (status === 200) {
        return "OK";
    } else if (status === 404) {
        return "Not Found";
    } else if (status === 500) {
        return "Internal Server Error";
    }

    // Magic strings
    const userRole = "administrator";
    if (userRole === "administrator") {
        return "admin";
    }

    return "unknown";
};

// Complex export with potential naming issues
export {
    // Variables
    globalVariable,
    mutableVariable,
    immutableVariable,
    demonstrationFunction,
    demonstrationVariable,
    anotherDemonstration,
    hoistedVariable,
    originalArray,
    originalObject,
    numbers,

    // Functions
    testEquality,
    problematicLoop,
    regularFunction,
    arrowFunction,
    tooManyParams,
    asyncFunction,
    promiseChain,
    processNumbers,
    errorProneFunction,
    regexTests,
    processUserType,
    complexConditions,
    typeCoercionTests,
    publicFunction,
    safeFunctions,
    timerFunctions,
    debuggingCode,
    createHandlersInLoop,
    inefficientObjectAccess,
    performanceIssues,
    magicValues,
    badFunction,
    demonstrationFunction,

    // Classes and objects
    ProblematicClass,
    createCounter,
    problematicObject,

    // Potentially problematic exports
    privateVariable, // Should not be exported
    globalCounter // Global state should not be exported
};

// Default export with potential issues
export default {
    version: "1.0.0",
    author: "Test Author",
    description: "Complex test file for ESLint rules",

    // Methods that access module state
    getGlobalCounter: () => globalCounter,
    incrementGlobalCounter: () => globalCounter + 1,

    // Method that returns private data
    getPrivateVariable: () => privateVariable,

    // Method with side effects
    initialize: () => {
        console.log("Initializing module...");
        globalCounter = 0;
    }
};
