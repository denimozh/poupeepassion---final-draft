import PostEditor from "@/components/posts/editor/PostEditor";
import Post from "@/components/posts/Post";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";
import TrendSideBar from "./TrendSideBar";
import ForYouFeed from "./ForYouFeed";

export default async function Home() {
    
    return (
      <main className="w-full min-w-0 flex gap-5">
        <div className="w-full min-w-0 space-y-5">
            <PostEditor/>
            <ForYouFeed />
        </div>
        <TrendSideBar/>
      </main>
    );
  }