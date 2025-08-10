import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            MentorScue Tutor Portal
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join our team of dedicated tutors and help students achieve their academic goals. 
            Apply now to become part of our growing community of educators.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/apply" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
            >
              Apply as Tutor
            </Link>
            <Link 
              href="/admin" 
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Easy Application</h3>
            <p className="text-gray-600">
              Simple and straightforward application process. Submit your details and we&apos;ll get back to you quickly.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Flexible Teaching</h3>
            <p className="text-gray-600">
              Choose your subjects, preferred classes, and teaching hours that work best for your schedule.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Support</h3>
            <p className="text-gray-600">
              Join a community of educators with ongoing support and resources to help you succeed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
