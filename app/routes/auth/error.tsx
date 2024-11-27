// app/routes/auth/error.tsx
export default function AuthError() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
          <p className="text-gray-600 mb-4">
            There was a problem authenticating your account. Please try again or contact support if the problem persists.
          </p>
          <a 
            href="/"
            className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Return Home
          </a>
        </div>
      </div>
    )
  }