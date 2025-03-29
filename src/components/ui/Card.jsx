import React from "react";

export function Card({ className = "", children, ...props }) {
    return (
        <div
            className={`rounded-lg border bg-card text-card-foreground backdrop-blur-md shadow-sm ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ className = "", children, ...props }) {
    return (
        <div
            className={`backdrop-blur-md flex flex-col space-y-1.5 p-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardTitle({ className = "", children, ...props }) {
    return (
        <h3
            className={`text-2xl backdrop-blur-md font-semibold leading-none tracking-tight ${className}`}
            {...props}
        >
            {children}
        </h3>
    );
}

export function CardDescription({ className = "", children, ...props }) {
    return (
        <p
            className={`text-sm backdrop-blur-md text-muted-foreground ${className}`}
            {...props}
        >
            {children}
        </p>
    );
}

export function CardContent({ className = "", children, ...props }) {
    return (
        <div
            className={`p-6 bg-transparent backdrop-blur-md pt-0 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardFooter({ className = "", children, ...props }) {
    return (
        <div
            className={`flex items-center backdrop-blur-md p-6 pt-0 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
