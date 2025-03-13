"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SpotifyCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) {
        console.error("No authorization code found.");
        return;
      }

      try {
        // Send auth code to backend for token exchange
        const response = await fetch("/api/spotify-callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();
        if (data.access_token) {
          // Store access token in localStorage
          localStorage.setItem("spotify_access_token", data.access_token);
          router.push("/"); // Redirect to home
        } else {
          console.error("Failed to get access token", data);
        }
      } catch (error) {
        console.error("Error during Spotify callback:", error);
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen text-gray-800">
      <p>Processing Spotify authentication...</p>
    </div>
  );
}
