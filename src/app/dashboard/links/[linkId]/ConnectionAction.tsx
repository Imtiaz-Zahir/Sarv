"use client";
import React from "react";
import EditConnection from "./EditConnection";

export default function ConnectionAction({
  connection,
  linkName,
}: {
  connection: {
    linkId: string;
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    serviceIp: string;
    servicePort: number;
    serviceProtocol:
      | "HTTP"
      | "HTTPS"
      | "UNIX"
      | "TCP"
      | "SSH"
      | "RDP"
      | "SMB"
      | "HTTP_STATUS"
      | "BASTION";
  };
  linkName: string;
}) {
    
  return (
    <td className="py-2 px-4 border-b flex gap-3">
      <EditConnection connection={connection} linkName={linkName} />
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="cursor-pointer w-5 h-5"
      >
        <path
          fill="#d11a2a"
          d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"
        ></path>
      </svg> */}
    </td>
  );
}
