import React from "react";
import DownloadButton from "./DownloadButton";

export default function Activation({
  tunnel,
}: {
  tunnel: { token: string; name: string };
}) {
  const operatingSystems = [
    {
      name: "Windows 10/11",
      description: ".exe (64-bit)",
      downloadLink: "/link-activator.exe",
    },
    {
      name: "macOS",
      description: "Coming soon",
      downloadLink: "",
    },
    {
      name: "Linux",
      description: "Coming soon",
      downloadLink: "",
    },
  ];

  return (
    <div>
      <div className="max-w-sm w-full border border-gray-300 shadow-lg rounded-lg p-6 bg-white">
        <h3 className="text-lg font-semibold text-gray-700 mb-6">
          Download Activator
        </h3>

        {/* OS Selection */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-4 block">
            Select your operating system:
          </label>

          <div className="space-y-3">
            {operatingSystems.map(
              ({ description, downloadLink, name }, index) => (
                <div
                  key={index}
                  className={`border border-gray-200 rounded-lg p-4 ${
                    downloadLink ? "bg-gray-50" : "opacity-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-700">{name}</div>
                      <p className="text-sm text-gray-500 mt-1">
                        {description}
                      </p>
                    </div>
                    <DownloadButton
                      tunnel={tunnel}
                      downloadLink={downloadLink}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Installation Instructions */}
        {/* <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Installation Instructions:
          </h4>
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2 pl-4">
            <li>Download the Windows installer using the button above</li>
            <li>Run the downloaded .exe file</li>
            <li>Follow the installation wizard instructions</li>
            <li>Complete the activation process in the application</li>
          </ol>
        </div> */}

        {/* Final Note */}
        <div className="bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded-lg px-4 py-3">
          <strong>Important:</strong> Make sure to run the installer with
          administrator privileges for proper service installation.
        </div>
      </div>
    </div>
  );
}
