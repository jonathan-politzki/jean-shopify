// app/components/PersonalityLink.tsx
import { Form } from '@remix-run/react';

export function PersonalityLink() {
  return (
    <Form method="post" action="/api/recommend" className="space-y-4">
      <div>
        <label htmlFor="personality-link" className="block text-sm font-medium text-gray-700">
          Share a link that represents you (social profile, blog, etc.)
        </label>
        <input
          id="personalityLink"
          name="personalityLink"
          type="url"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="https://..."
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Get Personalized Recommendations
      </button>
    </Form>
  );
}