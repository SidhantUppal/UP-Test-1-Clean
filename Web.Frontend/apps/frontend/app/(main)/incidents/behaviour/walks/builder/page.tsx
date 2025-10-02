"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  WalkType,
  WalkMode,
  RouteType,
  CheckItemType,
  VerificationType,
  WalkCheckpoint
} from '@/types/behaviour/walks';

export default function WalkBuilderPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // Walk configuration state
  const [walkTitle, setWalkTitle] = useState('');
  const [walkDescription, setWalkDescription] = useState('');
  const [walkType, setWalkType] = useState<WalkType>('general');
  const [walkMode, setWalkMode] = useState<WalkMode>('checkpoint');
  const [routeType, setRouteType] = useState<RouteType>('linear');
  const [duration, setDuration] = useState(30);
  const [isGPSTracked, setIsGPSTracked] = useState(true);
  const [isOrdered, setIsOrdered] = useState(true);
  const [mapImages, setMapImages] = useState<Array<{ id: string; url: string; name: string }>>([]);
  const [selectedMapId, setSelectedMapId] = useState<string | null>(null);
  const [isPlacingCheckpoint, setIsPlacingCheckpoint] = useState(false);

  // Tab state for map input method
  const [activeMapTab, setActiveMapTab] = useState<'upload' | 'draw' | 'description'>('upload');
  const [savedCanvasData, setSavedCanvasData] = useState<string | null>(null);

  // Drawing state
  const [drawnMapUrl, setDrawnMapUrl] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingTool, setDrawingTool] = useState<'pen' | 'rectangle' | 'circle' | 'line' | 'eraser' | 'text'>('pen');
  const [drawingColor, setDrawingColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [textInput, setTextInput] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [textPosition, setTextPosition] = useState<{ x: number; y: number } | null>(null);
  const [fontSize, setFontSize] = useState(16);

  // Description state
  const [routeDescription, setRouteDescription] = useState('');

  // Checkpoints state - stored per map ID
  const [checkpointsByMap, setCheckpointsByMap] = useState<{ [mapId: string]: WalkCheckpoint[] }>({});
  const [editingCheckpoint, setEditingCheckpoint] = useState<WalkCheckpoint | null>(null);
  const [showCheckpointEditor, setShowCheckpointEditor] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  // Start and End points - stored per map ID
  const [startPointsByMap, setStartPointsByMap] = useState<{ [mapId: string]: { x: number; y: number } }>({});
  const [endPointsByMap, setEndPointsByMap] = useState<{ [mapId: string]: { x: number; y: number } }>({});
  const [placementMode, setPlacementMode] = useState<'none' | 'start' | 'end' | 'checkpoint'>('none');

  // Checkpoint editor state
  const [checkpointName, setCheckpointName] = useState('');
  const [checkpointDescription, setCheckpointDescription] = useState('');
  const [checkpointLocation, setCheckpointLocation] = useState('');
  const [verificationType, setVerificationType] = useState<VerificationType>('manual');
  const [checkpointMapPosition, setCheckpointMapPosition] = useState<{ x: number; y: number } | null>(null);
  const [checks, setChecks] = useState<Array<{
    question: string;
    type: CheckItemType;
    required: boolean;
    scoreValue: number;
  }>>([]);

  // Handle map image upload (supports multiple)
  const handleMapUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newMap = {
            id: Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9),
            url: event.target?.result as string,
            name: file.name
          };
          setMapImages(prev => [...prev, newMap]);
          // Auto-select first map if none selected
          if (!selectedMapId) {
            setSelectedMapId(newMap.id);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Get currently selected map
  const selectedMap = mapImages.find(m => m.id === selectedMapId);

  // Get checkpoints for current map
  const currentMapCheckpoints = selectedMapId ? (checkpointsByMap[selectedMapId] || []) : [];

  // Get all checkpoints in order with global numbering
  const getAllCheckpointsOrdered = () => {
    const allCheckpoints: { checkpoint: WalkCheckpoint; mapId: string; globalIndex: number }[] = [];
    let globalIndex = 1;

    // Process maps in the order they appear
    mapImages.forEach(map => {
      const mapCheckpoints = checkpointsByMap[map.id] || [];
      mapCheckpoints.forEach(checkpoint => {
        allCheckpoints.push({
          checkpoint,
          mapId: map.id,
          globalIndex: globalIndex++
        });
      });
    });

    return allCheckpoints;
  };

  // Get global index for a specific checkpoint
  const getCheckpointGlobalIndex = (checkpointId: number): number => {
    const allCheckpoints = getAllCheckpointsOrdered();
    const found = allCheckpoints.find(item => item.checkpoint.checkpointId === checkpointId);
    return found ? found.globalIndex : 0;
  };

  // Save canvas when leaving draw tab
  useEffect(() => {
    return () => {
      if (activeMapTab === 'draw' && canvasRef.current) {
        setSavedCanvasData(canvasRef.current.toDataURL());
      }
    };
  }, [activeMapTab]);

  // Initialize canvas when switching to draw tab
  useEffect(() => {
    if (activeMapTab === 'draw') {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        initializeCanvas();
      }, 100);
    }
  }, [activeMapTab]);

  // Initialize canvas context when tab changes to draw
  const initializeCanvas = () => {
    if (canvasRef.current && activeMapTab === 'draw') {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const context = canvas.getContext('2d');
      if (context) {
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = drawingColor;
        context.lineWidth = lineWidth;
        contextRef.current = context;

        // Check if we have saved canvas data
        if (savedCanvasData) {
          // Restore the saved canvas data
          const img = new Image();
          img.onload = () => {
            if (context && canvas) {
              context.drawImage(img, 0, 0);
            }
          };
          img.src = savedCanvasData;
        } else if (canvasHistory.length > 0 && historyStep >= 0) {
          // Restore from history
          restoreCanvas(canvasHistory[historyStep]);
        } else {
          // Fill with white background only on first initialization
          context.fillStyle = 'white';
          context.fillRect(0, 0, canvas.width, canvas.height);
          // Save initial state to history
          saveToHistory();
        }
      }
    }
  };

  // Save canvas state to history
  const saveToHistory = () => {
    if (!canvasRef.current) return;

    const dataUrl = canvasRef.current.toDataURL();
    const newHistory = canvasHistory.slice(0, historyStep + 1);
    newHistory.push(dataUrl);
    setCanvasHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
    // Also update saved canvas data
    setSavedCanvasData(dataUrl);
  };

  // Undo function
  const undo = () => {
    if (historyStep > 0) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      restoreCanvas(canvasHistory[newStep]);
    }
  };

  // Redo function
  const redo = () => {
    if (historyStep < canvasHistory.length - 1) {
      const newStep = historyStep + 1;
      setHistoryStep(newStep);
      restoreCanvas(canvasHistory[newStep]);
    }
  };

  // Restore canvas from data URL
  const restoreCanvas = (dataUrl: string) => {
    if (!canvasRef.current || !contextRef.current) return;

    const img = new Image();
    img.onload = () => {
      if (contextRef.current && canvasRef.current) {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        contextRef.current.drawImage(img, 0, 0);
      }
    };
    img.src = dataUrl;
  };

  // Add text to canvas
  const addTextToCanvas = () => {
    if (!contextRef.current || !canvasRef.current || !textPosition || !textInput) return;

    const ctx = contextRef.current;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = drawingColor;
    ctx.fillText(textInput, textPosition.x, textPosition.y);

    setShowTextInput(false);
    setTextInput('');
    setTextPosition(null);
    saveToHistory();
  };

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    // Ensure context exists
    if (!contextRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        contextRef.current = context;
        context.lineCap = 'round';
        context.lineJoin = 'round';
      } else {
        return;
      }
    }

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (drawingTool === 'text') {
      setTextPosition({ x, y });
      setShowTextInput(true);
      return;
    }

    setIsDrawing(true);
    setStartPos({ x, y });

    const ctx = contextRef.current;
    ctx.strokeStyle = drawingTool === 'eraser' ? '#FFFFFF' : drawingColor;
    ctx.lineWidth = drawingTool === 'eraser' ? lineWidth * 3 : lineWidth;

    if (drawingTool === 'pen' || drawingTool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current || !contextRef.current || !startPos) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = contextRef.current;

    if (drawingTool === 'pen' || drawingTool === 'eraser') {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current || !contextRef.current || !startPos) {
      setIsDrawing(false);
      return;
    }

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = contextRef.current;

    // Draw shapes on mouse up
    if (drawingTool === 'rectangle') {
      ctx.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
    } else if (drawingTool === 'circle') {
      const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
      ctx.beginPath();
      ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
    } else if (drawingTool === 'line') {
      ctx.beginPath();
      ctx.moveTo(startPos.x, startPos.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    setIsDrawing(false);
    setStartPos(null);

    // Save to history after drawing
    saveToHistory();
  };

  const clearCanvas = () => {
    if (!canvasRef.current || !contextRef.current) return;
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  const saveDrawing = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL();
    setDrawnMapUrl(dataUrl);
    // Add to map images
    const newMap = {
      id: 'drawn-' + Date.now().toString(),
      url: dataUrl,
      name: 'Hand-drawn map'
    };
    setMapImages(prev => [...prev, newMap]);
    setSelectedMapId(newMap.id);
    // Switch to upload tab to see the saved map
    setActiveMapTab('upload');
  };

  // Handle map click for placing checkpoints, start, or end points
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (placementMode === 'none' && !isPlacingCheckpoint) return;
    if (!selectedMapId) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (placementMode === 'start') {
      setStartPointsByMap({
        ...startPointsByMap,
        [selectedMapId]: { x, y }
      });
      setPlacementMode('none');
    } else if (placementMode === 'end') {
      setEndPointsByMap({
        ...endPointsByMap,
        [selectedMapId]: { x, y }
      });
      setPlacementMode('none');
    } else if (isPlacingCheckpoint || placementMode === 'checkpoint') {
      setCheckpointMapPosition({ x, y });
      setIsPlacingCheckpoint(false);
      setPlacementMode('none');
      setShowCheckpointEditor(true);
    }
  };

  // Add or update checkpoint
  const saveCheckpoint = () => {
    if (!selectedMapId) {
      alert('Please select or upload a map first');
      return;
    }

    const mapCheckpoints = checkpointsByMap[selectedMapId] || [];
    const allCheckpointsCount = Object.values(checkpointsByMap).flat().length;

    const newCheckpoint: WalkCheckpoint = {
      checkpointId: editingCheckpoint?.checkpointId || Date.now(),
      name: checkpointName,
      description: checkpointDescription,
      location: {
        name: checkpointLocation
      },
      checks: checks.map((c, i) => ({
        id: `chk-${Date.now()}-${i}`,
        ...c
      })),
      quickActions: ['Report issue', 'Take photo', 'Add note'],
      verificationType,
      confirmationRequired: true,
      orderNum: editingCheckpoint?.orderNum || (allCheckpointsCount + 1),
      expectedDuration: 120,
      mapPosition: checkpointMapPosition || undefined
    };

    if (editingCheckpoint) {
      // Update existing
      setCheckpointsByMap({
        ...checkpointsByMap,
        [selectedMapId]: mapCheckpoints.map(cp =>
          cp.checkpointId === editingCheckpoint.checkpointId ? newCheckpoint : cp
        )
      });
    } else {
      // Add new
      setCheckpointsByMap({
        ...checkpointsByMap,
        [selectedMapId]: [...mapCheckpoints, newCheckpoint]
      });
    }

    // Reset editor
    setEditingCheckpoint(null);
    setShowCheckpointEditor(false);
    resetCheckpointEditor();
  };

  // Reset checkpoint editor
  const resetCheckpointEditor = () => {
    setCheckpointName('');
    setCheckpointDescription('');
    setCheckpointLocation('');
    setVerificationType('manual');
    setCheckpointMapPosition(null);
    setChecks([]);
  };

  // Edit checkpoint
  const editCheckpoint = (checkpoint: WalkCheckpoint) => {
    setEditingCheckpoint(checkpoint);
    setCheckpointName(checkpoint.name);
    setCheckpointDescription(checkpoint.description);
    setCheckpointLocation(checkpoint.location.name);
    setVerificationType(checkpoint.verificationType);
    setCheckpointMapPosition(checkpoint.mapPosition || null);
    setChecks(checkpoint.checks.map(c => ({
      question: c.question,
      type: c.type,
      required: c.required,
      scoreValue: c.scoreValue || 10
    })));
    setShowCheckpointEditor(true);
  };

  // Delete checkpoint
  const deleteCheckpoint = (checkpointId: number) => {
    if (!selectedMapId) return;

    const mapCheckpoints = checkpointsByMap[selectedMapId] || [];
    setCheckpointsByMap({
      ...checkpointsByMap,
      [selectedMapId]: mapCheckpoints.filter(cp => cp.checkpointId !== checkpointId)
    });
  };

  // Move checkpoint up/down
  const moveCheckpoint = (index: number, direction: 'up' | 'down') => {
    if (!selectedMapId) return;

    const mapCheckpoints = [...(checkpointsByMap[selectedMapId] || [])];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < mapCheckpoints.length) {
      [mapCheckpoints[index], mapCheckpoints[newIndex]] = [mapCheckpoints[newIndex], mapCheckpoints[index]];
      // Update order numbers
      mapCheckpoints.forEach((cp, i) => {
        cp.orderNum = i + 1;
      });
      setCheckpointsByMap({
        ...checkpointsByMap,
        [selectedMapId]: mapCheckpoints
      });
    }
  };

  // Add check to checkpoint
  const addCheck = () => {
    if (checks.length < 5) { // Mini-Check limit
      setChecks([...checks, {
        question: '',
        type: 'yes/no',
        required: true,
        scoreValue: 10
      }]);
    }
  };

  // Update check
  const updateCheck = (index: number, field: string, value: any) => {
    const newChecks = [...checks];
    newChecks[index] = { ...newChecks[index], [field]: value };
    setChecks(newChecks);
  };

  // Remove check
  const removeCheck = (index: number) => {
    setChecks(checks.filter((_, i) => i !== index));
  };

  // Save walk
  const saveWalk = () => {
    // Get all checkpoints across all maps for validation
    const allCheckpoints = Object.values(checkpointsByMap).flat();
    if (!walkTitle || allCheckpoints.length === 0) {
      alert('Please provide a title and at least one checkpoint');
      return;
    }

    // In a real app, this would save to the backend
    const walkData = {
      title: walkTitle,
      description: walkDescription,
      type: walkType,
      mode: walkMode,
      routeType,
      duration,
      isGPSTracked,
      isOrdered,
      maps: mapImages.map(map => ({
        id: map.id,
        url: map.url,
        name: map.name,
        checkpoints: checkpointsByMap[map.id] || [],
        startPoint: startPointsByMap[map.id] || null,
        endPoint: endPointsByMap[map.id] || null
      })),
      selectedMapId,
      totalCheckpoints: allCheckpoints.length
    };

    console.log('Saving walk:', walkData);
    localStorage.setItem(`walk-draft-${Date.now()}`, JSON.stringify(walkData));

    router.push('/incidents/behaviour/walks');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header - Following style guide */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Walk Builder</h1>
              <p className="text-gray-600 mt-1">Create a new safety walk template</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={saveWalk}
                style={{
                  backgroundColor: '#3d3a72',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }}
                className="hover:opacity-80"
              >
                Save Walk
              </button>
              <button
                onClick={() => router.push('/incidents/behaviour/walks')}
                style={{
                  backgroundColor: '#e77726',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }}
                className="hover:opacity-80"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Following style guide */}
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Walk Configuration */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Walk Title *</label>
                  <input
                    type="text"
                    value={walkTitle}
                    onChange={(e) => setWalkTitle(e.target.value)}
                    placeholder="e.g., Daily Housekeeping Walk"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={walkDescription}
                    onChange={(e) => setWalkDescription(e.target.value)}
                    placeholder="Describe the purpose of this walk..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Walk Type</label>
                  <select 
                    value={walkType}
                    onChange={(e) => setWalkType(e.target.value as WalkType)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="general">General</option>
                    <option value="housekeeping">🧹 Housekeeping</option>
                    <option value="security">🔒 Security</option>
                    <option value="fire">🔥 Fire Safety</option>
                    <option value="hygiene">🧼 Hygiene</option>
                    <option value="equipment">⚙️ Equipment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Walk Mode</label>
                  <select
                    value={walkMode}
                    onChange={(e) => setWalkMode(e.target.value as WalkMode)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="checkpoint">Checkpoint Mode</option>
                    <option value="journey">Journey Mode</option>
                    <option value="hybrid">Hybrid Mode</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Route Type</label>
                  <select
                    value={routeType}
                    onChange={(e) => setRouteType(e.target.value as RouteType)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="linear">➡️ Linear (One-way)</option>
                    <option value="circuit">🔄 Circuit (Loop)</option>
                    <option value="custom">✏️ Custom Path</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    min="5"
                    max="120"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isGPSTracked}
                    onChange={(e) => setIsGPSTracked(e.target.checked)}
                    className="checkbox checkbox-primary"
                  />
                  <span className="text-sm">Enable GPS Tracking</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isOrdered}
                    onChange={(e) => setIsOrdered(e.target.checked)}
                    className="checkbox checkbox-primary"
                  />
                  <span className="text-sm">Checkpoints must be completed in order</span>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column - Checkpoints */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Input Section with 3 Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => {
                      // Save canvas data before switching
                      if (activeMapTab === 'draw' && canvasRef.current) {
                        setSavedCanvasData(canvasRef.current.toDataURL());
                      }
                      setActiveMapTab('upload');
                    }}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                      activeMapTab === 'upload'
                        ? 'text-purple-600 border-purple-600 bg-purple-50'
                        : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Upload Maps</span>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      // Save canvas data before switching
                      if (activeMapTab === 'draw' && canvasRef.current) {
                        setSavedCanvasData(canvasRef.current.toDataURL());
                      }
                      setActiveMapTab('draw');
                    }}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                      activeMapTab === 'draw'
                        ? 'text-purple-600 border-purple-600 bg-purple-50'
                        : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      <span>Draw Map</span>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      // Save canvas data before switching
                      if (activeMapTab === 'draw' && canvasRef.current) {
                        setSavedCanvasData(canvasRef.current.toDataURL());
                      }
                      setActiveMapTab('description');
                    }}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                      activeMapTab === 'description'
                        ? 'text-purple-600 border-purple-600 bg-purple-50'
                        : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Checkpoint Description</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Upload Tab Content */}
                {activeMapTab === 'upload' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Upload Maps</h2>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          backgroundColor: 'transparent',
                          color: '#3d3a72',
                          border: '1px solid #3d3a72',
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'opacity 0.2s'
                        }}
                        className="hover:opacity-80"
                      >
                        + Add Map
                      </button>
                    </div>

              {/* Current selected map label */}
              {selectedMap && (
                <div className="mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Current Map: {selectedMap.name}
                  </label>
                </div>
              )}

              {selectedMap ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const hasStart = selectedMapId && startPointsByMap[selectedMapId];
                        setPlacementMode(hasStart ? 'end' : 'start');
                        setIsPlacingCheckpoint(false);
                      }}
                      style={{
                        backgroundColor: placementMode === 'start' || placementMode === 'end' ? '#10b981' : 'transparent',
                        color: placementMode === 'start' || placementMode === 'end' ? '#ffffff' : '#10b981',
                        border: placementMode === 'start' || placementMode === 'end' ? 'none' : '1px solid #10b981',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        fontSize: '12px',
                        transition: 'opacity 0.2s'
                      }}
                      className="hover:opacity-80"
                    >
                      {placementMode === 'start' ? 'Click map for start' :
                       placementMode === 'end' ? 'Click map for end' :
                       (selectedMapId && startPointsByMap[selectedMapId] ? 'Set End Point' : 'Set Start Point')}
                    </button>
                    <button
                      onClick={() => {
                        setIsPlacingCheckpoint(!isPlacingCheckpoint);
                        setPlacementMode(isPlacingCheckpoint ? 'none' : 'checkpoint');
                      }}
                      style={{
                        backgroundColor: isPlacingCheckpoint ? '#3d3a72' : 'transparent',
                        color: isPlacingCheckpoint ? '#ffffff' : '#3d3a72',
                        border: isPlacingCheckpoint ? 'none' : '1px solid #3d3a72',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        fontSize: '12px',
                        transition: 'opacity 0.2s'
                      }}
                      className="hover:opacity-80"
                    >
                      {isPlacingCheckpoint ? 'Click map to place' : 'Add Checkpoint'}
                    </button>
                    <button
                      onClick={() => {
                        // Remove selected map
                        setMapImages(prev => prev.filter(m => m.id !== selectedMapId));
                        // Select next available map
                        const remaining = mapImages.filter(m => m.id !== selectedMapId);
                        setSelectedMapId(remaining[0]?.id || null);
                      }}
                      style={{
                        backgroundColor: '#e77726',
                        color: '#ffffff',
                        border: 'none',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        fontSize: '12px',
                        transition: 'opacity 0.2s'
                      }}
                      className="hover:opacity-80"
                    >
                      Remove This Map
                    </button>
                  </div>

                  <div
                    className="relative rounded-lg border-2 border-gray-200 overflow-hidden"
                    onClick={handleMapClick}
                    style={{
                      cursor: (isPlacingCheckpoint || placementMode !== 'none') ? 'crosshair' : 'default',
                      height: '500px'  // Much bigger for better visibility
                    }}
                  >
                    <img
                      src={selectedMap.url}
                      alt="Walk map"
                      className="w-full h-full object-contain"
                      draggable={false}
                    />

                    {/* Render start point */}
                    {selectedMapId && startPointsByMap[selectedMapId] && (
                      <div
                        className="absolute flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full text-sm font-bold shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${startPointsByMap[selectedMapId].x}%`,
                          top: `${startPointsByMap[selectedMapId].y}%`,
                          zIndex: 10
                        }}
                        title="Start Point"
                      >
                        S
                      </div>
                    )}

                    {/* Render end point */}
                    {selectedMapId && endPointsByMap[selectedMapId] && (
                      <div
                        className="absolute flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full text-sm font-bold shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${endPointsByMap[selectedMapId].x}%`,
                          top: `${endPointsByMap[selectedMapId].y}%`,
                          zIndex: 10
                        }}
                        title="End Point"
                      >
                        E
                      </div>
                    )}

                    {/* Render checkpoint pins on map */}
                    {currentMapCheckpoints.filter(cp => cp.mapPosition).map((checkpoint) => (
                      <div
                        key={checkpoint.checkpointId}
                        className="absolute flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full text-xs font-bold shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer"
                        style={{
                          left: `${checkpoint.mapPosition!.x}%`,
                          top: `${checkpoint.mapPosition!.y}%`
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          editCheckpoint(checkpoint);
                        }}
                        title={checkpoint.name}
                      >
                        {getCheckpointGlobalIndex(checkpoint.checkpointId)}
                      </div>
                    ))}

                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    {isPlacingCheckpoint
                      ? 'Click anywhere on the map to place a new checkpoint'
                      : 'Click checkpoint pins to edit, or use "Add Checkpoint" button'}
                  </p>

                  {/* Horizontal row of map thumbnails */}
                  {mapImages.length > 1 && (
                    <div className="mt-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">All Maps ({mapImages.length})</p>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {mapImages.map(map => (
                          <div
                            key={map.id}
                            onClick={() => setSelectedMapId(map.id)}
                            className={`relative cursor-pointer rounded-lg border-2 transition-all hover:shadow-md flex-shrink-0 ${
                              map.id === selectedMapId
                                ? 'border-purple-500 shadow-md'
                                : 'border-gray-200 hover:border-purple-300'
                            }`}
                            style={{ width: '100px', height: '80px' }}
                          >
                            <img
                              src={map.url}
                              alt={map.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-md" />
                            <div className="absolute bottom-1 left-1 right-1">
                              <p className="text-white text-xs font-medium truncate" title={map.name}>
                                {map.name}
                              </p>
                            </div>
                            {/* Show checkpoint count for this map */}
                            {checkpointsByMap[map.id] && checkpointsByMap[map.id].length > 0 && (
                              <div className="absolute top-1 left-1 bg-purple-600 text-white rounded-full px-1.5 py-0.5 text-xs font-bold">
                                {checkpointsByMap[map.id].length}
                              </div>
                            )}
                            {map.id === selectedMapId && (
                              <div className="absolute top-1 right-1 bg-purple-500 text-white rounded-full p-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 transition-colors"
                  >
                    <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600">Click to upload map images</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB (multiple files supported)</p>
                    {mapImages.length > 0 && (
                      <p className="text-xs text-blue-600 mt-2">{mapImages.length} map{mapImages.length !== 1 ? 's' : ''} uploaded</p>
                    )}
                  </button>

                </div>
              )}

            </div>
          )}

                {/* Draw Tab Content */}
                {activeMapTab === 'draw' && (
                  <div>
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold mb-2">Draw Your Map</h2>
                      <p className="text-sm text-gray-600">Use the drawing tools below to create a simple map layout</p>
                    </div>

                    {/* Drawing Canvas */}
                    <div className="border-2 border-gray-200 rounded-lg bg-gray-50 p-4">
                      <div className="mb-3">
                        {/* Tool Selection */}
                        <div className="flex gap-2 flex-wrap mb-3">
                          {/* Pen Tool */}
                          <button
                            onClick={() => setDrawingTool('pen')}
                            className={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
                              drawingTool === 'pen'
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'bg-white border-gray-300 hover:bg-gray-50'
                            }`}
                            title="Pen tool"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>

                          {/* Rectangle Tool */}
                          <button
                            onClick={() => setDrawingTool('rectangle')}
                            className={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
                              drawingTool === 'rectangle'
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'bg-white border-gray-300 hover:bg-gray-50'
                            }`}
                            title="Rectangle tool"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="4" y="6" width="16" height="12" strokeWidth="2" />
                            </svg>
                          </button>

                          {/* Line Tool */}
                          <button
                            onClick={() => setDrawingTool('line')}
                            className={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
                              drawingTool === 'line'
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'bg-white border-gray-300 hover:bg-gray-50'
                            }`}
                            title="Line tool"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20L20 4" />
                            </svg>
                          </button>

                          {/* Circle Tool */}
                          <button
                            onClick={() => setDrawingTool('circle')}
                            className={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
                              drawingTool === 'circle'
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'bg-white border-gray-300 hover:bg-gray-50'
                            }`}
                            title="Circle tool"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="8" strokeWidth="2" />
                            </svg>
                          </button>

                          {/* Eraser Tool */}
                          <button
                            onClick={() => setDrawingTool('eraser')}
                            className={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
                              drawingTool === 'eraser'
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'bg-white border-gray-300 hover:bg-gray-50'
                            }`}
                            title="Eraser tool"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 6.5a1 1 0 00-1-1h-11a1 1 0 00-1 1v11a1 1 0 001 1h11a1 1 0 001-1v-11z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12.5h5m0 0v5m0-5l-4 4" />
                            </svg>
                          </button>

                          <div className="border-l border-gray-300 mx-1" />

                          {/* Color Picker */}
                          <input
                            type="color"
                            value={drawingColor}
                            onChange={(e) => setDrawingColor(e.target.value)}
                            className="w-10 h-9 rounded cursor-pointer"
                            title="Pick color"
                          />

                          {/* Line Width */}
                          <select
                            value={lineWidth}
                            onChange={(e) => setLineWidth(Number(e.target.value))}
                            className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm"
                            title="Line width"
                          >
                            <option value="1">Thin</option>
                            <option value="2">Normal</option>
                            <option value="4">Thick</option>
                            <option value="8">Extra Thick</option>
                          </select>

                          <div className="border-l border-gray-300 mx-1" />

                          {/* Clear Canvas */}
                          <button
                            onClick={clearCanvas}
                            className="px-3 py-1.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
                            title="Clear canvas"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>

                          {/* Save Drawing */}
                          <button
                            onClick={saveDrawing}
                            className="px-3 py-1.5 bg-green-600 text-white border border-green-600 rounded-md hover:bg-green-700 text-sm"
                            title="Save drawing as map"
                          >
                            Save as Map
                          </button>
                        </div>
                      </div>

                      {/* Canvas Area */}
                      <div className="relative bg-white rounded-lg" style={{ height: '400px' }}>
                        <canvas
                          ref={canvasRef}
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          className="absolute inset-0 w-full h-full rounded-lg"
                          style={{
                            border: '1px solid #e5e7eb',
                            cursor: drawingTool === 'eraser' ? 'crosshair' : drawingTool === 'pen' ? 'crosshair' : 'crosshair'
                          }}
                        />
                        {!isDrawing && (
                          <div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            style={{ opacity: 0.3 }}
                          >
                            <p className="text-center">
                              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                              Click and drag to start drawing
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Checkpoint Description Tab Content */}
                {activeMapTab === 'description' && (
                  <div className="p-6 space-y-4">
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold mb-2">Add/Edit Checkpoint</h2>
                      <p className="text-sm text-gray-600">Create a new checkpoint or edit an existing one</p>
                    </div>

                    {/* Checkpoint Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Checkpoint Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={checkpointName}
                          onChange={(e) => setCheckpointName(e.target.value)}
                          placeholder="e.g., Main Entrance"
                          className={`w-full px-3 py-2 border rounded-lg ${
                            !checkpointName ? 'border-gray-300 focus:border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={checkpointLocation}
                          onChange={(e) => setCheckpointLocation(e.target.value)}
                          placeholder="e.g., Building A - Front Door"
                          className={`w-full px-3 py-2 border rounded-lg ${
                            !checkpointLocation ? 'border-gray-300 focus:border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={checkpointDescription}
                        onChange={(e) => setCheckpointDescription(e.target.value)}
                        placeholder="What should be checked at this location?"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg h-20 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Verification Type</label>
                      <select
                        value={verificationType}
                        onChange={(e) => setVerificationType(e.target.value as VerificationType)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="manual">Manual</option>
                        <option value="qr">QR Code Scan</option>
                        <option value="gps">GPS Location</option>
                        <option value="photo">Photo Evidence</option>
                      </select>
                    </div>

                    {checkpointMapPosition && (
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <p className="text-sm text-purple-700">
                          📍 This checkpoint will be placed on the map at position ({Math.round(checkpointMapPosition.x)}%, {Math.round(checkpointMapPosition.y)}%)
                        </p>
                      </div>
                    )}

                    {/* Checks Section */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Checks ({checks.length}/5 - Mini-Check limit)
                        </label>
                        <button
                          onClick={addCheck}
                          disabled={checks.length >= 5}
                          style={{
                            backgroundColor: checks.length >= 5 ? '#9ca3af' : '#3d3a72',
                            color: '#ffffff',
                            border: 'none',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: checks.length >= 5 ? 'not-allowed' : 'pointer',
                            fontSize: '12px',
                            transition: 'opacity 0.2s'
                          }}
                          className={checks.length >= 5 ? '' : 'hover:opacity-80'}
                        >
                          Add Check
                        </button>
                      </div>

                      <div className="space-y-3">
                        {checks.map((check, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex items-start gap-3">
                              <div className="flex-1 space-y-2">
                                <input
                                  type="text"
                                  value={check.question}
                                  onChange={(e) => updateCheck(index, 'question', e.target.value)}
                                  placeholder="Enter check question..."
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                                <div className="flex gap-2">
                                  <select
                                    value={check.type}
                                    onChange={(e) => updateCheck(index, 'type', e.target.value)}
                                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                                  >
                                    <option value="yes/no">Yes/No</option>
                                    <option value="pass/fail">Pass/Fail</option>
                                    <option value="checkbox">Checkbox</option>
                                    <option value="photo">Photo</option>
                                    <option value="text">Text</option>
                                  </select>
                                  <label className="flex items-center gap-1 text-sm">
                                    <input
                                      type="checkbox"
                                      checked={check.required}
                                      onChange={(e) => updateCheck(index, 'required', e.target.checked)}
                                      className="checkbox checkbox-sm"
                                    />
                                    Required
                                  </label>
                                  <input
                                    type="number"
                                    value={check.scoreValue}
                                    onChange={(e) => updateCheck(index, 'scoreValue', parseInt(e.target.value))}
                                    placeholder="Points"
                                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                  />
                                </div>
                              </div>
                              <button
                                onClick={() => removeCheck(index)}
                                style={{
                                  backgroundColor: '#e77726',
                                  color: '#ffffff',
                                  border: 'none',
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  fontSize: '10px',
                                  transition: 'opacity 0.2s'
                                }}
                                className="hover:opacity-80"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}

                        {checks.length === 0 && (
                          <div className="text-center py-6 border border-dashed border-gray-300 rounded-lg">
                            <p className="text-sm text-gray-500">No checks added yet</p>
                            <p className="text-xs text-gray-400 mt-1">Click "Add Check" to create checkpoint questions</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-4">
                      <button
                        onClick={saveCheckpoint}
                        disabled={!checkpointName || !checkpointLocation}
                        style={{
                          backgroundColor: !checkpointName || !checkpointLocation ? '#9ca3af' : '#3d3a72',
                          color: '#ffffff',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontWeight: '500',
                          cursor: !checkpointName || !checkpointLocation ? 'not-allowed' : 'pointer',
                          fontSize: '14px',
                          transition: 'opacity 0.2s'
                        }}
                        className={!checkpointName || !checkpointLocation ? '' : 'hover:opacity-80'}
                      >
                        {editingCheckpoint ? 'Update' : 'Add'} Checkpoint
                      </button>

                      {editingCheckpoint && (
                        <button
                          onClick={() => {
                            setEditingCheckpoint(null);
                            resetCheckpointEditor();
                          }}
                          style={{
                            backgroundColor: '#e77726',
                            color: '#ffffff',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'opacity 0.2s'
                          }}
                          className="hover:opacity-80"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Checkpoints Panel - Below Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Checkpoints</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {getAllCheckpointsOrdered().length} total checkpoint{getAllCheckpointsOrdered().length !== 1 ? 's' : ''}
                      {selectedMapId && currentMapCheckpoints.length > 0 && ` (${currentMapCheckpoints.length} on this map)`}
                      {routeType === 'circuit' && getAllCheckpointsOrdered().length > 0 && ' • Circuit route'}
                      {routeType === 'linear' && getAllCheckpointsOrdered().length > 0 && ' • Linear route'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {(selectedMap || drawnMapUrl) && (
                      <button
                        onClick={() => setShowMapModal(!showMapModal)}
                        style={{
                          backgroundColor: showMapModal ? '#e77726' : 'transparent',
                          color: showMapModal ? '#ffffff' : '#e77726',
                          border: showMapModal ? 'none' : '1px solid #e77726',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          fontSize: '14px',
                          transition: 'opacity 0.2s'
                        }}
                        className="hover:opacity-80"
                        title="View checkpoints on map"
                      >
                        📍 {showMapModal ? 'Hide Map' : 'View on Map'}
                      </button>
                    )}
                    <button
                      onClick={() => setShowCheckpointEditor(true)}
                      style={{
                        backgroundColor: '#3d3a72',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'opacity 0.2s'
                      }}
                      className="hover:opacity-80"
                    >
                      Add Checkpoint
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {currentMapCheckpoints.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-500 mb-4">No checkpoints added yet</p>
                    <button
                      onClick={() => setShowCheckpointEditor(true)}
                      style={{
                        backgroundColor: '#3d3a72',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'opacity 0.2s'
                      }}
                      className="hover:opacity-80"
                    >
                      Add First Checkpoint
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentMapCheckpoints.map((checkpoint, index) => {
                      const globalIndex = getCheckpointGlobalIndex(checkpoint.checkpointId);
                      return (
                      <div key={checkpoint.checkpointId} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-start gap-3">
                            <div className="flex flex-col gap-1">
                              {index > 0 && (
                                <button
                                  onClick={() => moveCheckpoint(index, 'up')}
                                  style={{
                                    backgroundColor: '#3d3a72',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    fontSize: '10px',
                                    transition: 'opacity 0.2s'
                                  }}
                                  className="hover:opacity-80"
                                  title="Move up"
                                >
                                  ↑
                                </button>
                              )}
                              {index < currentMapCheckpoints.length - 1 && (
                                <button
                                  onClick={() => moveCheckpoint(index, 'down')}
                                  style={{
                                    backgroundColor: '#3d3a72',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    fontSize: '10px',
                                    transition: 'opacity 0.2s'
                                  }}
                                  className="hover:opacity-80"
                                  title="Move down"
                                >
                                  ↓
                                </button>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">#{globalIndex}</span>
                                <h3 className="font-semibold">{checkpoint.name}</h3>
                                {checkpoint.mapPosition && (
                                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                    📍 On Map
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{checkpoint.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                <span>📍 {checkpoint.location.name}</span>
                                <span>✓ {checkpoint.checks.length} check{checkpoint.checks.length !== 1 ? 's' : ''}</span>
                                <span>🔍 {checkpoint.verificationType}</span>
                                {checkpoint.expectedDuration && (
                                  <span>⏱️ ~{Math.round(checkpoint.expectedDuration / 60)}min</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => editCheckpoint(checkpoint)}
                              style={{
                                backgroundColor: '#3d3a72',
                                color: '#ffffff',
                                border: 'none',
                                padding: '4px 12px',
                                borderRadius: '6px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                fontSize: '12px',
                                transition: 'opacity 0.2s'
                              }}
                              className="hover:opacity-80"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteCheckpoint(checkpoint.checkpointId)}
                              style={{
                                backgroundColor: '#e77726',
                                color: '#ffffff',
                                border: 'none',
                                padding: '4px 12px',
                                borderRadius: '6px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                fontSize: '12px',
                                transition: 'opacity 0.2s'
                              }}
                              className="hover:opacity-80"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )})}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkpoint Editor Modal - Following style guide */}
      {showCheckpointEditor && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => {
            setShowCheckpointEditor(false);
            setEditingCheckpoint(null);
            resetCheckpointEditor();
          }} />

          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingCheckpoint ? 'Edit Checkpoint' : 'Add Checkpoint'}
                </h2>
                <button
                  onClick={() => {
                    setShowCheckpointEditor(false);
                    setEditingCheckpoint(null);
                    resetCheckpointEditor();
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
              {/* Checkpoint Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Checkpoint Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={checkpointName}
                    onChange={(e) => setCheckpointName(e.target.value)}
                    placeholder="e.g., Main Entrance"
                    className={`w-full px-3 py-2 border rounded-lg ${
                      !checkpointName ? 'border-gray-300 focus:border-red-500' : 'border-gray-300'
                    }`}
                    autoFocus
                  />
                  {!checkpointName && (
                    <p className="text-xs text-red-500 mt-1">Name is required</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={checkpointLocation}
                    onChange={(e) => setCheckpointLocation(e.target.value)}
                    placeholder="e.g., Building A - Front Door"
                    className={`w-full px-3 py-2 border rounded-lg ${
                      !checkpointLocation ? 'border-gray-300 focus:border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {!checkpointLocation && (
                    <p className="text-xs text-red-500 mt-1">Location is required</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={checkpointDescription}
                  onChange={(e) => setCheckpointDescription(e.target.value)}
                  placeholder="What should be checked at this location?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Verification Type</label>
                <select
                  value={verificationType}
                  onChange={(e) => setVerificationType(e.target.value as VerificationType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="manual">Manual</option>
                  <option value="qr">QR Code Scan</option>
                  <option value="gps">GPS Location</option>
                  <option value="photo">Photo Evidence</option>
                </select>
              </div>

              {checkpointMapPosition && (
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm text-purple-700">
                    📍 This checkpoint will be placed on the map at position ({Math.round(checkpointMapPosition.x)}%, {Math.round(checkpointMapPosition.y)}%)
                  </p>
                </div>
              )}

              {/* Checks Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Checks ({checks.length}/5 - Mini-Check limit)
                  </label>
                  <button
                    onClick={addCheck}
                    disabled={checks.length >= 5}
                    style={{
                      backgroundColor: checks.length >= 5 ? '#9ca3af' : '#3d3a72',
                      color: '#ffffff',
                      border: 'none',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontWeight: '500',
                      cursor: checks.length >= 5 ? 'not-allowed' : 'pointer',
                      fontSize: '12px',
                      transition: 'opacity 0.2s'
                    }}
                    className={checks.length >= 5 ? '' : 'hover:opacity-80'}
                  >
                    Add Check
                  </button>
                </div>

                <div className="space-y-3">
                  {checks.map((check, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={check.question}
                            onChange={(e) => updateCheck(index, 'question', e.target.value)}
                            placeholder="Enter check question..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                          <div className="flex gap-2">
                            <select
                              value={check.type}
                              onChange={(e) => updateCheck(index, 'type', e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="yes/no">Yes/No</option>
                              <option value="pass/fail">Pass/Fail</option>
                              <option value="checkbox">Checkbox</option>
                              <option value="photo">Photo</option>
                              <option value="text">Text</option>
                            </select>
                            <label className="flex items-center gap-1 text-sm">
                              <input
                                type="checkbox"
                                checked={check.required}
                                onChange={(e) => updateCheck(index, 'required', e.target.checked)}
                                className="checkbox checkbox-sm"
                              />
                              Required
                            </label>
                            <input
                              type="number"
                              value={check.scoreValue}
                              onChange={(e) => updateCheck(index, 'scoreValue', parseInt(e.target.value))}
                              placeholder="Points"
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => removeCheck(index)}
                          style={{
                            backgroundColor: '#e77726',
                            color: '#ffffff',
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            fontSize: '10px',
                            transition: 'opacity 0.2s'
                          }}
                          className="hover:opacity-80"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {checks.length === 0 && (
                    <div className="text-center py-6 border border-dashed border-gray-300 rounded-lg">
                      <p className="text-sm text-gray-500">No checks added yet</p>
                      <p className="text-xs text-gray-400 mt-1">Click "Add Check" to create checkpoint questions</p>
                    </div>
                  )}
                </div>
              </div>
              </div>

              {/* Modal Footer - Following style guide */}
              <div className="flex items-center justify-start gap-3 px-6 py-4 border-t border-gray-200">
                {/* Primary action button (Save) - ALWAYS FIRST */}
                <button
                  onClick={saveCheckpoint}
                  disabled={!checkpointName || !checkpointLocation}
                  style={{
                    backgroundColor: !checkpointName || !checkpointLocation ? '#9ca3af' : '#3d3a72',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: !checkpointName || !checkpointLocation ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className={!checkpointName || !checkpointLocation ? '' : 'hover:opacity-80'}
                  title={!checkpointName || !checkpointLocation ? 'Please fill in all required fields' : ''}
                >
                  {editingCheckpoint ? 'Update' : 'Add'} Checkpoint
                </button>

                {/* Secondary action button (Cancel) - ALWAYS SECOND */}
                <button
                  onClick={() => {
                    setShowCheckpointEditor(false);
                    setEditingCheckpoint(null);
                    resetCheckpointEditor();
                  }}
                  style={{
                    backgroundColor: '#e77726',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className="hover:opacity-80"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map Modal - View and place checkpoints on map */}
      {showMapModal && selectedMap && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowMapModal(false)} />

          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Walk Map - {walkTitle || 'Untitled Walk'}
                </h2>
                <button
                  onClick={() => setShowMapModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {currentMapCheckpoints.length} checkpoint{currentMapCheckpoints.length !== 1 ? 's' : ''} placed
                    {routeType && ` • ${routeType === 'circuit' ? 'Circuit' : routeType === 'linear' ? 'Linear' : 'Custom'} route`}
                  </div>
                  <button
                    onClick={() => {
                      setIsPlacingCheckpoint(!isPlacingCheckpoint);
                      if (isPlacingCheckpoint) {
                        setShowMapModal(false);
                      }
                    }}
                    style={{
                      backgroundColor: isPlacingCheckpoint ? '#3d3a72' : 'transparent',
                      color: isPlacingCheckpoint ? '#ffffff' : '#3d3a72',
                      border: isPlacingCheckpoint ? 'none' : '1px solid #3d3a72',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'opacity 0.2s'
                    }}
                    className="hover:opacity-80"
                  >
                    {isPlacingCheckpoint ? 'Click map to place' : '📍 Place Checkpoint'}
                  </button>
                </div>

                {/* Map Container */}
                <div
                  className="relative border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50"
                  style={{ height: '500px', cursor: isPlacingCheckpoint ? 'crosshair' : 'default' }}
                  onClick={handleMapClick}
                >
                  <img
                    src={selectedMap.url}
                    alt="Walk Map"
                    className="w-full h-full object-contain"
                  />


                  {/* Start point marker */}
                  {selectedMapId && startPointsByMap[selectedMapId] && (
                    <div
                      className="absolute flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full text-sm font-bold shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${startPointsByMap[selectedMapId].x}%`,
                        top: `${startPointsByMap[selectedMapId].y}%`,
                        zIndex: 20
                      }}
                      title="Start Point"
                    >
                      S
                    </div>
                  )}

                  {/* End point marker */}
                  {selectedMapId && endPointsByMap[selectedMapId] && (
                    <div
                      className="absolute flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full text-sm font-bold shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${endPointsByMap[selectedMapId].x}%`,
                        top: `${endPointsByMap[selectedMapId].y}%`,
                        zIndex: 20
                      }}
                      title="End Point"
                    >
                      E
                    </div>
                  )}

                  {/* Checkpoint markers */}
                  {currentMapCheckpoints.map((checkpoint) => checkpoint.mapPosition && (
                    <div
                      key={checkpoint.checkpointId}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${checkpoint.mapPosition.x}%`,
                        top: `${checkpoint.mapPosition.y}%`,
                      }}
                    >
                      <div
                        className="relative group cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCheckpoint(checkpoint);
                          setCheckpointName(checkpoint.name);
                          setCheckpointDescription(checkpoint.description);
                          setCheckpointLocation(checkpoint.location.name);
                          setVerificationType(checkpoint.verificationType);
                          setChecks(checkpoint.checks.map(check => ({
                            question: check.question,
                            type: check.type,
                            required: check.required,
                            scoreValue: check.scoreValue || 10
                          })));
                          setCheckpointMapPosition(checkpoint.mapPosition || null);
                          setShowMapModal(false);
                          setShowCheckpointEditor(true);
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                          style={{ backgroundColor: '#3d3a72' }}
                        >
                          {getCheckpointGlobalIndex(checkpoint.checkpointId)}
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {checkpoint.name}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isPlacingCheckpoint && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg">
                        Click anywhere on the map to place a checkpoint
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
                <button
                  onClick={() => setShowMapModal(false)}
                  style={{
                    backgroundColor: '#e77726',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className="hover:opacity-80"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input - always present at root level */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleMapUpload}
        className="hidden"
        style={{ display: 'none' }}
      />
    </div>
  );
}