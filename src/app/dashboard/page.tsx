"use client";
import { createLinkAction, getLinksAction } from "@/actions/link";
import React, { useEffect, useState } from "react";

type Links = {
  id: string;
  name: string;
  createdAt: Date;
  connections: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    serviceIp: string;
    servicePort: number;
    serviceProtocol:
      | "HTTP"
      | "HTTPS"
      | "TCP"
      | "SSH"
      | "RDP"
      | "UNIX"
      | "SMB"
      | "HTTP_STATUS"
      | "BASTION";
    linkId: string;
  }[];
}[];

interface Connection {
  address: string;
  ip: string;
  port: string;
  protocol: string;
}

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
if (!rootDomain) {
  throw new Error("Root domain is not defined");
}

export default function Page() {
  const [links, setLinks] = useState<Links>([]);
  const [name, setName] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newConnection, setNewConnection] = useState<Connection>({
    address: "",
    ip: "",
    port: "",
    protocol: "",
  });
  const [currentConnection, setCurrentConnection] = useState<Connection | null>(
    null
  );

  const handleAddConnection = () => {
    setIsModalVisible(true);
    setCurrentConnection(null);
    setNewConnection({ address: "", ip: "", port: "", protocol: "" });
  };

  // const handleEditConnection = (connection: Connection) => {
  //   setIsModalVisible(true);
  //   setCurrentConnection(connection);
  //   setNewConnection(connection);
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSaveConnection = () => {
    // if (currentConnection) {
    //   // Edit existing connection
    //   setConnections(
    //     connections.map((conn) =>
    //       conn.address === currentConnection.address ? newConnection : conn
    //     )
    //   );
    // } else {
    //   // Add new connection
    //   setConnections([...connections, newConnection]);
    // }
    setIsModalVisible(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewConnection({ ...newConnection, [name]: value });
  };

  useEffect(() => {
    getLinksAction()
      .then((response) => {
        setLinks(response.links);
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong. Please try again later.");
      });
  }, []);

  async function handelAddLink(e: React.FormEvent) {
    try {
      e.preventDefault();

      if (!name) alert("Please enter a name for the link");

      const response = await createLinkAction(name);

      if (!response.success) {
        alert(response.message);
        return;
      }

      if (response.link) {
        setLinks([
          {
            id: response.link.id,
            name: response.link.name,
            createdAt: response.link.createdAt,
            connections: [],
          },
          ...links,
        ]);
      }

      setName("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    }
  }

  // const addNewItem = () => {
  //   const newItem: DataItem = {
  //     name: "New User",
  //     id: `${data.length + 1}`,
  //   };
  //   setData([...data, newItem]);
  // };

  // const deleteItem = (id: string) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  // const editItem = (id: string, newName: string) => {
  //   setData(
  //     data.map((item) => (item.id === id ? { ...item, name: newName } : item))
  //   );
  // };

  // const handleEdit = (id: string) => {
  //   const newName = prompt("Enter new name:");
  //   if (newName) {
  //     editItem(id, newName);
  //   }
  // };

  // const pipes: { name: string }[] = [
  //   { name: "Pipe 1" },
  //   // { name: "Pipe 2" },
  //   // { name: "Pipe 3" },
  // ];

  return (
    <section className="px-4 lg:px-28 lg:py-4 py-2">
      <div className="flex items-center justify-between">
        {
          links.length > 0 && (
            <h1 className="text-3xl font-medium">
              Connection List of{" "}
              <span className="font-bold">{links[0].name}</span>
            </h1>
          )

          // : (
          //   <h1 className="text-3xl font-medium">Create a new link</h1>
          // )
        }

        {links.length > 0 && (
          <div className="font-medium rounded border border-black flex items-center justify-between gap-1 relative min-w-48">
            <div className="flex items-center gap-2 w-full justify-center">
              {links.length ? (
                <p className="py-3 px-2">{links[0].name}</p>
              ) : (
                <button className="flex items-center justify-center gap-1 w-full cursor-pointer py-3 px-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path
                      d="M12 4V20M20 12L4 12"
                      stroke="#2B2A2A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Create Pipe</span>
                </button>
              )}
            </div>
            {/* {pipes.length > 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-12 h-12 p-2 cursor-pointer border-l border-black"
            >
              <path
                fill="#000"
                d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"
              ></path>
            </svg>
          )}
          <ul className="absolute top-12 bg-white border-x border-b border-black w-full rounded-b-lg shadow-lg">
            {pipes.map((pipe) => (
              <li
                key={pipe.name}
                className="flex items-center gap-2 w-full justify-between"
              >
                <p className="py-3 px-2">{pipe.name}</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-10 h-10 p-2 cursor-pointer border-l border-black"
                >
                  <path
                    fill="#000"
                    d="M12,7a2,2,0,1,0-2-2A2,2,0,0,0,12,7Zm0,10a2,2,0,1,0,2,2A2,2,0,0,0,12,17Zm0-7a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z"
                  ></path>
                </svg>
              </li>
            ))}
          </ul> */}
          </div>
        )}
      </div>
      {links.length > 0 ? (
        <div className="flex justify-center gap-5 w-full mt-5">
          {/* <div className="max-w-4xl w-full p-6 bg-white rounded-lg border border-black">
          <h1 className="text-3xl font-bold text-center mb-6">
            Connection List
          </h1> */}

          <div className="max-w-4xl w-full ">
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
                  <th className="py-2 px-4 border-b text-left">Protocol</th>
                  <th className="py-2 px-4 border-b text-left">IP</th>
                  <th className="py-2 px-4 border-b text-left">Port</th>
                  {/* <th className="py-2 px-4 border-b text-left">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {links[0].connections.map((connection, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">
                      {connection.name + "." + links[0].name + "." + rootDomain}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {connection.serviceProtocol}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {connection.serviceIp}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {connection.servicePort}
                    </td>
                    {/* <td className="py-2 px-4 border-b">
                      <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditConnection(connection)}
                    >
                      Edit
                    </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* </div> */}
          <div>
            <div className="max-w-sm w-full border border-black rounded-lg p-4">
              {/* Info Section */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Download Our Software
                </h2>
                <p className="text-sm text-gray-700">
                  Get the latest version of our software. Simply click the
                  button below to start the download. Installation is quick and
                  easy. For any issues, visit our{" "}
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
        </div>
      ) : (
        <form
          className="w-full mt-5 bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto"
          onSubmit={handelAddLink}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Create a New Link
          </h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Link Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter link name"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Link
          </button>
        </form>
      )}

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
                  <span className="px-4 py-2 bg-gray-200 border-t border-b border-r border-gray-300 text-gray-500">
                    {links[0].name + "."}
                  </span>
                  <span className="px-4 py-2 bg-gray-200 border-t border-b border-r border-gray-300 text-gray-500 rounded-r-lg">
                    {rootDomain}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Connection Details
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    name="protocol"
                    value={newConnection.protocol}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="" hidden>
                      Protocol
                    </option>
                    <option value="http">HTTP</option>
                    <option value="https">HTTPS</option>
                    <option value="ftp">FTP</option>
                  </select>
                  <input
                    type="text"
                    name="ip"
                    value={newConnection.ip}
                    onChange={handleChange}
                    placeholder="localhost"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="port"
                    value={newConnection.port}
                    onChange={handleChange}
                    placeholder="8080"
                    className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
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
    </section>
  );
}
