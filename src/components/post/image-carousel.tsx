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
      {images.length > 1 && (
        <div onClick={(e) => e.preventDefault()}>
          {current !== 1 && <CarouselPrevious className="hidden sm:flex " />}
          {current !== images.length && (
            <CarouselNext className="hidden sm:flex" />
          )}
        </div>
      )}
      <div className="absolute bottom-2 flex w-full justify-center">
        <p className="py-1 px-2  text-xs bg-black bg-opacity-50 text-center rounded-full text-white ">
          {current} / {count}
        </p>
      </div>
    </Carousel>
  );
}
