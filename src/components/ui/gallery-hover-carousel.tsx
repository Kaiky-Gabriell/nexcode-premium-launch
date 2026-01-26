"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface GalleryHoverCarouselItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
  category?: string;
}

interface GalleryHoverCarouselProps {
  heading?: string;
  description?: string;
  items?: GalleryHoverCarouselItem[];
  showHeader?: boolean;
}

export default function GalleryHoverCarousel({
  heading = "Featured Projects",
  description = "Explore our collection of innovative solutions.",
  items = [],
  showHeader = false,
}: GalleryHoverCarouselProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    update();
    carouselApi.on("select", update);
    return () => {
      carouselApi.off("select", update);
    };
  }, [carouselApi]);

  const handleItemClick = (url: string) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="py-8">
      <div className="w-full">
        {showHeader && (
          <div className="mb-6 flex flex-col gap-4 px-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-poppins text-2xl font-bold tracking-tight text-foreground">
                {heading}
              </h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => carouselApi?.scrollPrev()}
                disabled={!canScrollPrev}
                className="h-9 w-9 rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => carouselApi?.scrollNext()}
                disabled={!canScrollNext}
                className="h-9 w-9 rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <div className="w-full">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: false,
            }}
          >
            <CarouselContent className="-ml-3 pl-4 pr-4">
              {items.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-3 basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[30%]"
                >
                  <Card
                    className="group cursor-pointer overflow-hidden border-0 bg-transparent shadow-none"
                    onClick={() => handleItemClick(item.url)}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      {/* Fade overlay at bottom */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                      
                      {/* Category badge */}
                      {item.category && (
                        <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                          {item.category}
                        </span>
                      )}

                      {/* Arrow indicator */}
                      {item.url && item.url !== "#" && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <ArrowRight className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Text Section */}
                    <div className="flex flex-col gap-1.5 py-4">
                      <h3 className="font-poppins text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-montserrat text-sm text-muted-foreground line-clamp-2">
                        {item.summary}
                      </p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Mobile Navigation Dots */}
        {!showHeader && items.length > 1 && (
          <div className="flex justify-center gap-2 mt-4 px-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="h-8 w-8 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="h-8 w-8 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export { type GalleryHoverCarouselItem };
