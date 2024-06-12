<<<<<<< Updated upstream
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/auth");
  } else {
    redirect("/home");
=======
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"


export default async function Home() {
  const session = await getServerSession()

  if (!session || !session.user) {
    redirect("/auth")
  } else {
    redirect("/home")
>>>>>>> Stashed changes
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
<<<<<<< Updated upstream
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        
      </div>
    </main>
  );
}
=======
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"></div>
    </main>
  )
}


>>>>>>> Stashed changes
