// app/components/AuthFlow.tsx
import { Form } from '@remix-run/react';

export function AuthFlow() {
  return (
    <div className="flex flex-col gap-4">
      <Form action="/auth/google" method="post">
        <button 
          type="submit"
          className="w-full px-4 py-2 bg-white text-gray-800 rounded-lg border shadow-sm hover:shadow-md transition-all"
        >
          Continue with Google
        </button>
      </Form>
      
      <Form action="/auth/linkedin" method="post">
        <button 
          type="submit"
          className="w-full px-4 py-2 bg-[#0077B5] text-white rounded-lg border shadow-sm hover:shadow-md transition-all"
        >
          Continue with LinkedIn
        </button>
      </Form>
    </div>
  );
}