import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

export default function ImageCarousel({
  postId,
  images,
  className,
}: {
  postId: string;
  images: string[];
  className?: string;
}) {
  const router = useRouter();
  const [api, setApi] = React.useState<CarouselApi>();
  const [count, setCount] = React.useState(0);
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} className={`w-5/6  ${className}`}>
      <CarouselContent
        className="flex items-center w-full h-full"
        onClick={() => router.push(`/post/${postId}`)}>
        {images.map((image, i) => (
          <CarouselItem key={i} className="w-full h-full">
            <CldImage
              className="w-full h-full"
              alt=""
              width="1500"
              height="500"
              src={image}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div onClick={(e) => e.preventDefault()}>
        <CarouselPrevious className="hidden sm:flex " />
        <CarouselNext className="hidden sm:flex" />
      </div>
      <div className="absolute bottom-2 flex w-full justify-center">
        <p className="p-1 w-16 bg-black bg-opacity-50 text-center rounded-full text-white ">
          {current} / {count}
        </p>
      </div>
    </Carousel>
  );
}
