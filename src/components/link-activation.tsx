"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Download,
  Terminal,
  ComputerIcon as Windows,
  Apple,
  LaptopIcon as Linux,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ActivationProps {
  tunnel: {
    token: string;
    name: string;
    id: string;
  };
}

export default function LinkActivation({ tunnel }: ActivationProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const operatingSystems = [
    {
      name: "macOS",
      icon: <Apple className="h-5 w-5" />,
      command: `brew install cloudflared && sudo cloudflared service install ${tunnel.token}`,
    },
    {
      name: "Windows",
      icon: <Windows className="h-5 w-5" />,
      installer: {
        description: ".exe installer",
        downloadLink: `/api/download/${tunnel.id}`,
      },
      command: `winget install --id Cloudflare.cloudflared; cloudflared.exe service uninstall; cloudflared.exe service install ${tunnel.token}`,
    },
    {
      name: "Linux",
      icon: <Linux className="h-5 w-5" />,
      command: `sudo apt-get update && sudo apt-get install cloudflared && sudo cloudflared service install ${tunnel.token}`,
    },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = async (downloadLink: string) => {
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
  };

  return (
    <Card className="border-gray-800 bg-gray-900/50 shadow-lg backdrop-blur sticky top-20">
      <CardHeader>
        <CardTitle className="text-white">Activate Your Link</CardTitle>
        <CardDescription className="text-gray-400">
          Install our agent to connect your local server
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="command" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 bg-gray-800 border border-gray-700">
            <TabsTrigger
              value="installer"
              className="data-[state=active]:bg-gray-700 cursor-pointer"
            >
              <Download className="h-4 w-4 mr-2" />
              Installer
            </TabsTrigger>
            <TabsTrigger
              value="command"
              className="data-[state=active]:bg-gray-700 cursor-pointer"
            >
              <Terminal className="h-4 w-4 mr-2" />
              Command
            </TabsTrigger>
          </TabsList>

          <TabsContent value="installer">
            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                Download the installer for your operating system
              </p>

              {/* <Alert
                variant="default"
                className="bg-amber-950/30 border-amber-800 text-amber-300"
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Antivirus Notice</AlertTitle>
                <AlertDescription className="text-amber-300/80">
                  Some antivirus software might temporarily flag our installer
                  as suspicious. If this occurs, please download the file again.
                </AlertDescription>
              </Alert> */}

              {operatingSystems.map(
                (os) =>
                  os.installer && (
                    <div
                      key={os.name}
                      className="border border-gray-800 rounded-lg p-4 bg-gray-800/50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {os.icon}
                          <div>
                            <h5 className="font-medium text-white">
                              {os.name}
                            </h5>
                            <p className="text-sm text-gray-400">
                              {os.installer.description}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() =>
                            handleDownload(os.installer.downloadLink)
                          }
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 cursor-pointer"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )
              )}
            </div>
          </TabsContent>

          <TabsContent value="command">
            <div className="space-y-4">
              <Alert
                variant="default"
                className="bg-blue-950/30 border-blue-800 text-blue-300"
              >
                <Terminal className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription className="text-blue-300/80">
                  Run the command as an administrator or with sudo privileges.
                </AlertDescription>
              </Alert>

              {operatingSystems.map(
                (os) =>
                  os.command && (
                    <div
                      key={os.name}
                      className="border border-gray-800 rounded-lg p-4 bg-gray-800/50"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {os.icon}
                        <h5 className="font-medium text-white">{os.name}</h5>
                      </div>
                      <div className="relative mt-2 bg-gray-900 border border-gray-700 rounded-lg py-3 pl-3 pr-1">
                        <span className="text-xs font-medium rounded text-gray-400 absolute -top-2 left-2 bg-gray-900 px-1">
                          Command:
                        </span>
                        <p className="py-1 overflow-x-auto text-sm text-gray-300 font-mono whitespace-pre-wrap break-all h-10 overflow-y-auto ">
                          {os.command}
                        </p>
                        <span
                          className={`text-xs font-medium rounded text-gray-400 absolute -bottom-2 right-2 bg-gray-900 px-1 flex items-center gap-1 ${
                            copied !== os.name ? "cursor-pointer" : ""
                          }`}
                          onClick={() => handleCopy(os.command, os.name)}
                        >
                          {copied === os.name ? (
                            "Copied!"
                          ) : (
                            <>
                              <Copy className="h-2 w-2" />
                              Copy
                            </>
                          )}
                        </span>
                        {/* <Button
                          size="sm"
                          variant="ghost"
                          className="absolute right-2 top-1/2 transform translate-y-1/2 text-gray-400 hover:text-white hover:bg-gray-700 cursor-pointer"
                          onClick={() => handleCopy(os.command, os.name)}
                        >
                          {copied === os.name ? (
                            "Copied!"
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5 mr-1" />
                              Copy
                            </>
                          )}
                        </Button> */}
                      </div>
                    </div>
                  )
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
