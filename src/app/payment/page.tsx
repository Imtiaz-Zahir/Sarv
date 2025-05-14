import React, { Suspense } from "react";
import RecoveryPage from "./recovery";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecoveryPage />
    </Suspense>
  );
}
