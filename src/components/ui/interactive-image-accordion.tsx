import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface AccordionItemData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  icon: LucideIcon;
  features: string[];
}

interface AccordionItemProps {
  item: AccordionItemData;
  isActive: boolean;
  onInteraction: () => void;
  isMobile?: boolean;
}

const AccordionItem = ({ item, isActive, onInteraction, isMobile }: AccordionItemProps) => {
  return (
    <div
      onMouseEnter={!isMobile ? onInteraction : undefined}
      onClick={isMobile ? onInteraction : undefined}
      className={`
        relative overflow-hidden cursor-pointer
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        rounded-xl sm:rounded-2xl
        ${isMobile 
          ? isActive ? 'h-[320px]' : 'h-[72px]'
          : `${isActive ? 'flex-[4]' : 'flex-1'} min-w-[60px] h-[450px]`
        }
        ${isMobile ? 'w-full' : ''}
      `}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className={`
          absolute w-full h-full object-cover
          transition-all duration-500
          ${isMobile 
            ? isActive ? 'inset-0' : 'inset-0 opacity-50' 
            : 'inset-0'
          }
        `}
        loading="lazy"
        onError={(e) => { 
          e.currentTarget.onerror = null; 
          e.currentTarget.src = 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error'; 
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className={`
        absolute inset-0 transition-all duration-500
        ${isMobile && !isActive 
          ? 'bg-black/70' 
          : 'bg-gradient-to-t from-black/80 via-black/40 to-black/20'
        }
      `} />

      {/* Caption Text */}
      <div
        className={`
          absolute left-0 right-0 p-4 sm:p-6
          transition-all duration-500 ease-out
          ${isMobile 
            ? isActive ? 'bottom-0' : 'top-1/2 -translate-y-1/2'
            : 'bottom-0'
          }
          ${isActive ? 'opacity-100' : 'opacity-90'}
        `}
      >
        <div className={`
          flex items-center gap-3
          ${isActive ? 'mb-2 sm:mb-3' : 'mb-0'}
        `}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h3 className="font-poppins font-bold text-lg sm:text-xl text-white">
            {item.title}
          </h3>
        </div>
        
        <div className={`
          transition-all duration-500 overflow-hidden
          ${isActive ? 'max-h-48 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}
        `}>
          <p className="font-montserrat text-white/80 text-sm mb-3 sm:mb-4 leading-relaxed">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {item.features.map((feature) => (
              <span
                key={feature}
                className="font-montserrat text-xs px-2.5 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white/90"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface InteractiveImageAccordionProps {
  items: AccordionItemData[];
  defaultActiveIndex?: number;
}

export function InteractiveImageAccordion({ 
  items, 
  defaultActiveIndex = 0 
}: InteractiveImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  const handleItemInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      {/* Mobile: Vertical Accordion */}
      <div className="flex flex-col gap-2 w-full sm:hidden">
        {items.map((item, index) => (
          <AccordionItem
            key={item.id}
            item={item}
            isActive={activeIndex === index}
            onInteraction={() => handleItemInteraction(index)}
            isMobile={true}
          />
        ))}
      </div>

      {/* Tablet: Horizontal Accordion (smaller) */}
      <div className="hidden sm:flex lg:hidden gap-2 w-full">
        {items.map((item, index) => (
          <div
            key={item.id}
            onMouseEnter={() => handleItemInteraction(index)}
            onClick={() => handleItemInteraction(index)}
            className={`
              relative overflow-hidden cursor-pointer
              transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${activeIndex === index ? 'flex-[3]' : 'flex-1'}
              min-w-[50px] h-[350px] rounded-xl
            `}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            <div className={`
              absolute bottom-0 left-0 right-0 p-4
              transition-all duration-500 ease-out
              ${activeIndex === index ? 'opacity-100' : 'opacity-70'}
            `}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-poppins font-bold text-base text-white">
                  {item.title}
                </h3>
              </div>
              <div className={`
                transition-all duration-500 overflow-hidden
                ${activeIndex === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}
              `}>
                <p className="font-montserrat text-white/80 text-xs mb-2 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {item.features.slice(0, 2).map((feature) => (
                    <span
                      key={feature}
                      className="font-montserrat text-[10px] px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-white/90"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Full Horizontal Accordion */}
      <div className="hidden lg:flex gap-2 w-full">
        {items.map((item, index) => (
          <AccordionItem
            key={item.id}
            item={item}
            isActive={activeIndex === index}
            onInteraction={() => handleItemInteraction(index)}
            isMobile={false}
          />
        ))}
      </div>
    </>
  );
}
