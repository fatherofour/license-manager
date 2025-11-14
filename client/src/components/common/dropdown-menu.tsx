import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/common/button';

interface DropdownMenuProps {
  /**
   * The trigger element that will open the dropdown
   */
  trigger: React.ReactNode;
  /**
   * The content to display in the dropdown
   */
  children: React.ReactNode;
  /**
   * Optional class name for the dropdown container
   */
  className?: string;
  /**
   * Optional alignment of the dropdown menu
   * @default 'left'
   */
  align?: 'left' | 'right' | 'center';
  /**
   * Optional width of the dropdown menu
   * @default 'w-48'
   */
  width?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  children,
  className = '',
  align = 'left',
  width = 'w-48',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const alignmentClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2',
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer flex items-center">
        {trigger}
        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </div>

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 ${width} rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${alignmentClasses[align]}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {React.Children.map(children, (child) => (
              <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                {child}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface DropdownItemProps {
  /**
   * The content of the dropdown item
   */
  children: React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Optional class name for the dropdown item
   */
  className?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer ${className}`}
      onClick={onClick}
      role="menuitem"
    >
      {children}
    </div>
  );
};

// Example usage:
/*
<DropdownMenu 
  trigger={
    <Button variant="outline" className="flex items-center gap-2">
      Options
      <ChevronDown className="h-4 w-4" />
    </Button>
  }
>
  <DropdownItem onClick={() => console.log('Edit')}>
    Edit
  </DropdownItem>
  <DropdownItem onClick={() => console.log('Delete')} className="text-red-600 hover:bg-red-50">
    Delete
  </DropdownItem>
</DropdownMenu>
*/

export default DropdownMenu;
