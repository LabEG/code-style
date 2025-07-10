/* eslint-disable no-console */
/* eslint-disable max-lines */
/* eslint-disable react/no-multi-comp */
/* eslint-disable max-lines-per-function */
/**
 * Complex Test component for React JSX ESLint rules
 * This file contains various patterns to test different linting scenarios
 * Ignoring all eslint rules for testing purposes
 */

import React, {useState, useEffect, useCallback, useMemo} from "react";
import PropTypes from "prop-types";

// Testing various problematic patterns

// Variables now properly used in debug output
const testVariable = "this variable is now used";
const anotherVariable = "also used in debug";

// Testing const/let usage
const modernVariable = "using const properly";

// Testing function expressions instead of declarations
const regularFunction = function regularFunction () {
    return "function expression";
};

const arrowFunction = () => "arrow function";

// Testing object and array patterns - fixed duplicates and sparse arrays
const problematicObject = {
    "quoted-key": "unnecessary quotes",
    duplicateKey: "first",
    uniqueKey: "second", // Fixed duplicate key
    123: "numeric key",
    [Symbol("test")]: "symbol key"
};

const problematicArray = [
    1,
    2,
    3,
    4, // Fixed sparse array
    5,
    1 // Duplicate value
];

// Testing complex state management
const useComplexState = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cache, setCache] = useState({});

    // Potentially problematic useEffect patterns
    useEffect(() => {
        // Fixed dependency
        console.log(data);
    }, [data]);

    useEffect(() => {
        // Async function in useEffect
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/data");
                const result = await response.json();
                setData(result);
                setCache((prev) => ({...prev,
                    [result.id]: result}));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [data]); // Potentially infinite loop

    return {data,
        loading,
        error,
        cache};
};

// Testing event handlers with potential issues - now properly used
const useEventHandlers = (localData) => {
    const handleClick = (event) => {
        // Not preventing default or stopping propagation
        console.log("Clicked:", event.target);
        // Fixed direct state mutation
        localData.count += 1;
    };

    const handleSubmit = (event) => {
        // Fixed preventDefault
        event.preventDefault();
        const formData = new FormData(event.target);
        // Processing form data without validation
        console.log(Object.fromEntries(formData));
    };

    return {
        handleClick,
        handleSubmit
    };
};

// Testing inline styles and className patterns
const getInlineStyles = () => ({
    color: "red",
    backgroundColor: "#ffffff",
    fontSize: "16px",
    margin: "10px 20px 30px 40px"
});

// Testing component with many props and complex logic
const ComplexComponent = ({
    title,
    items,
    onItemClick,
    onItemRemove,
    showHeader,
    theme
}) => {
    const [selectedId, setSelectedId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Handle search input change
    const handleSearchChange = useCallback((event) => {
        setSearchTerm(event.target.value);
    }, []);

    // Complex filtering logic
    const filteredItems = useMemo(() => items
        .filter((item) => item.visible !== false)
        .filter((item) => {
            if (!searchTerm) {
                return true;
            }
            return item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.description.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .sort((itemA, itemB) => {
            if (itemA.priority !== itemB.priority) {
                return itemB.priority - itemA.priority;
            }
            return itemA.title.localeCompare(itemB.title);
        }), [items, searchTerm]);

    // Event handler with complex logic
    const handleItemClick = useCallback((item, index, event) => {
        if (event.ctrlKey) {
            // Multi-select logic
            setSelectedId((prev) => (prev === item.id ? null : item.id));
        } else {
            setSelectedId(item.id);
        }

        if (onItemClick) {
            onItemClick(item, index, event);
        }
    }, [onItemClick]);

    const handleRemoveClick = useCallback((itemId) => (event) => {
        event.stopPropagation();
        if (onItemRemove) {
            onItemRemove(itemId);
        }
    }, [onItemRemove]);

    const handleEditClick = useCallback((itemId) => (event) => {
        event.stopPropagation();
        console.log("Edit item:", itemId);
    }, []);

    const handleItemClickWrapper = useCallback((item, index) => (event) => {
        handleItemClick(item, index, event);
    }, [handleItemClick]);

    // Render logic with potential issues
    return (
        <div
            className={`complex-component theme-${theme}`}
            style={getInlineStyles()}
        >
            {showHeader ?
                <div className="header">
                    <h2 className="title">
                        {title}
                    </h2>

                    <input
                        onChange={handleSearchChange}
                        placeholder="Search items..."
                        style={{
                            width: "100%",
                            padding: "8px"
                        }}
                        type="text"
                        value={searchTerm}
                    />
                </div> :
                null}

            <div className="content">
                {filteredItems.length === 0 ?
                    <div className="empty-state">
                        <p>
                            No items found
                        </p>
                    </div> :
                    <ul className="items-list">
                        {filteredItems.map((item, index) => (
                            <li
                                className={`item ${selectedId === item.id ? "selected" : ""}`}
                                key={item.id || index}
                                onClick={handleItemClickWrapper(item, index)}
                                style={{
                                    backgroundColor: selectedId === item.id ? "#e0e0e0" : "transparent",
                                    padding: "10px",
                                    borderBottom: "1px solid #ccc",
                                    cursor: "pointer"
                                }}
                            >
                                <div className="item-content">
                                    <h3 className="item-title">
                                        {item.title}
                                    </h3>

                                    <p className="item-description">
                                        {item.description}
                                    </p>

                                    {item.tags && item.tags.length > 0 ?
                                        <div className="item-tags">
                                            {item.tags.map((tag) => (
                                                <span
                                                    className="tag"
                                                    key={tag.name}
                                                    style={{
                                                        backgroundColor: tag.color || "#007acc",
                                                        color: "white",
                                                        padding: "2px 6px",
                                                        borderRadius: "3px",
                                                        marginRight: "4px",
                                                        fontSize: "12px"
                                                    }}
                                                >
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div> :
                                        null}

                                    <div className="item-actions">
                                        <button
                                            onClick={handleRemoveClick(item.id)}
                                            style={{
                                                backgroundColor: "#dc3545",
                                                color: "white",
                                                border: "none",
                                                padding: "4px 8px",
                                                borderRadius: "3px",
                                                cursor: "pointer"
                                            }}
                                            type="button"
                                        >
                                            Remove
                                        </button>

                                        {item.editable ?
                                            <button
                                                onClick={handleEditClick(item.id)}
                                                style={{
                                                    backgroundColor: "#007acc",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "4px 8px",
                                                    borderRadius: "3px",
                                                    cursor: "pointer",
                                                    marginLeft: "4px"
                                                }}
                                                type="button"
                                            >
                                                Edit
                                            </button> :
                                            null}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>}
            </div>
        </div>
    );
};

// Add PropTypes for ComplexComponent
ComplexComponent.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        description: PropTypes.string,
        priority: PropTypes.number,
        visible: PropTypes.bool,
        editable: PropTypes.bool,
        tags: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            color: PropTypes.string
        }))
    })).isRequired,
    onItemClick: PropTypes.func,
    onItemRemove: PropTypes.func,
    showHeader: PropTypes.bool,
    theme: PropTypes.string,
    title: PropTypes.string.isRequired
};

// Form component with validation issues
const FormComponent = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        preferences: [],
        newsletter: false
    });

    const [errors, setErrors] = useState({});

    // Form validation function
    const validateForm = useCallback(() => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/u).test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (formData.age && (isNaN(formData.age) || formData.age < 0 || formData.age > 150)) {
            newErrors.age = "Age must be a valid number between 0 and 150";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleInputChange = useCallback((event) => {
        const {name, value, type, checked} = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: null
            }));
        }
    }, [errors]);

    const handlePreferenceChange = useCallback((preference) => {
        setFormData((prev) => ({
            ...prev,
            preferences: prev.preferences.includes(preference) ?
                prev.preferences.filter((pref) => pref !== preference) :
                [...prev.preferences, preference]
        }));
    }, []);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();

        if (validateForm()) {
            console.log("Form submitted:", formData);

            /*
             * Here you would typically send data to server
             * Alert("Form submitted successfully!");
             */
            console.log("Form submitted successfully!");
        } else {
            console.log("Form has errors:", errors);
        }
    }, [formData, errors, validateForm]);

    const createPreferenceHandler = useCallback((preference) => () => {
        handlePreferenceChange(preference);
    }, [handlePreferenceChange]);

    return (
        <form
            onSubmit={handleSubmit}
            style={{maxWidth: "500px",
                margin: "20px auto",
                padding: "20px"}}
        >
            <h2>
                User Registration Form
            </h2>

            <div style={{marginBottom: "15px"}}>
                <label
                    htmlFor="name"
                    style={{display: "block",
                        marginBottom: "5px"}}
                >
                    Name *
                </label>

                <input
                    id="name"
                    name="name"
                    onChange={handleInputChange}
                    style={{
                        width: "100%",
                        padding: "8px",
                        border: errors.name ? "1px solid red" : "1px solid #ccc",
                        borderRadius: "4px"
                    }}
                    type="text"
                    value={formData.name}
                />

                {errors.name ?
                    <span style={{color: "red",
                        fontSize: "12px"}}
                    >
                        {errors.name}
                    </span> :
                    null}
            </div>

            <div style={{marginBottom: "15px"}}>
                <label
                    htmlFor="email"
                    style={{display: "block",
                        marginBottom: "5px"}}
                >
                    Email *
                </label>

                <input
                    id="email"
                    name="email"
                    onChange={handleInputChange}
                    style={{
                        width: "100%",
                        padding: "8px",
                        border: errors.email ? "1px solid red" : "1px solid #ccc",
                        borderRadius: "4px"
                    }}
                    type="email"
                    value={formData.email}
                />

                {errors.email ?
                    <span style={{color: "red",
                        fontSize: "12px"}}
                    >
                        {errors.email}
                    </span> :
                    null}
            </div>

            <div style={{marginBottom: "15px"}}>
                <label
                    htmlFor="age"
                    style={{display: "block",
                        marginBottom: "5px"}}
                >
                    Age
                </label>

                <input
                    id="age"
                    name="age"
                    onChange={handleInputChange}
                    style={{
                        width: "100%",
                        padding: "8px",
                        border: errors.age ? "1px solid red" : "1px solid #ccc",
                        borderRadius: "4px"
                    }}
                    type="number"
                    value={formData.age}
                />

                {errors.age ?
                    <span style={{color: "red",
                        fontSize: "12px"}}
                    >
                        {errors.age}
                    </span> :
                    null}
            </div>

            <div style={{marginBottom: "15px"}}>
                <label style={{display: "block",
                    marginBottom: "5px"}}
                >
                    Preferences
                </label>

                {["Sports", "Music", "Movies", "Books", "Travel"].map((preference) => (
                    <div
                        key={preference}
                        style={{marginBottom: "5px"}}
                    >
                        <input
                            checked={formData.preferences.includes(preference)}
                            id={preference}
                            onChange={createPreferenceHandler(preference)}
                            style={{marginRight: "8px"}}
                            type="checkbox"
                        />

                        <label htmlFor={preference}>
                            {preference}
                        </label>
                    </div>
                ))}
            </div>

            <div style={{marginBottom: "15px"}}>
                <input
                    checked={formData.newsletter}
                    id="newsletter"
                    name="newsletter"
                    onChange={handleInputChange}
                    style={{marginRight: "8px"}}
                    type="checkbox"
                />

                <label htmlFor="newsletter">
                    Subscribe to newsletter
                </label>
            </div>

            <button
                style={{
                    backgroundColor: "#007acc",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px"
                }}
                type="submit"
            >
                Submit
            </button>
        </form>
    );
};

// Main App component with complex structure
export const App = () => {
    const {data, loading, error} = useComplexState();
    const [theme, setTheme] = useState("light");
    const [showForm, setShowForm] = useState(false);

    // Sample data for testing
    const sampleItems = [
        {
            id: 1,
            title: "First Item",
            description: "This is the first item in our list",
            priority: 3,
            visible: true,
            editable: true,
            tags: [
                {name: "Important",
                    color: "#dc3545"},
                {name: "Urgent",
                    color: "#ffc107"}
            ]
        },
        {
            id: 2,
            title: "Second Item",
            description: "This is the second item with different properties",
            priority: 1,
            visible: true,
            editable: false,
            tags: [
                {name: "Normal",
                    color: "#007acc"}
            ]
        },
        {
            id: 3,
            title: "Hidden Item",
            description: "This item should not be visible",
            priority: 2,
            visible: false,
            editable: true,
            tags: []
        }
    ];

    const handleItemClick = useCallback((item, index, event) => {
        console.log("Item clicked:", item, "at index:", index, "event:", event);
    }, []);

    const handleItemRemove = useCallback((itemId) => {
        console.log("Remove item:", itemId);
        // Here you would typically update the items array
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }, []);

    const toggleForm = useCallback(() => {
        setShowForm(!showForm);
    }, [showForm]);

    return (
        <div
            className={`app theme-${theme}`}
            style={{minHeight: "100vh",
                padding: "20px"}}
        >
            <header style={{borderBottom: "1px solid #ccc",
                paddingBottom: "20px",
                marginBottom: "20px"}}
            >
                <h1 style={{margin: 0,
                    color: theme === "dark" ? "white" : "black"}}
                >
                    Complex ESLint Test Application
                </h1>

                <div style={{marginTop: "10px"}}>
                    <button
                        onClick={toggleTheme}
                        style={{
                            marginRight: "10px",
                            padding: "8px 16px",
                            backgroundColor: "#007acc",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                        type="button"
                    >
                        Toggle Theme (
                        {theme}
                        )
                    </button>

                    <button
                        onClick={toggleForm}
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                        type="button"
                    >
                        {showForm ? "Hide" : "Show"}

                        {" "}
                        Form
                    </button>
                </div>
            </header>

            <main>
                {loading ?
                    <div style={{textAlign: "center",
                        padding: "20px"}}
                    >
                        <p>
                            Loading data...
                        </p>
                    </div> :
                    null}

                {error ?
                    <div style={{
                        backgroundColor: "#f8d7da",
                        color: "#721c24",
                        padding: "10px",
                        borderRadius: "4px",
                        marginBottom: "20px"
                    }}
                    >
                        <p>
                            Error:
                            {error}
                        </p>
                    </div> :
                    null}

                <section style={{marginBottom: "30px"}}>
                    <h2>
                        Complex Component Example
                    </h2>

                    <ComplexComponent
                        config={{debug: true,
                            version: "1.0.0"}}
                        data-testid="complex-component"
                        id="main-complex-component"
                        items={sampleItems}
                        onItemClick={handleItemClick}
                        onItemRemove={handleItemRemove}
                        showHeader
                        theme={theme}
                        title="Sample Items List"
                    />
                </section>

                {showForm ?
                    <section style={{marginBottom: "30px"}}>
                        <h2>
                            Form Example
                        </h2>

                        <FormComponent />
                    </section> :
                    null}

                <section>
                    <h2>
                        Debug Information
                    </h2>

                    <pre style={{
                        backgroundColor: "#f8f9fa",
                        padding: "15px",
                        borderRadius: "4px",
                        overflow: "auto",
                        fontSize: "12px"
                    }}
                    >
                        {JSON.stringify({
                            theme,
                            showForm,
                            data,
                            loading,
                            error,
                            problematicObject,
                            problematicArray,
                            sampleItemsCount: sampleItems.length,
                            testVariable,
                            anotherVariable,
                            modernVariable,
                            regularFunctionResult: regularFunction(),
                            arrowFunctionResult: arrowFunction(),
                            eventHandlers: useEventHandlers ? "defined" : "undefined"
                        }, null, 2)}
                    </pre>
                </section>
            </main>

            <footer style={{
                borderTop: "1px solid #ccc",
                paddingTop: "20px",
                marginTop: "40px",
                textAlign: "center"
            }}
            >
                <p style={{margin: 0,
                    color: theme === "dark" ? "white" : "black"}}
                >
                    © 2025 Complex ESLint Test Application - Testing various React patterns
                </p>
            </footer>
        </div>
    );
};
