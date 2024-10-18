import { Link } from "react-router-dom"

const ActiveJobs = () => {
    return (
        <section className="container mx-auto my-12 p-6 bg-white shadow-lg rounded-lg text-center">
            <h1 className="text-4xl font-bold mb-8">Активни Обяви</h1>

            {/* <!-- Section Content (Add your active jobs list here) --> */}
            <p className="mb-4">Това е мястото, където можете да управлявате вашите активни обяви за работа.</p>
            {/* 
    <!-- Back Button --> */}
            <Link to="/company-dashboard" className="inline-block px-8 py-4 bg-[#004AAD] text-white font-semibold rounded hover:bg-blue-700">Обратно в Профила</Link>
        </section>
    )
}

export default ActiveJobs