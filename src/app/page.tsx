import React from "react";

export default async function page() {
  return (
    <>
      <section className="relative bg-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-30"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">Host Your Website Locally</h1>
          <p className="text-xl mb-6">
            Powerful, seamless hosting solutions directly from your local
            machine or network, with unlimited domain capabilities.
          </p>
          <a
            href="#features"
            className="bg-yellow-400 text-black py-2 px-6 rounded-lg text-xl font-semibold hover:bg-yellow-300 transition duration-300"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Unlimited Domains</h3>
              <p className="text-gray-700">
                Host as many domains as you need without limitations. The sky's
                the limit for your online presence.
              </p>
            </div>
            <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Fast Setup</h3>
              <p className="text-gray-700">
                Get up and running in no time with a quick and easy setup
                process that works right from your local machine.
              </p>
            </div>
            <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Secure & Private</h3>
              <p className="text-gray-700">
                Host your site in a secure local environment, ensuring complete
                control over your data and privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-blue-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                Step 1: Install Our Software
              </h3>
              <p className="text-gray-700">
                Download and install our lightweight hosting software on your
                machine or network.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                Step 2: Configure Your Domain
              </h3>
              <p className="text-gray-700">
                Easily configure your domain and point it to your local server.
                You can add as many as you like.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                Step 3: Launch & Enjoy
              </h3>
              <p className="text-gray-700">
                Once set up, you’re ready to host your site locally and enjoy
                fast, private hosting with unlimited possibilities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
