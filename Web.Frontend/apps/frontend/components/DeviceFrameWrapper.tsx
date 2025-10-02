"use client";

import { useState, useEffect, ReactNode } from 'react';
import {
  DeviceFrameset,
  DeviceEmulator,
  DeviceSelector
} from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';

interface DeviceFrameWrapperProps {
  children: ReactNode;
  defaultDevice?: 'phone' | 'tablet' | 'desktop';
  showToggle?: boolean;
}

type DeviceType = 'iPhone X' | 'iPhone 8' | 'iPad Mini' | 'Galaxy Note 8' | 'desktop';

export default function DeviceFrameWrapper({
  children,
  defaultDevice = 'phone',
  showToggle = true
}: DeviceFrameWrapperProps) {
  const [currentDevice, setCurrentDevice] = useState<DeviceType>('iPhone X');
  const [showFrame, setShowFrame] = useState(true);

  // Device configurations
  const devices = {
    phone: [
      { id: 'iPhone X' as DeviceType, name: 'iPhone X', width: 375, height: 812 },
      { id: 'iPhone 8' as DeviceType, name: 'iPhone 8', width: 375, height: 667 },
      { id: 'Galaxy Note 8' as DeviceType, name: 'Galaxy Note 8', width: 412, height: 846 }
    ],
    tablet: [
      { id: 'iPad Mini' as DeviceType, name: 'iPad Mini', width: 768, height: 1024 }
    ]
  };

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem('deviceFramePreference');
    if (saved) {
      const { device, showFrame: show } = JSON.parse(saved);
      setCurrentDevice(device);
      setShowFrame(show);
    } else if (defaultDevice === 'tablet') {
      setCurrentDevice('iPad Mini');
    } else if (defaultDevice === 'desktop') {
      setShowFrame(false);
    }
  }, [defaultDevice]);

  // Save preference
  const updateDevice = (device: DeviceType) => {
    setCurrentDevice(device);
    localStorage.setItem('deviceFramePreference', JSON.stringify({
      device,
      showFrame
    }));
  };

  const toggleFrame = () => {
    const newShowFrame = !showFrame;
    setShowFrame(newShowFrame);
    localStorage.setItem('deviceFramePreference', JSON.stringify({
      device: currentDevice,
      showFrame: newShowFrame
    }));
  };

  const getCurrentCategory = () => {
    if (devices.phone.some(d => d.id === currentDevice)) return 'phone';
    if (devices.tablet.some(d => d.id === currentDevice)) return 'tablet';
    return 'desktop';
  };

  if (!showFrame) {
    return (
      <>
        {showToggle && (
          <div className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentDevice('iPhone X');
                    setShowFrame(true);
                    localStorage.setItem('deviceFramePreference', JSON.stringify({
                      device: 'iPhone X',
                      showFrame: true
                    }));
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  📱 Phone
                </button>
                <button
                  onClick={() => {
                    setCurrentDevice('iPad Mini');
                    setShowFrame(true);
                    localStorage.setItem('deviceFramePreference', JSON.stringify({
                      device: 'iPad Mini',
                      showFrame: true
                    }));
                  }}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  📱 Tablet
                </button>
                <button
                  className="px-3 py-1 bg-gray-600 text-white rounded text-sm cursor-not-allowed"
                  disabled
                >
                  🖥️ Desktop (Current)
                </button>
              </div>
              <button
                onClick={toggleFrame}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
              >
                Show Device Frame
              </button>
            </div>
          </div>
        )}
        <div className="w-full h-full">{children}</div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      {showToggle && (
        <div className="mb-6 bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center gap-4">
            {/* Device Type Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => updateDevice('iPhone X')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  getCurrentCategory() === 'phone'
                    ? 'bg-white text-purple-600 shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                📱 Phone
              </button>
              <button
                onClick={() => updateDevice('iPad Mini')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  getCurrentCategory() === 'tablet'
                    ? 'bg-white text-purple-600 shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                📱 Tablet
              </button>
              <button
                onClick={toggleFrame}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                🖥️ Desktop
              </button>
            </div>

            {/* Device Model Selector */}
            {getCurrentCategory() === 'phone' && (
              <select
                value={currentDevice}
                onChange={(e) => updateDevice(e.target.value as DeviceType)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {devices.phone.map(device => (
                  <option key={device.id} value={device.id}>
                    {device.name}
                  </option>
                ))}
              </select>
            )}

            {/* Info */}
            <div className="text-sm text-gray-500">
              {getCurrentCategory() === 'phone' &&
                devices.phone.find(d => d.id === currentDevice)?.width + ' × ' +
                devices.phone.find(d => d.id === currentDevice)?.height + 'px'
              }
              {getCurrentCategory() === 'tablet' && '768 × 1024px'}
            </div>
          </div>
        </div>
      )}

      {/* Device Frame */}
      <div className="flex justify-center items-center">
        <DeviceFrameset
          device={currentDevice}
          color={currentDevice === 'iPhone X' ? 'black' : undefined}
          landscape={false}
          zoom={getCurrentCategory() === 'tablet' ? 0.7 : 0.85}
        >
          <div
            className="relative overflow-hidden bg-white"
            style={{
              width: getCurrentCategory() === 'tablet' ? '768px' : '375px',
              height: getCurrentCategory() === 'tablet' ? '1024px' : '812px'
            }}
          >
            <div className="w-full h-full overflow-auto relative">
              {children}
            </div>
          </div>
        </DeviceFrameset>
      </div>

      {/* Tips */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Viewing in {getCurrentCategory() === 'phone' ? 'Mobile' : 'Tablet'} Mode</p>
        <p className="mt-1">Use the controls above to switch devices</p>
      </div>
    </div>
  );
}