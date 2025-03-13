import { useEffect, useState } from "react";

const YouTubeAuth = () => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYouTubeToken = async () => {
      try {
        const res = await fetch("/api/youtube-callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: "your-auth-code" }), // Pass the authorization code received from YouTube
        });

        const data = await res.json();
        if (res.ok) {
          setToken(data.access_token); // The access token received from YouTube
        } else {
          setError(data.error || "Error fetching YouTube token");
        }
      } catch (error) {
        console.error("Error fetching YouTube token:", error);
        setError("Internal Error");
      }
    };

    fetchYouTubeToken();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {token ? (
        <p>Token: {token}</p> // Display YouTube access token or perform additional actions
      ) : (
        <p>{error ? "Loading failed" : "Loading..."}</p>
      )}
    </div>
  );
};

export default YouTubeAuth;
