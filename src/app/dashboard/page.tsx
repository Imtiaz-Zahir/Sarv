import React from "react";

export default async function page() {
  const connections: {
    address: string;
    ip: string;
    port: string;
  }[] = [];

  return (
    <section className="px-4 lg:px-36 lg:py-4 py-2 flex justify-center gap-5 w-full mx-auto">
      <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Connection List</h1>

        {/* <div className="flex justify-end mb-4">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={handleAddConnection}
        >
          Add New Connection
        </button>
      </div> */}

        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Url</th>
              <th className="py-2 px-4 border-b text-left">IP</th>
              <th className="py-2 px-4 border-b text-left">Port</th>
              <th className="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {connections.map((connection, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{connection.address}</td>
                <td className="py-2 px-4 border-b">{connection.ip}</td>
                <td className="py-2 px-4 border-b">{connection.port}</td>
                <td className="py-2 px-4 border-b">
                  Edit
                  {/* <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEditConnection(connection)}
                >
                  Edit
                </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
