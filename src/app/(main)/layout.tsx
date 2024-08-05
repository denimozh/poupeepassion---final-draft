import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import MenuBar from "./MenuBar";
import Navbar from "./Navbar";
import SessionProvider from "./SessionProvider";
import ContactBar from "./ContactBar";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
            <div className="sticky flex flex-col gap-5">
                <MenuBar className="top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 lg:w-80" />
                <ContactBar className="top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm lg:block lg:px-5 lg:w-80" />
            </div>
            {children}
        </div>
        <MenuBar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden" />
      </div>
    </SessionProvider>
  );
}