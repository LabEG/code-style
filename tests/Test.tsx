import * as React from "react";

export const App = () => (
    <div className="App">
        <div className="App-header">
            <img
                alt="logo"
                className="App-logo"
            />

            <h2>
                Welcome to React
            </h2>
        </div>

        <p className="App-intro">
            To get started, edit
            {" "}

            <code>
                src/App.tsx
            </code>

            {" "}
            and save to reload.

            {String(React)}
        </p>
    </div>
);
