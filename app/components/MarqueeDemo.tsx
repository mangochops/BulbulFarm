import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";

const reviews = [
  { name: "Jack", username: "@jack", body: "Amazing!", img: "https://avatar.vercel.sh/jack" },
  { name: "Jill", username: "@jill", body: "Speechless!", img: "https://avatar.vercel.sh/jill" },
  // Add more reviews here...
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => (
  <figure className={cn("w-64 p-4 rounded-lg border dark:border-gray-50/10 dark:bg-gray-50/10")}>
    <div className="flex items-center gap-2">
      <Image src={img} alt="" height={32} width={32} className="rounded-full" />
      <div>
        <figcaption className="text-sm font-medium">{name}</figcaption>
        <p className="text-xs text-gray-500">{username}</p>
      </div>
    </div>
    <blockquote className="mt-2 text-sm">{body}</blockquote>
  </figure>
);

export function MarqueeDemo() {
  return (
    <div className="relative w-full h-80 overflow-hidden rounded-lg border">
      <Marquee pauseOnHover className="animate-marquee">
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
