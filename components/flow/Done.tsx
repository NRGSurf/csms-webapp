import React from "react";

export default function Done() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="nrg-card p-6 md:p-8 text-center">
        <div className="mx-auto h-12 w-12 rounded-full nrg-skeleton" />
        <h2 className="nrg-h1 mt-4">You’re all set</h2>
        <p className="nrg-subtle mt-2">
          Charging will begin shortly. You’ll receive a receipt by email after
          the session.
        </p>
        <div className="mt-6">
          <a href="/" className="nrg-btn nrg-btn-primary">
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
