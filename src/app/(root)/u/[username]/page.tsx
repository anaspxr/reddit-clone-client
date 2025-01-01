import Link from "next/link";

export default function page({ params }: { params: { username: string } }) {
  return (
    <div className="flex flex-col gap-4 my-4">
      <Link href={`/u/${params.username}/posts`} className="hover:underline">
        <p>Posts: 12</p>
      </Link>
      <Link href={`/u/${params.username}/posts`} className="hover:underline">
        <p>Comments : 15</p>
      </Link>
      <p>Followers</p>
      <p>Karma: 56</p>
    </div>
  );
}
