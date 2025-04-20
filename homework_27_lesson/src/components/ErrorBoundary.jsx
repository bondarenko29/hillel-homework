import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error:', error);
        console.error('Details:', errorInfo);    
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className='p-8 text-red-400'>
                    <h2 className='text-2xl font-bold'>Somethig went wrong</h2>
                    <p>Try refreshing the page or come back later</p>
                </div>
            );
        }
        return this.props.children;
    }  
}
export default ErrorBoundary;