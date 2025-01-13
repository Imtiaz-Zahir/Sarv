"use client";
import { useState } from "react";
import { createLinkAction } from "@/actions/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
if (!rootDomain) {
  throw new Error("Root domain is not defined");
}

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handelAddLink(e: React.FormEvent) {
    try {
      e.preventDefault();
      if (loading) return;

      setLoading(true);

      if (!name) alert("Please enter a name for the link");

      const response = await createLinkAction(name);

      if (!response.success) {
        alert(response.message);
        setLoading(false);
        return;
      }

      if (response.link) {
        setLoading(false);
        setName("");
        router.push("/dashboard/links/" + response.link.id);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Something went wrong. Please try again later.");
    }
  }

  return (
    <form
      className="w-full mt-5 bg-white drop-shadow-lg rounded-lg p-6 max-w-md mx-auto"
      onSubmit={handelAddLink}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Create a New Link
      </h2>

      <div>
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
          onChange={(e) => {
              if (e.target.value !== "" && !/^[a-zA-Z0-9-]+$/.test(e.target.value)) return;
            
            setName(e.target.value);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          placeholder="Enter link name"
        />
      </div>
      <strong className="text-xs text-gray-500 mt-2">Your URL will Be :</strong>
      <p className="text-xs text-gray-500">
        {"<Connection Name>-" +
          `${name ? name : "<Link Name>"}` +
          "." +
          rootDomain}
      </p>

      <Button type="submit" loading={loading} className="w-full mt-4">
        Create Link
      </Button>
    </form>
  );
}
