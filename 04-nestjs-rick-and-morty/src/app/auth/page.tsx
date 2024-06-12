// src/app/auth/page.tsx
"use client";
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { redirect } from "next/navigation";
import OAuthButton from '../components/OAuthButton';

export default function Signup() {
  const { data: session, status } = useSession();
  const router = useRouter(); 

  if (session) {
    redirect('/home');
  }

  const REDIRECT_URL_AFTER_SIGN_IN = '/home';

  // Function to handle signing in with GitHub using a popup
  const handleSignInGithub = async (providerId: string) => {
    const result = await signIn(providerId, {
      callbackUrl: '/home',
      redirect: false,
      windowFeatures: "width=800,height=600"
    });

    if (result?.url) {
      window.open(result.url, 'GitHubLogin', 'width=800,height=600');
    }

    if (result?.error) {
      console.error("Authentication failed:", result.error);
    }
  };

  return (
    <main className="bg-pink-900">
      <div className="h-screen flex justify-center flex-wrap content-center">
        <button
          className="flex justify-center items-center h-18 w-64 rounded-full border-4 border-pink-600 bg-pink-50 text-pink-600 py-3 px-4 text-lg transition ease-in-out hover:bg-[#ffdaeccc]"
          onClick={() => handleSignInGithub('github')}
        >
          <span className="grow">Sign in with <span className="italic">GitHub</span></span>
        </button>
      </div>
    </main>
  );
}

/*
    <main className="bg-pink-900">
      <div className="h-screen flex justify-center flex-wrap content-center">
        <button
          className="flex justify-center items-center h-18 w-64 rounded-full border-4 border-pink-600 bg-pink-50 text-pink-600 py-3 px-4 text-lg transition ease-in-out hover:bg-[#ffdaeccc]"
          onClick={() => handleSignInGithub('github')}
        >
          <span className="grow">Sign in with <span className="italic">GitHub</span></span>
        </button>
      </div>
    </main>

    <main className="bg-pink-900">
      <div className="h-screen flex justify-center flex-wrap content-center">
        <OAuthButton
          provider="github"
          callbackUrl={REDIRECT_URL_AFTER_SIGN_IN}
          company="GitHub"          
        >
        </OAuthButton>
      </div>
    </main>
*/