import { type ReactNode } from 'react';
import { Component } from 'react';
import { toast } from 'react-toastify';

import { Toast } from '~/bundles/common/components/toast/toast';

interface ErrorBoundaryProperties {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<
    ErrorBoundaryProperties,
    ErrorBoundaryState
> {
    public state: ErrorBoundaryState = {
        hasError: false,
    };
    public static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    public componentDidCatch(error: Error): void {
        toast.error(error.message);
    }

    public render(): ReactNode {
        if (this.state.hasError) {
            return <Toast />;
        }
        return this.props.children;
    }
}

export { ErrorBoundary };
