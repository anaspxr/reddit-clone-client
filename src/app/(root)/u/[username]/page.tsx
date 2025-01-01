import UserPosts from "@/components/user-profile/user-posts";

export default async function page() {
  return (
    <div className="flex flex-col gap-4 my-4">
      <h1 className="text-2xl sm:text-3xl font-semibold">Posts</h1>
      <UserPosts />
    </div>
  );
}
