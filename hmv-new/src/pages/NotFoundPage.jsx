import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-container-lowest">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="text-center max-w-lg">
          <h1 className="text-8xl font-headline font-extrabold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-on-surface mb-6">Page Not Found</h2>
          <p className="text-on-surface-variant mb-10 text-lg">
            We're sorry, the page you're looking for cannot be found or has been moved.
          </p>
          <Link
            to="/"
            className="bg-primary hover:bg-primary-container text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined">home</span>
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
