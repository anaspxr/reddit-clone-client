import UserPosts from "@/components/user-profile/user-posts";

export default async function page() {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-semibold my-2">Posts</h1>
      <UserPosts />
    </div>
  );
}
