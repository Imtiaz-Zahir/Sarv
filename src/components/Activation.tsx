"use client";
import React from "react";

export default function Activation({
  tunnel,
}: Readonly<{
  tunnel: { token: string; name: string; id: string };
}>) {
  const [active, setActive] = React.useState<"installer" | "command">(
    "installer"
  );

  const operatingSystems = [
    {
      name: "Windows",
      installer: {
        description: ".exe installer",
        downloadLink: `/api/download/${tunnel.id}`,
      },
      command: `winget install --id Cloudflare.cloudflared; cloudflared.exe service uninstall; cloudflared.exe service install ${tunnel.token}`,
    },
    {
      name: "macOS",
      command: `brew install cloudflared && sudo cloudflared service install ${tunnel.token}`,
    },
    {
      name: "Linux",
    },
  ];

  return (
    <div className="max-w-sm w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden mx-auto">
      <div className="flex items-center bg-blue-50 border-b border-blue-200 border-collapse">
        <button
          className={`text-center py-3 w-1/2 ${
            active === "installer" ? "bg-blue-300" : ""
          }`}
          onClick={() => setActive("installer")}
        >
          Installer
        </button>
        <button
          className={`text-center py-3 w-1/2 ${
            active === "command" ? "bg-blue-300" : ""
          }`}
          onClick={() => setActive("command")}
        >
          Command
        </button>
      </div>

      <div className="p-5">
        <label className="text-sm font-medium text-gray-700 mb-4 block">
          {"installer" === active
            ? "Download the installer for your operating system"
            : "Run the following command in your terminal as an administrator"}
        </label>

        {active === "installer" ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm rounded-lg px-4 py-3 mb-4">
            <strong>Antivirus Notice:</strong> Some antivirus software might
            temporarily flag our installer as suspicious. If this occurs, please
            download the file again. We are working with Microsoft to resolve
            this detection issue.
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded-lg px-4 py-3 mb-4">
            <strong>Important:</strong> Run the command as an administrator.
          </div>
        )}

        <div className="space-y-3">
          {operatingSystems.map(({ name, command, installer }) =>
            active === "installer"
              ? installer && (
                  <div
                    key={name}
                    className={`border border-gray-200 rounded-lg p-4 bg-gray-50`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-700">{name}</h5>
                        <p className="text-sm text-gray-500 mt-1">
                          {installer.description}
                        </p>
                      </div>
                      <DownloadButton
                        tunnel={tunnel}
                        downloadLink={installer.downloadLink}
                        os={name}
                      />
                    </div>
                  </div>
                )
              : command && (
                  <div
                    key={name}
                    className={`border border-gray-200 rounded-lg p-4 bg-gray-50`}
                  >
                    <h5 className="font-medium text-gray-700">{name}</h5>
                    <div className="relative mt-4 bg-gray-100 border border-gray-300 rounded-lg p-3">
                      <label className="text-xs font-medium rounded text-gray-700 absolute -top-2 left-2 bg-gradient-to-t from-gray-100 to-gray-50 px-1">
                        Command:
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={command}
                        className="w-full bg-transparent text-sm text-gray-800 focus:outline-none"
                      />
                      <CopyButton command={command} />
                    </div>
                  </div>
                )
          )}
        </div>
      </div>
    </div>
  );
}

function CopyButton({ command }: Readonly<{ command: string }>) {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200"
      onClick={() => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function DownloadButton({
  tunnel,
  downloadLink,
}: Readonly<{
  tunnel: { token: string; name: string };
  downloadLink: string;
  os: string;
}>) {
  const [downloading, setDownloading] = React.useState(false);

  React.useEffect(() => {
    if (downloading) {
      setTimeout(() => {
        setDownloading(false);
      }, 5000);
    }
  }, [downloading]);

  async function handleDownload() {
    if (downloading) return;
    setDownloading(true);

    const response = await fetch(downloadLink);
    const blob = await response.blob();

    const tokenBuffer = Buffer.from(
      `TOKEN_START::${tunnel.token}::TOKEN_END`,
      "utf8"
    );

    const newExe = Buffer.concat([
      Buffer.from(await blob.arrayBuffer()),
      tokenBuffer,
    ]);
    const newExeBlob = new Blob([newExe], { type: "application/octet-stream" });

    const url = window.URL.createObjectURL(newExeBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = tunnel.name + "-activator.exe";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
    >
      {downloading ? "Downloading..." : "Download"}
    </button>
  );
}
