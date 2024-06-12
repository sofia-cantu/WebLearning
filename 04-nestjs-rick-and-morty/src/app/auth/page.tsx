<<<<<<< Updated upstream
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
=======
//app/auth//page.tsx
"use client"
import { auth } from "./auth"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { SessionProvider, signIn, useSession } from "next-auth/react"
import { useState } from "react"
import { redirect } from "next/navigation"


export default async function Signup() {
  //const { data: session } = useSession()
  //const router = useRouter()
  const session = await auth()

  if (session) {
    redirect("/home")
  }

  const handleSignInGithub = async (providerId: string) => {
    const result = await signIn(providerId, {
      callbackUrl: "/home",
      redirect: false,
      windowFeatures: "width=800,height=600",
    })

    if (result?.url) {
      window.open(result.url, "GitHubLogin", "width=800,height=600")
    }

    if (result?.error) {
      console.error("Authentication failed:", result.error)
    }
  }


  return (
    <SessionProvider basePath={"/auth"} session={session}>
    <main className="bg-backgroundLight dark:bg-backgroundDark">
      <div className="mx-auto flex h-screen max-w-6xl flex-wrap content-center justify-center px-6 text-gray-600">
        <section className="absolute top-10 mb-10 flex w-full flex-col items-center justify-center">
            <Image
                className="dark:invert"
                src="/rick.png"
                alt="Rick Logo"
                width={60}
                height={60}
                priority
            />
        </section>
        <div className=" flex flex-col items-center">
          <div className="space-y-15 flex flex-col items-center justify-center rounded-[25px] bg-white p-8">
           
            <hr className="mt-10 w-64 overflow-visible border-black text-center before:relative before:-top-3.5 before:bg-white before:px-2 before:text-black before:content-['or']"></hr>
            <div className="mt-10 flex flex-col items-center justify-center space-y-4">
              <button
                className="flex h-12 w-64 items-center justify-center rounded-lg border-2 border-[#0000001a] bg-[#24292f] px-4 py-3 text-lg text-white transition ease-in-out hover:bg-[#24292fcc]"
                onClick={() => handleSignInGithub("github")}
              >
                <Image
                  loading="lazy"
                  height="24"
                  width="24"
                  id="provider-logo-dark"
                  src="https://authjs.dev/img/providers/github.svg"
                  alt="Github Logo"
                ></Image>
                <span className="grow">Sign in with GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </main>
    </SessionProvider>
  )
}
>>>>>>> Stashed changes
