// components/OAuthButton.tsx

import { signIn } from 'next-auth/react';
import { MouseEvent } from 'react';

interface OAuthButtonProps {
  provider: string;
  callbackUrl: string;
  company: string;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({ provider, callbackUrl, company }) => {
  const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn(provider, { callbackUrl });
  };

  return (
    <button 
      onClick={handleLogin}
      className="flex justify-center items-center h-18 w-64 rounded-full border-4 border-pink-600 bg-pink-50 text-pink-600 py-3 px-4 text-lg transition ease-in-out hover:bg-[#ffdaeccc]"
    >
      <span className="grow">Sign in with <span className="italic">{company}</span></span>
    </button>
  );
};

export default OAuthButton;
