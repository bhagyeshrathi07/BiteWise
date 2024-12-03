import React, { useEffect } from "react";

const GoogleSignIn = ({ onGoogleSignInSuccess }) => {
  useEffect(() => {
    const handleCredentialResponse = (response) => {
      if (response.credential) {
        console.log("Credential Response:", response);
        onGoogleSignInSuccess(response);
      } else {
        console.error("Error occurred while signing in with Google");
        // Implement retry logic here
        setTimeout(() => {
          window.location.reload(); // Reload the page to retry sign-in
        }, 5000); // Retry after 5 seconds
      }
    };

    const googleScript = document.createElement("script");
    googleScript.src = "https://accounts.google.com/gsi/client";
    googleScript.async = true;
    googleScript.onload = () => {
      window.google.accounts.id.initialize({
        client_id: "243203716267-8vs54hok705sqmmej3456v41cns8rl3n.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        prompt_parent_id: "g_id_onload"
      });
    };

    document.body.appendChild(googleScript);

    return () => {
      document.body.removeChild(googleScript);
    };
  }, [onGoogleSignInSuccess]);

  return (
    <div className="google-signup">
      <div id="g_id_onload" data-client_id="243203716267-8vs54hok705sqmmej3456v41cns8rl3n.apps.googleusercontent.com"></div>
      <div className="g_id_signin" data-type="standard" data-size="large" data-theme="filled_blue" data-text="signin_with" data-shape="pill"></div>
    </div>
  );
};

export default GoogleSignIn;
