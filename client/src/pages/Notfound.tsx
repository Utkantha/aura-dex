import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => {

    useEffect(() => {
        document.title = "NotFound"
    }, [])
    return (
        <div className="min-h-screen w-full flex items-center justify-center px-8 py-12 bg-muted">
            <div className="max-w-2xl text-center animate-fade-in-up">
                <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
                <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-lg text-primary/70 leading-relaxed mb-8">
                    Oops! The page you're looking for seems to have vanished into thin air.
                    Don't worry, you can always find your way back home.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                    >
                        Return Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors duration-200"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Notfound;