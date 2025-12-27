import React from 'react';

function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-[#aff3f6]">
      <h1 className="text-6xl font-bold mb-4">Error 404</h1>
      <p className="text-2xl text-gray-300">Page Not Found</p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-[#aff3f6] text-gray-900 rounded-lg shadow-lg hover:bg-[#8fe0e3] transition duration-300"
      >
        Go Back Home
      </a>
    </div>
  );
}

export default Error;
