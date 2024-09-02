import PostEditor from "@/components/posts/editor/PostEditor";
import Post from "@/components/posts/Post";
import prisma from "@/lib/prisma";
import TrendSideBar from "./TrendSideBar";
import ForYouFeed from "./ForYouFeed";
import FollowingFeed from "./FollowingFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Home() {
    return (
      <main className="flex w-full min-w-0 gap-5">
        <div className="w-full min-w-0 space-y-5">
          <PostEditor />
          <Tabs defaultValue="for-you">
            <TabsList>
              <TabsTrigger value="for-you">For you</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="for-you">
              <ForYouFeed />
            </TabsContent>
            <TabsContent value="following">
              <FollowingFeed />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    );
  }