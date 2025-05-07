import { getLinkById } from "@/services/link";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";
import LinkActivation from "@/components/link-activation";
import ConnectionTable from "@/components/connection-table";
import AddConnection from "@/components/add-connection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinkIcon } from "lucide-react";
import PaymentComponent from "@/components/PaymentComponent";

export default async function LinkManagementPage({
  params,
}: {
  params: Promise<{ linkId: string }>;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    return signOut({ redirectTo: "/" });
  }

  const { linkId } = await params;

  const link = await getLinkById(linkId);
  if (!link) return <div>Not Found</div>;

  if (link.userEmail !== session.user.email) {
    return <div>Unauthorized</div>;
  }

  if (
    !link.subscriptionStatus ||
    !link.subscriptionEndAt ||
    link.subscriptionEndAt < new Date()
  ) {
    return (
      <PaymentComponent
        linkId={link.id}
        linkName={link.name}
        userEmail={link.userEmail}
      />
    );
  }

  return (
    <main className="flex-1 py-8">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Page Header */}
          <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-2">
                  <LinkIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{link.name}</h1>
                  <p className="text-gray-400">
                    Manage your link and connections
                  </p>
                </div>
              </div>
              <AddConnection link={{ id: link.id, name: link.name }} />
            </div>

            {/* Connection Table */}
            <Card className="border-gray-800 bg-gray-900/50 shadow-lg backdrop-blur mb-8">
              <CardHeader>
                <CardTitle className="text-white">Connections</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage the connections for this link
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ConnectionTable link={link} />
              </CardContent>
            </Card>
          </div>

          {/* Activation Panel */}
          <div className="w-full md:w-96 md:flex-shrink-0">
            <LinkActivation
              tunnel={{
                token: link.tunnelToken,
                name: link.name,
                id: link.id,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
