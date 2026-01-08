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
  onMouseEnter: () => void;
}

const AccordionItem = ({ item, isActive, onMouseEnter }: AccordionItemProps) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className={`
        relative overflow-hidden cursor-pointer
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isActive ? 'flex-[4]' : 'flex-1'}
        min-w-[60px] h-[450px] rounded-2xl
      `}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { 
          e.currentTarget.onerror = null; 
          e.currentTarget.src = 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error'; 
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Caption Text */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 p-6
          transition-all duration-500 ease-out
          ${isActive ? 'opacity-100 translate-y-0' : 'opacity-70'}
        `}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <item.icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-poppins font-bold text-xl text-white">
            {item.title}
          </h3>
        </div>
        
        <div className={`
          transition-all duration-500 overflow-hidden
          ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <p className="font-montserrat text-white/80 text-sm mb-4 leading-relaxed">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.features.map((feature) => (
              <span
                key={feature}
                className="font-montserrat text-xs px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white/90"
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

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex gap-2 w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isActive={activeIndex === index}
          onMouseEnter={() => handleItemHover(index)}
        />
      ))}
    </div>
  );
}
