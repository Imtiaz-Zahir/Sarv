import ConnectionList from "@/components/Connection";
import React from "react";

export default function page() {
  return (
    <section className="px-4 lg:px-36 lg:py-4 py-2 flex justify-center gap-5 w-full mx-auto">
      <ConnectionList />
      <div>
        <div className="max-w-sm w-full border border-black rounded-lg p-4">
          {/* Info Section */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Download Our Software
            </h2>
            <p className="text-sm text-gray-700">
              Get the latest version of our software. Simply click the button
              below to start the download. Installation is quick and easy. For
              any issues, visit our{" "}
              <a href="/support" className="text-blue-500 underline">
                support page
              </a>
              .
            </p>
          </div>

          {/* Download Button */}
          <button className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300">
            Download
          </button>
        </div>
      </div>
    </section>
  );
}
