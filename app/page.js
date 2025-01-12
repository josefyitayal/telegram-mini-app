"use client";

import { Suspense, useEffect, useState } from 'react';
import { useLaunchParams } from "@telegram-apps/sdk-react";
import Image from "next/image";
import dynamic from 'next/dynamic';

const MainTableClient = dynamic(() => Promise.resolve(TaskBoard), {
  ssr: false
});

function MainTable() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const launchParams = useLaunchParams();

  useEffect(() => {
    const initializeComponent = async () => {
      try {
        if (launchParams?.startParam) {
          setUser(launchParams.startParam)
        } else {
          console.log("No start_param available");
          setError("No group ID provided");
        }
      } catch (error) {
        console.error("Error in initializeComponent:", error);
        setError("An error occurred while initializing the component");
      } finally {
        setIsLoading(false);
      }
    };

    initializeComponent();
  }, [launchParams]);

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="p-8">Please provide a valid group ID</div>;
  }

  return (
    <div>
      <input type="text" value={user.first_name} />
      <input type="text" value={user.username} />
    </div>
  )
}

export default function Home() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <h1 className="text-3xl font-bold text-center">Yosef Prime VX</h1>
      <Suspense fallback={<div className="p-8">Loading...</div>}>
        <MainTableClient />
      </Suspense>
    </div>
  );
}
