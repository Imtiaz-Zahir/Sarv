"use client";
import React from "react";
import DownloadButton from "./DownloadButton";
import CopyButton from "./CopyButton";

export default function Activation({
  tunnel,
}: {
  tunnel: { token: string; name: string };
}) {
  const [exe, setExe] = React.useState(false);

  const installationCommand = `winget install --id Cloudflare.cloudflared; cloudflared.exe service install ${tunnel.token}`;

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
      {exe ? (
        <div className="max-w-sm w-full border border-gray-300 shadow-lg rounded-lg p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Download Activator
            </h3>
            <button
              onClick={() => setExe(false)}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Back to Command
            </button>
          </div>

          {/* Antivirus Warning */}
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm rounded-lg px-4 py-3 mb-4">
            <strong>Antivirus Notice:</strong> Some antivirus software might
            temporarily flag our installer as suspicious. If this occurs, please
            download the file again. We are working with Microsoft to resolve
            this detection issue.
          </div>

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
        </div>
      ) : (
        <div className="max-w-sm w-full border border-gray-300 shadow-lg rounded-lg p-6 bg-white">
          {/* Instruction Steps */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-700">
                Setup Instructions
              </h3>
              <button
                onClick={() => setExe(true)}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Download EXE
              </button>
            </div>

            {/* Command Option Notice */}
            <div className="bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded-lg px-4 py-3 mb-4">
              <strong>Tip:</strong> We offer both command-line and installer options. 
              Use the EXE installer for a more user-friendly setup.
            </div>
            <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2 pl-4">
              <li>
                Open <strong>PowerShell</strong> in administrator mode. You can
                do this by searching &quot;PowerShell&quot; in the Start Menu,
                right-clicking it, and selecting{" "}
                <strong>Run as Administrator</strong>.
              </li>
              <li>
                Copy the command below by clicking the{" "}
                <strong>Copy Command</strong> button.
              </li>
              <li>
                Paste the command into PowerShell and press{" "}
                <strong>Enter</strong>.
              </li>
            </ol>
          </div>

          {/* Command Section */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700">
              Command:
            </label>
            <div className="relative mt-2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3">
              <input
                type="text"
                readOnly
                value={installationCommand}
                className="w-full bg-transparent text-sm text-gray-800 focus:outline-none"
              />
              <CopyButton command={installationCommand} />
            </div>
          </div>

          {/* Final Note */}
          <div className="bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded-lg px-4 py-3">
            <strong>Important:</strong> Ensure that PowerShell is run as an
            administrator to avoid any permission-related issues during the
            setup.
          </div>
        </div>
      )}
    </div>
  );
}