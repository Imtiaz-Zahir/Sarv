"use client";
import React, { useState } from "react";

interface Connection {
  address: string;
  ip: string;
  port: string;
}

const ConnectionList: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([
    { address: "192.175.152.172", ip: "localhost", port: "8080" },
  ]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentConnection, setCurrentConnection] = useState<Connection | null>(
    null
  );
  const [newConnection, setNewConnection] = useState<Connection>({
    address: "",
    ip: "",
    port: "",
  });

  const handleAddConnection = () => {
    setIsModalVisible(true);
    setCurrentConnection(null);
    setNewConnection({ address: "", ip: "", port: "" });
  };

  const handleEditConnection = (connection: Connection) => {
    setIsModalVisible(true);
    setCurrentConnection(connection);
    setNewConnection(connection);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSaveConnection = () => {
    if (currentConnection) {
      // Edit existing connection
      setConnections(
        connections.map((conn) =>
          conn.address === currentConnection.address ? newConnection : conn
        )
      );
    } else {
      // Add new connection
      setConnections([...connections, newConnection]);
    }
    setIsModalVisible(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewConnection({ ...newConnection, [name]: value });
  };

  return (
    <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Connection List</h1>

      <div className="flex justify-end mb-4">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={handleAddConnection}
        >
          Add New Connection
        </button>
      </div>

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
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEditConnection(connection)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/editing connections */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
            <h2 className="text-xl font-semibold mb-4">
              {currentConnection ? "Edit Connection" : "Add New Connection"}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  URL
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="subdomain"
                    value={newConnection.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span className="px-4 py-2 bg-gray-200 border-t border-b border-r border-gray-300 text-gray-500 rounded-r-lg">
                    .mkpublic.top
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  IP
                </label>
                <input
                  type="text"
                  name="ip"
                  value={newConnection.ip}
                  onChange={handleChange}
                  placeholder="localhost"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Port
                </label>
                <input
                  type="text"
                  name="port"
                  value={newConnection.port}
                  onChange={handleChange}
                  placeholder="8080"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  onClick={handleSaveConnection}
                >
                  {currentConnection ? "Save Changes" : "Add Connection"}
                </button>
                {currentConnection && (
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    // onClick={handleDeleteConnection}
                  >
                    Delete Connection
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionList;
