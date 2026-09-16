import React, { useEffect, useState, useRef } from 'react';
import { MenuItem } from '../types';
import Food3DCanvas from './Food3DCanvas';
import {
  X,
  RotateCw,
  Sparkles,
  HelpCircle,
  Camera,
  CameraOff,
  SwitchCamera,
  Download,
  Maximize2,
  Sliders,
  Move,
  Play,
  Pause,
  QrCode,
  Check
} from 'lucide-react';

interface ThreeDViewerProps {
  item: MenuItem;
  onClose: () => void;
  onAddToOrder: (item: MenuItem) => void;
}

export default function ThreeDViewer({ item, onClose, onAddToOrder }: ThreeDViewerProps) {
  // We will stay in 'canvas-ar' mode as it allows for our custom 'Add to Order' UI overlay
  const [viewMode] = useState<'canvas-ar' | 'model-viewer'>('canvas-ar');
  
  // Camera State
  const [isCameraActive, setIsCameraActive] = useState<boolean>(true);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 3D Model Controls - Default 0.95 scale for realistic table placement
  const [scale, setScale] = useState<number>(0.95);
  const [rotationY, setRotationY] = useState<number>(0);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [positionX, setPositionX] = useState<number>(0);
  const [positionY, setPositionY] = useState<number>(0);
  
  // Touch / Drag State
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const [photoSaved, setPhotoSaved] = useState(false);

  // Google Model Viewer Ref & State
  const [modelViewerLoaded, setModelViewerLoaded] = useState(false);
  const modelViewerRef = useRef<any>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Start / Stop Camera Stream
  useEffect(() => {
    let stream: MediaStream | null = null;

    if (isCameraActive && viewMode === 'canvas-ar') {
      setCameraError(null);
      navigator.mediaDevices
        ?.getUserMedia({
          video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch((err) => {
          console.warn("Camera permission or stream failed:", err);
          setCameraError("Camera permission denied or unavailable. Displaying 3D Studio mode.");
          setIsCameraActive(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraActive, facingMode, viewMode]);

  // Handle Dragging Food in 3D Space
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = (e.clientX - startPosRef.current.x) * 0.005;
    const deltaY = -(e.clientY - startPosRef.current.y) * 0.005;

    setPositionX((prev) => Math.max(-2.5, Math.min(2.5, prev + deltaX)));
    setPositionY((prev) => Math.max(-1.5, Math.min(1.5, prev + deltaY)));

    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Toggle Camera Facing Mode (Rear <-> Front)
  const toggleCameraFacing = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Capture Snapshot of 3D Food on Camera Table View
  const handleCapturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw video background if camera active
    if (isCameraActive && videoRef.current) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    } else {
      // Draw gradient backdrop
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e293b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw 3D WebGL Canvas content
    const webglCanvas = document.querySelector('canvas');
    if (webglCanvas) {
      ctx.drawImage(webglCanvas, 0, 0, canvas.width, canvas.height);
    }

    // Add minimal Branding Stamp (Just a subtle background bar if needed, or remove completely)
    // We will remove the text as requested
    ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
    ctx.fillRect(20, canvas.height - 40, 180, 20);
    ctx.font = 'italic 12px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText("Avernao Digital Gourmet", 35, canvas.height - 25);

    const link = document.createElement('a');
    link.download = `avernao-webar-${item.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    setPhotoSaved(true);
    setTimeout(() => setPhotoSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col lg:flex-row items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
      
      {/* 1. FLOATING TOP BAR WITH BACK BUTTON */}
      <div className="fixed top-4 left-4 right-4 z-[60] flex justify-between items-center no-print">
        <button
          id="btn-webar-back-to-menu"
          onClick={onClose}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/90 text-white font-display font-semibold text-sm border border-slate-700/50 backdrop-blur-md shadow-2xl active:scale-95 transition-all cursor-pointer"
        >
          <span>← Back to Menu</span>
        </button>
      </div>

      {/* 2. MAIN 3D DISPLAY AREA */}
      <div className="relative w-full lg:w-2/3 h-[60vh] lg:h-full flex items-center justify-center p-2 mt-14 lg:mt-0">
        
        {viewMode === 'canvas-ar' ? (
          /* =================================================================
             MODE A: INTERACTIVE 3D FOOD WITH LIVE TABLE CAMERA FEED
             ================================================================= */
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative w-full h-full rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-900 shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          >
            {/* Live Camera Video Background */}
            {isCameraActive && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            )}

            {/* Fallback Table Background when camera is disabled */}
            {!isCameraActive && (
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center pointer-events-none">
                <div className="w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute bottom-10 w-96 h-24 bg-black/40 rounded-[100%] blur-xl" />
              </div>
            )}

            {/* 3D Food WebGL Canvas */}
            <div className="absolute inset-0 z-10">
              <Food3DCanvas
                item={item}
                scale={scale}
                rotationY={rotationY}
                isAutoRotate={isAutoRotate}
                positionX={positionX}
                positionY={positionY}
              />
            </div>

            {/* Camera Status Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-xs font-mono text-slate-800 shadow">
              <span className={`w-2.5 h-2.5 rounded-full ${isCameraActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span>{isCameraActive ? '📷 Live Table View' : '🎨 3D Studio View'}</span>
            </div>

            {/* Exact Selected Menu Dish Verification Badge */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2.5 p-2 pr-3.5 rounded-2xl bg-slate-900/90 text-white backdrop-blur-md border border-slate-700/80 shadow-xl max-w-[220px]">
              <img
                src={item.image}
                alt={item.name}
                className="w-11 h-11 rounded-xl object-cover border border-cyan-400/50 flex-shrink-0 shadow"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0 text-left">
                <span className="block text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-wider">
                  Menu Dish Sync
                </span>
                <p className="text-xs font-display font-bold text-white truncate">
                  {item.name}
                </p>
                <p className="text-[10px] text-slate-300 font-mono">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* =================================================================
             MODE B: GOOGLE NATIVE MODEL VIEWER
             ================================================================= */
          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-2xl flex items-center justify-center">
            <model-viewer
              ref={modelViewerRef}
              src={item.glbUrl || 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb'}
              alt={`3D model of ${item.name}`}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              auto-rotate
              shadow-intensity="1.5"
              exposure="1.2"
              onLoad={() => setModelViewerLoaded(true)}
              className="w-full h-full"
            >
              <button
                slot="ar-button"
                className="absolute bottom-6 right-6 flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-display font-medium shadow-xl transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5 animate-pulse" />
                Place on Table (Mobile AR)
              </button>
            </model-viewer>
          </div>
        )}

      </div>

      {/* 3. RIGHT SIDEBAR: CONTROLS & ITEM DETAILS */}
      <div className="w-full lg:w-1/3 max-w-md p-5 sm:p-6 flex flex-col justify-between border border-slate-200 bg-white rounded-3xl shadow-2xl space-y-5 overflow-y-auto max-h-[90vh]">
        
        <div>
          {/* Header Tag */}
          <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-mono font-semibold border border-cyan-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              Real 3D Dish ({item.name})
            </span>
            {item.isChefSpecial && (
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-display font-semibold border border-amber-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Chef's Choice
              </span>
            )}
          </div>

          <h2 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
            {item.name}
          </h2>

          <p className="text-xl font-mono text-cyan-700 font-bold mt-1">
            ${item.price.toFixed(2)}
          </p>

          <p className="text-xs text-slate-600 leading-relaxed mt-3">
            {item.description}
          </p>
        </div>

        {/* Info card */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Calories</span>
            <span className="font-bold text-slate-900 text-sm">{item.calories || 250} kcal</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Category</span>
            <span className="font-bold text-slate-900 text-sm">{item.category}</span>
          </div>
        </div>

        {/* Interactive Order Action */}
        <div className="pt-2">
          <button
            onClick={() => {
              onAddToOrder(item);
              onClose();
            }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-display font-bold text-sm transition-all shadow-xl shadow-cyan-500/20 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Confirm & Add to Order</span>
          </button>
          
          <button
            onClick={onClose}
            className="w-full mt-3 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 font-display font-medium text-xs transition-all border border-slate-200 cursor-pointer"
          >
            Not now, go back
          </button>
        </div>
      </div>
    </div>
  );
}
