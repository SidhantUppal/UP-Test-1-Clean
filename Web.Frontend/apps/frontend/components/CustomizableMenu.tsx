"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu item interface
interface MenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href: string;
  category: string;
  isPinned?: boolean;
  order?: number;
}

// All available menu items
const allMenuItems: MenuItem[] = [
  // Core items
  { id: 'home', category: 'Core', icon: '🏠', label: 'Home', href: '/' },
  { id: 'tasks', category: 'Core', icon: '✓', label: 'Tasks', href: '/tasks' },
  { id: 'alerts', category: 'Core', icon: '🔔', label: 'Alerts', href: '/alerts' },

  // Incidents
  { id: 'incidents-home', category: 'Incidents', icon: '⚠️', label: 'Incidents', href: '/incidents' },
  { id: 'incidents-hazards', category: 'Incidents', icon: '⚡', label: 'Hazards', href: '/incidents/hazards' },
  { id: 'incidents-near-miss', category: 'Incidents', icon: '🎯', label: 'Near Miss', href: '/incidents/near-miss/form' },
  { id: 'incidents-riddor', category: 'Incidents', icon: '📊', label: 'RIDDOR', href: '/incidents/riddor' },

  // People
  { id: 'employees', category: 'People', icon: '👔', label: 'Employees', href: '/employees' },
];

export default function CustomizableMenu() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pinnedItems, setPinnedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Load pinned items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pinnedMenuItems');
    if (saved) {
      setPinnedItems(JSON.parse(saved));
    } else {
      // Default pinned items
      setPinnedItems(['home', 'tasks', 'alerts', 'incidents-home', 'employees']);
    }
  }, []);

  // Save pinned items to localStorage
  const savePinnedItems = (items: string[]) => {
    setPinnedItems(items);
    localStorage.setItem('pinnedMenuItems', JSON.stringify(items));
  };

  // Toggle pin status
  const togglePin = (itemId: string) => {
    if (pinnedItems.includes(itemId)) {
      savePinnedItems(pinnedItems.filter(id => id !== itemId));
    } else {
      if (pinnedItems.length < 8) { // Limit visible items
        savePinnedItems([...pinnedItems, itemId]);
      } else {
        alert('Maximum 8 items can be pinned. Unpin an item first.');
      }
    }
  };

  // Get pinned menu items
  const getPinnedMenuItems = () => {
    return pinnedItems
      .map(id => allMenuItems.find(item => item.id === id))
      .filter(Boolean) as MenuItem[];
  };

  // Filter items for modal
  const getFilteredItems = () => {
    let filtered = allMenuItems;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(allMenuItems.map(item => item.category)))];

  // Drag and drop handlers
  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const newPinnedItems = [...pinnedItems];
    const draggedIndex = newPinnedItems.indexOf(draggedItem);
    const targetIndex = newPinnedItems.indexOf(targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      newPinnedItems.splice(draggedIndex, 1);
      newPinnedItems.splice(targetIndex, 0, draggedItem);
      savePinnedItems(newPinnedItems);
    }
    
    setDraggedItem(null);
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-4">
              <div className="text-xl font-bold text-primary">T100</div>
              <div className="h-6 w-px bg-base-300"></div>
            </div>

            {/* Pinned Menu Items */}
            <div className="flex items-center space-x-1">
              {getPinnedMenuItems().map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  draggable
                  onDragStart={() => handleDragStart(item.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, item.id)}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg
                    transition-all duration-200 cursor-move
                    ${pathname === item.href 
                      ? 'bg-primary text-primary-content' 
                      : 'hover:bg-base-300 text-base-content'
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium hidden sm:inline">
                    {item.label}
                  </span>
                </Link>
              ))}
              
              {/* Menu Customizer Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-circle btn-ghost btn-sm ml-2 relative group"
                title="Customize Menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                  bg-base-content text-base-100 text-xs px-2 py-1 rounded 
                  opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  All Menu Items
                </span>
              </button>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-2">
              <button className="btn btn-circle btn-ghost btn-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Customization Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setIsModalOpen(false)}
            ></div>

            {/* Modal */}
            <div 
              ref={modalRef}
              className="relative bg-base-100 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden"
            >
              {/* Header */}
              <div className="sticky top-0 bg-base-100 border-b border-base-300 p-6 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Customize Your Menu</h2>
                    <p className="text-base-content/70 mt-1">
                      Pin up to 8 items to your quick access menu. Drag to reorder.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-circle btn-ghost"
                  >
                    ✕
                  </button>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex gap-3 mt-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search menu items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input input-bordered w-full pl-10"
                    />
                    <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <select 
                    className="select select-bordered"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Pinned count indicator */}
                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-base-content/70">
                      Pinned Items: {pinnedItems.length}/8
                    </span>
                    <div className="flex gap-1">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div 
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < pinnedItems.length ? 'bg-primary' : 'bg-base-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {/* Currently Pinned Section */}
                {pinnedItems.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-base-content/70 mb-3">
                      CURRENTLY PINNED
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {getPinnedMenuItems().map((item) => (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={() => handleDragStart(item.id)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, item.id)}
                          className="bg-primary/10 border-2 border-primary/30 rounded-lg p-3 
                            cursor-move hover:bg-primary/20 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{item.icon}</span>
                              <span className="text-sm font-medium">{item.label}</span>
                            </div>
                            <button
                              onClick={() => togglePin(item.id)}
                              className="text-primary hover:text-primary-focus"
                            >
                              📌
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Items Grid */}
                <div>
                  <h3 className="text-sm font-semibold text-base-content/70 mb-3">
                    ALL MENU ITEMS
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {getFilteredItems().map((item) => {
                      const isPinned = pinnedItems.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          className={`
                            relative group rounded-lg border-2 p-4 
                            transition-all duration-200 cursor-pointer
                            ${isPinned 
                              ? 'border-primary bg-primary/5' 
                              : 'border-base-300 hover:border-primary/50 hover:bg-base-200'
                            }
                          `}
                          onClick={() => togglePin(item.id)}
                        >
                          {/* Category Badge */}
                          <div className="absolute top-2 right-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-base-300 text-base-content/70">
                              {item.category}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="flex flex-col items-center text-center space-y-2 mt-2">
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-sm font-medium">{item.label}</span>
                            <span className="text-xs text-base-content/50 truncate w-full">
                              {item.href}
                            </span>
                          </div>

                          {/* Pin Indicator */}
                          <div className={`
                            absolute top-2 left-2 transition-all
                            ${isPinned ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                          `}>
                            <span className={`text-lg ${isPinned ? 'text-primary' : 'text-base-content/30'}`}>
                              {isPinned ? '📌' : '📍'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* No results */}
                {getFilteredItems().length === 0 && (
                  <div className="text-center py-12">
                    <span className="text-6xl">🔍</span>
                    <p className="mt-4 text-base-content/70">
                      No menu items found matching your criteria
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-base-100 border-t border-base-300 p-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-base-content/70">
                    💡 Tip: Drag pinned items to reorder them
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-primary"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}