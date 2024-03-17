import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/hooks/ContextWrapper";

const Home = () => {
  const { login, isAuthenticated } = useAuth();

  return (
    <div className="h-screen flex flex-col justify-center items-center px-4 sm:px-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to Tracy</h1>
        <p className="text-lg mb-8">Unlock the secrets behind your products</p>
        <Link
          to="/consumer"
          className="bg-green-500 px-6 py-3 rounded-full hover:bg-green-600 transition duration-300 inline-block"
        >
          Search Records
        </Link>
      </div>

      {/* On-chain Storage Section */}
      <div className="text-center">
        <h2 className="text-3xl mb-4">Secure Data Storage</h2>
        <p className="text-lg mb-4">
          Tracy employs the Internet Computer's secure blockchain to store your
          data.
        </p>
        <p className="text-lg mb-4">
          Your product information resides within Tracy's canister on the
          Internet Computer network.
        </p>
        <p className="text-lg mb-8">
          Explore Tracy's canister to witness the power of decentralized
          storage.
        </p>
        <a
          href="https://dashboard.internetcomputer.org/canister/qmkae-yyaaa-aaaap-abmrq-cai"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600 transition duration-300 inline-block"
        >
          View Tracy's Canister
        </a>
      </div>
    </div>
  );
};

export default Home;
