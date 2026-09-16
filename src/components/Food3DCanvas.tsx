import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MenuItem } from '../types';

interface Food3DCanvasProps {
  item: MenuItem;
  scale: number;
  rotationY: number;
  isAutoRotate: boolean;
  positionX: number;
  positionY: number;
  onRotationChange?: (rotY: number) => void;
}

export default function Food3DCanvas({
  item,
  scale,
  rotationY,
  isAutoRotate,
  positionX,
  positionY
}: Food3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const foodGroupRef = useRef<THREE.Group | null>(null);
  const steamParticlesRef = useRef<THREE.Mesh[]>([]);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Scene setup with transparent background
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup - Positioned for realistic table top view
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 3.2, 5.8);
    camera.lookAt(0, 0.4, 0);

    // 3. WebGL Renderer with alpha transparency & shadow map
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // 4. Studio Lighting Configuration (High-End Restaurant Style)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1.5);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    // Warm Key Light
    const mainLight = new THREE.DirectionalLight(0xfff5e6, 3.5);
    mainLight.position.set(5, 10, 7.5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 30;
    mainLight.shadow.bias = -0.0001;
    scene.add(mainLight);

    // Cool Rim Light for depth
    const rimLight = new THREE.PointLight(0x7dd3fc, 2.5, 20);
    rimLight.position.set(-5, 5, -5);
    scene.add(rimLight);

    // Food Highlight Point Light
    const highlightLight = new THREE.PointLight(0xffffff, 1.8, 15);
    highlightLight.position.set(0, 4, 3);
    scene.add(highlightLight);

    // Environment Map (Simulated Luxury Dining Room)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = new THREE.CubeTextureLoader()
      .setPath('https://threejs.org/examples/textures/cube/Park2/')
      .load(['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'], (tex) => {
        const envMap = pmremGenerator.fromCubemap(tex).texture;
        scene.environment = envMap;
        tex.dispose();
        pmremGenerator.dispose();
      });

    // 5. Contact Shadow Plane (Simulates real tabletop shadow)
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.02;
    scene.add(shadowMesh);

    // 6. Food Master Group
    const foodGroup = new THREE.Group();
    foodGroupRef.current = foodGroup;
    scene.add(foodGroup);

    // Clear steam array
    steamParticlesRef.current = [];

    // Build Real Custom 3D Model for Selected Menu Item
    buildReal3DFoodModel(foodGroup, item, steamParticlesRef);

    // 7. Interactive 360° Orbit Controls (Mouse Drag & Touch Gesture)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.9;
    controls.enableZoom = true;
    controls.minDistance = 2.2;
    controls.maxDistance = 10.0;
    controls.target.set(0, 0.4, 0);
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Keep above tabletop

    // 8. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      controls.update();

      if (foodGroupRef.current) {
        foodGroupRef.current.scale.set(scale, scale, scale);
        foodGroupRef.current.position.x = positionX;
        foodGroupRef.current.position.y = positionY;
      }

      // Animate Steam Particles for hot dishes
      if (steamParticlesRef.current.length > 0) {
        steamParticlesRef.current.forEach((p) => {
          p.position.y += 0.006;
          p.scale.addScalar(0.002);
          (p.material as THREE.MeshBasicMaterial).opacity -= 0.005;

          if ((p.material as THREE.MeshBasicMaterial).opacity <= 0) {
            p.position.y = 1.0 + Math.random() * 0.2;
            p.position.x = (Math.random() - 0.5) * 0.6;
            p.position.z = (Math.random() - 0.5) * 0.6;
            p.scale.set(0.15, 0.15, 0.15);
            (p.material as THREE.MeshBasicMaterial).opacity = 0.35;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [item, isAutoRotate]);

  // Update props smoothly
  useEffect(() => {
    if (foodGroupRef.current) {
      foodGroupRef.current.scale.set(scale, scale, scale);
      foodGroupRef.current.rotation.y = rotationY;
      foodGroupRef.current.position.x = positionX;
      foodGroupRef.current.position.y = positionY;
    }
  }, [scale, rotationY, positionX, positionY]);

  return <div ref={mountRef} className="w-full h-full" />;
}

// ============================================================================
// REAL 3D FOOD MODEL BUILDER (Customized dynamically per clicked item)
// ============================================================================
function buildReal3DFoodModel(
  group: THREE.Group,
  item: MenuItem,
  steamArrayRef: React.MutableRefObject<THREE.Mesh[]>
) {
  const cat = item.category;
  const nameLower = item.name.toLowerCase();
  const textureLoader = new THREE.TextureLoader();

  // Load the clicked item's exact photo as a high-resolution 3D texture with anisotropic filtering
  const foodTexture = textureLoader.load(item.image, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 16;
    tex.generateMipmaps = true;
    tex.needsUpdate = true;
  });

  // Create a bump map from the same texture to simulate surface depth
  const bumpMap = foodTexture.clone();
  bumpMap.needsUpdate = true;

  // Create Flag Toothpick Label with Item Name & Price
  createItemNameToothpickFlag(group, item.name, item.price);

  if (cat === 'Drinks') {
    // 🍹 DRINKS & BEVERAGES 3D MODEL
    buildRealDrinkModel(group, item, nameLower, foodTexture);
  } else if (cat === 'Pizza') {
    // 🍕 PIZZA 3D MODEL WITH ITEM PHOTO TOPPING
    buildRealPizzaModel(group, item, foodTexture, bumpMap, steamArrayRef);
  } else if (cat === 'Burgers') {
    // 🍔 BURGER 3D MODEL
    buildRealBurgerModel(group, item, foodTexture, bumpMap, steamArrayRef);
  } else if (cat === 'Desserts') {
    // 🍰 DESSERT 3D MODEL
    buildRealDessertModel(group, item, foodTexture, bumpMap);
  } else {
    // 🍽️ MAINS, PASTAS, SALADS, FRUITS, & OTHERS
    buildRealPlateDishModel(group, item, foodTexture, bumpMap, steamArrayRef);
  }
}

// ----------------------------------------------------------------------------
// 1. DRINKS MODEL (Smoothies, Coffees, Cocktails)
// ----------------------------------------------------------------------------
function buildRealDrinkModel(
  group: THREE.Group,
  item: MenuItem,
  nameLower: string,
  foodTexture: THREE.Texture
) {
  // A. Coaster Base
  const coasterGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.08, 32);
  const coasterMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.1,
    metalness: 0.8,
    envMapIntensity: 1.5
  });
  const coaster = new THREE.Mesh(coasterGeo, coasterMat);
  coaster.position.y = 0.04;
  coaster.receiveShadow = true;
  coaster.castShadow = true;
  group.add(coaster);

  // B. Glassware
  const glassGeo = new THREE.CylinderGeometry(1.1, 0.85, 2.8, 32, 1, true);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.15,
    roughness: 0.02,
    metalness: 0.1,
    transmission: 0.98,
    ior: 1.52,
    thickness: 0.5,
    specularIntensity: 1.0,
    envMapIntensity: 2.0,
    side: THREE.DoubleSide
  });
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.y = 1.48;
  group.add(glass);

  // Glass Base Solid
  const glassBaseGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.2, 32);
  const glassBase = new THREE.Mesh(glassBaseGeo, glassMat);
  glassBase.position.y = 0.15;
  group.add(glassBase);

  // C. Liquid Color
  let liquidColor = 0xf59e0b; // Default amber citrus
  if (nameLower.includes('berry') || nameLower.includes('strawberry') || nameLower.includes('sunset')) {
    liquidColor = 0xe11d48;
  } else if (nameLower.includes('matcha') || nameLower.includes('mojito') || nameLower.includes('mint') || nameLower.includes('kiwi')) {
    liquidColor = 0x10b981;
  } else if (nameLower.includes('mango') || nameLower.includes('orange') || nameLower.includes('passion')) {
    liquidColor = 0xf59e0b;
  } else if (nameLower.includes('coffee') || nameLower.includes('latte') || nameLower.includes('espresso') || nameLower.includes('chocolate')) {
    liquidColor = 0x78350f;
  } else if (nameLower.includes('blue') || nameLower.includes('ocean')) {
    liquidColor = 0x0284c7;
  }

  const liquidGeo = new THREE.CylinderGeometry(1.05, 0.82, 2.4, 32);
  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: liquidColor,
    roughness: 0.1,
    metalness: 0.0,
    transmission: 0.5,
    transparent: true,
    opacity: 0.9,
    envMapIntensity: 1.2
  });
  const liquid = new THREE.Mesh(liquidGeo, liquidMat);
  liquid.position.y = 1.3;
  group.add(liquid);

  // D. Drink Top Surface with Item Photo (Foam / Drink Topping)
  const topDiscGeo = new THREE.CylinderGeometry(1.04, 1.04, 0.06, 32);
  const topDiscMat = new THREE.MeshPhysicalMaterial({
    map: foodTexture,
    roughness: 0.5,
    clearcoat: 0.3,
    clearcoatRoughness: 0.1
  });
  const topDisc = new THREE.Mesh(topDiscGeo, topDiscMat);
  topDisc.position.y = 2.51;
  group.add(topDisc);

  // E. Ice Cubes Inside Glass
  const iceGeo = new THREE.BoxGeometry(0.42, 0.42, 0.42);
  const iceMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.75,
    roughness: 0.1,
    transmission: 0.85
  });
  for (let i = 0; i < 5; i++) {
    const ice = new THREE.Mesh(iceGeo, iceMat);
    ice.position.set(
      (Math.random() - 0.5) * 0.7,
      1.2 + i * 0.28,
      (Math.random() - 0.5) * 0.7
    );
    ice.rotation.set(Math.random(), Math.random(), Math.random());
    group.add(ice);
  }

  // F. Drinking Straw
  const strawGeo = new THREE.CylinderGeometry(0.06, 0.06, 3.4, 16);
  const strawMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    roughness: 0.3
  });
  const straw = new THREE.Mesh(strawGeo, strawMat);
  straw.position.set(0.25, 1.85, 0.15);
  straw.rotation.z = -0.22;
  group.add(straw);

  // G. Fruit Slice Garnish on Glass Rim
  const fruitGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 24, 1, false, 0, Math.PI);
  const fruitMat = new THREE.MeshStandardMaterial({
    color: liquidColor,
    roughness: 0.3
  });
  const fruit = new THREE.Mesh(fruitGeo, fruitMat);
  fruit.position.set(-0.9, 2.5, 0);
  fruit.rotation.z = Math.PI / 3;
  group.add(fruit);
}

// ----------------------------------------------------------------------------
// 2. PIZZA MODEL (With Real Item Texture & Toppings)
// ----------------------------------------------------------------------------
function buildRealPizzaModel(
  group: THREE.Group,
  item: MenuItem,
  foodTexture: THREE.Texture,
  bumpMap: THREE.Texture,
  steamArrayRef: React.MutableRefObject<THREE.Mesh[]>
) {
  // A. Wooden Pizza Paddle Board
  const peelGeo = new THREE.CylinderGeometry(2.4, 2.3, 0.12, 48);
  const peelMat = new THREE.MeshStandardMaterial({
    color: 0xb4783c,
    roughness: 0.7,
    metalness: 0.1
  });
  const peel = new THREE.Mesh(peelGeo, peelMat);
  peel.position.y = 0.06;
  peel.receiveShadow = true;
  peel.castShadow = true;
  group.add(peel);

  // Handle for Pizza Paddle
  const handleGeo = new THREE.BoxGeometry(0.4, 0.1, 1.5);
  const handle = new THREE.Mesh(handleGeo, peelMat);
  handle.position.set(0, 0.05, 2.6);
  group.add(handle);

  // B. Outer Crispy Crust Ring
  const crustGeo = new THREE.TorusGeometry(1.95, 0.28, 16, 48);
  const crustMat = new THREE.MeshPhysicalMaterial({
    color: 0xd99b4e,
    roughness: 0.85,
    clearcoat: 0.1,
    clearcoatRoughness: 0.5
  });
  const crust = new THREE.Mesh(crustGeo, crustMat);
  crust.rotation.x = Math.PI / 2;
  crust.position.y = 0.22;
  crust.castShadow = true;
  group.add(crust);

  // C. Main Pizza Surface mapped with REAL ITEM IMAGE PHOTO!
  // Use a slight displacement simulation by using a very thin cylinder with slight noise-like scale
  const pizzaSurfaceGeo = new THREE.CylinderGeometry(1.95, 1.95, 0.15, 48);
  const pizzaSurfaceMat = new THREE.MeshPhysicalMaterial({
    map: foodTexture,
    bumpMap: bumpMap,
    bumpScale: 0.05,
    roughness: 0.4,
    metalness: 0.05,
    clearcoat: 0.2,
    clearcoatRoughness: 0.3,
    envMapIntensity: 0.8
  });
  const pizzaSurface = new THREE.Mesh(pizzaSurfaceGeo, pizzaSurfaceMat);
  pizzaSurface.position.y = 0.18;
  pizzaSurface.castShadow = true;
  group.add(pizzaSurface);

  // D. 3D Basil & Pepperoni Accents on Top
  const basilMat = new THREE.MeshStandardMaterial({
    color: 0x228b22,
    roughness: 0.5,
    side: THREE.DoubleSide
  });
  const basilGeo = new THREE.PlaneGeometry(0.35, 0.5);
  for (let i = 0; i < 6; i++) {
    const leaf = new THREE.Mesh(basilGeo, basilMat);
    const angle = (i / 6) * Math.PI * 2;
    const dist = 0.95;
    leaf.position.set(Math.cos(angle) * dist, 0.22, Math.sin(angle) * dist);
    leaf.rotation.x = -Math.PI / 2 + (Math.random() * 0.2 - 0.1);
    leaf.rotation.z = Math.random() * Math.PI;
    group.add(leaf);
  }

  // Create Steam
  create3DSteamParticles(group, steamArrayRef);
}

// ----------------------------------------------------------------------------
// 3. BURGER MODEL
// ----------------------------------------------------------------------------
function buildRealBurgerModel(
  group: THREE.Group,
  item: MenuItem,
  foodTexture: THREE.Texture,
  bumpMap: THREE.Texture,
  steamArrayRef: React.MutableRefObject<THREE.Mesh[]>
) {
  // A. Slate Serving Platter Board
  const slateGeo = new THREE.BoxGeometry(3.8, 0.1, 3.8);
  const slateMat = new THREE.MeshStandardMaterial({
    color: 0x1f2937,
    roughness: 0.8,
    metalness: 0.2
  });
  const slate = new THREE.Mesh(slateGeo, slateMat);
  slate.position.y = 0.05;
  slate.receiveShadow = true;
  slate.castShadow = true;
  group.add(slate);

  // B. Bottom Brioche Bun
  const bunBottomGeo = new THREE.CylinderGeometry(1.35, 1.25, 0.35, 32);
  const bunMat = new THREE.MeshStandardMaterial({
    color: 0xde9b4d,
    roughness: 0.6
  });
  const bunBottom = new THREE.Mesh(bunBottomGeo, bunMat);
  bunBottom.position.y = 0.27;
  bunBottom.castShadow = true;
  group.add(bunBottom);

  // C. Fresh Lettuce Ribs
  const lettuceGeo = new THREE.CylinderGeometry(1.58, 1.5, 0.08, 32);
  const lettuceMat = new THREE.MeshStandardMaterial({
    color: 0x32cd32,
    roughness: 0.7
  });
  const lettuce = new THREE.Mesh(lettuceGeo, lettuceMat);
  lettuce.position.y = 0.48;
  lettuce.castShadow = true;
  group.add(lettuce);

  // D. Juicy Burger Patty
  const pattyGeo = new THREE.CylinderGeometry(1.45, 1.45, 0.45, 32);
  const pattyMat = new THREE.MeshPhysicalMaterial({
    color: item.name.toLowerCase().includes('chicken') ? 0x8b5a2b : 0x3d1a0a,
    roughness: 0.9,
    clearcoat: 0.1,
    envMapIntensity: 0.5
  });
  const patty = new THREE.Mesh(pattyGeo, pattyMat);
  patty.position.y = 0.72;
  patty.castShadow = true;
  group.add(patty);

  // E. Melted Gold Cheddar Cheese
  const cheeseGeo = new THREE.BoxGeometry(2.1, 0.08, 2.1);
  const cheeseMat = new THREE.MeshPhysicalMaterial({
    color: 0xffb703,
    roughness: 0.3,
    clearcoat: 0.2,
    envMapIntensity: 1.0
  });
  const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
  cheese.position.y = 0.96;
  cheese.rotation.y = Math.PI / 4;
  cheese.castShadow = true;
  group.add(cheese);

  // F. REAL SELECTED MENU DISH PHOTO DISPLAY DISC
  const photoDiscGeo = new THREE.CylinderGeometry(1.32, 1.32, 0.15, 32);
  const photoDiscMat = new THREE.MeshPhysicalMaterial({
    map: foodTexture,
    bumpMap: bumpMap,
    bumpScale: 0.08,
    roughness: 0.4,
    metalness: 0.05,
    clearcoat: 0.3,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.2
  });
  const photoDisc = new THREE.Mesh(photoDiscGeo, photoDiscMat);
  photoDisc.position.y = 1.04;
  photoDisc.castShadow = true;
  group.add(photoDisc);

  // G. Golden Bun Rim Collar (Frames the exact dish photo)
  const bunRimGeo = new THREE.TorusGeometry(1.32, 0.15, 16, 32);
  const bunRim = new THREE.Mesh(bunRimGeo, bunMat);
  bunRim.rotation.x = Math.PI / 2;
  bunRim.position.y = 1.02;
  bunRim.castShadow = true;
  group.add(bunRim);

  // Sesame Seeds on Bun Rim Frame
  const seedGeo = new THREE.ConeGeometry(0.035, 0.07, 8);
  const seedMat = new THREE.MeshBasicMaterial({ color: 0xfffdf0 });
  for (let i = 0; i < 18; i++) {
    const seed = new THREE.Mesh(seedGeo, seedMat);
    const angle = (i / 18) * Math.PI * 2;
    seed.position.set(
      Math.cos(angle) * 1.32,
      1.12,
      Math.sin(angle) * 1.32
    );
    seed.rotation.x = Math.PI / 2;
    group.add(seed);
  }

  // Side French Fries Portion
  buildSideFriesBasket(group);

  // Create Steam for Hot Burger
  create3DSteamParticles(group, steamArrayRef);
}

// ----------------------------------------------------------------------------
// 4. DESSERT MODEL
// ----------------------------------------------------------------------------
function buildRealDessertModel(
  group: THREE.Group,
  item: MenuItem,
  foodTexture: THREE.Texture,
  bumpMap: THREE.Texture
) {
  // A. Fine Porcelain Gold Rim Plate
  const plateGeo = new THREE.CylinderGeometry(2.2, 2.0, 0.1, 48);
  const plateMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.1,
    metalness: 0.15
  });
  const plate = new THREE.Mesh(plateGeo, plateMat);
  plate.position.y = 0.05;
  plate.receiveShadow = true;
  plate.castShadow = true;
  group.add(plate);

  // Gold Rim
  const rimGeo = new THREE.TorusGeometry(2.18, 0.04, 12, 48);
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.85,
    roughness: 0.2
  });
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.1;
  group.add(rim);

  // B. Cake / Dessert Base
  const dessertGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.8, 32);
  const dessertMat = new THREE.MeshStandardMaterial({
    color: 0x3d1a08,
    roughness: 0.5
  });
  const dessert = new THREE.Mesh(dessertGeo, dessertMat);
  dessert.position.y = 0.5;
  dessert.castShadow = true;
  group.add(dessert);

  // C. Real Food Photo Texture Top Face!
  const topFaceGeo = new THREE.CylinderGeometry(1.41, 1.41, 0.12, 32);
  const topFaceMat = new THREE.MeshPhysicalMaterial({
    map: foodTexture,
    bumpMap: bumpMap,
    bumpScale: 0.06,
    roughness: 0.2,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.5
  });
  const topFace = new THREE.Mesh(topFaceGeo, topFaceMat);
  topFace.position.y = 0.94;
  topFace.castShadow = true;
  group.add(topFace);

  // D. Strawberry / Topping decoration
  const berryGeo = new THREE.SphereGeometry(0.35, 16, 16);
  berryGeo.scale(1, 1.4, 1);
  const berryMat = new THREE.MeshPhysicalMaterial({
    color: 0xe11d48,
    roughness: 0.1,
    clearcoat: 1.0,
    envMapIntensity: 1.5
  });
  const berry = new THREE.Mesh(berryGeo, berryMat);
  berry.position.set(0, 1.25, 0);
  berry.castShadow = true;
  group.add(berry);
}

// ----------------------------------------------------------------------------
// 5. GENERAL DISH / MAINS / PASTAS / SALADS / FRUITS
// ----------------------------------------------------------------------------
function buildRealPlateDishModel(
  group: THREE.Group,
  item: MenuItem,
  foodTexture: THREE.Texture,
  bumpMap: THREE.Texture,
  steamArrayRef: React.MutableRefObject<THREE.Mesh[]>
) {
  // A. Luxury Ceramic Restaurant Plate
  const plateGeo = new THREE.CylinderGeometry(2.3, 1.8, 0.18, 48);
  const plateMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.05,
    metalness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    envMapIntensity: 2.0
  });
  const plate = new THREE.Mesh(plateGeo, plateMat);
  plate.position.y = 0.07;
  plate.receiveShadow = true;
  plate.castShadow = true;
  group.add(plate);

  // Golden/Cyan Outer Ring Accent
  const rimGeo = new THREE.TorusGeometry(2.28, 0.05, 12, 48);
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 2.0
  });
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.18;
  group.add(rim);

  // B. Textured Curved Food Mound with REAL ITEM IMAGE PHOTO!
  // Higher segments for smoother organic look
  const foodMoundGeo = new THREE.SphereGeometry(1.9, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.45);
  const foodMoundMat = new THREE.MeshPhysicalMaterial({
    map: foodTexture,
    bumpMap: bumpMap,
    bumpScale: 0.12,
    roughness: 0.35,
    clearcoat: 0.2,
    clearcoatRoughness: 0.4,
    envMapIntensity: 1.0
  });
  const foodMound = new THREE.Mesh(foodMoundGeo, foodMoundMat);
  foodMound.position.y = 0.12;
  foodMound.castShadow = true;
  group.add(foodMound);

  // C. Fresh Garnish Sprigs (Parsley/Mint Leaves)
  const garnishMat = new THREE.MeshStandardMaterial({
    color: 0x15803d,
    roughness: 0.5,
    side: THREE.DoubleSide
  });
  const garnishGeo = new THREE.PlaneGeometry(0.3, 0.4);
  for (let i = 0; i < 4; i++) {
    const leaf = new THREE.Mesh(garnishGeo, garnishMat);
    const angle = (i / 4) * Math.PI * 2 + 0.4;
    leaf.position.set(Math.cos(angle) * 0.6, 0.65, Math.sin(angle) * 0.6);
    leaf.rotation.x = -Math.PI / 3;
    leaf.rotation.z = Math.random() * Math.PI;
    group.add(leaf);
  }

  // Create Steam
  create3DSteamParticles(group, steamArrayRef);
}

// ----------------------------------------------------------------------------
// HELPER: CREATE ITEM NAME TOOTHPICK FLAG
// ----------------------------------------------------------------------------
function createItemNameToothpickFlag(group: THREE.Group, name: string, price: number) {
  // Toothpick Wooden Stick
  const stickGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.8, 12);
  const stickMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.8 });
  const stick = new THREE.Mesh(stickGeo, stickMat);
  stick.position.set(-1.2, 1.1, 0.8);
  stick.rotation.z = -0.15;
  group.add(stick);

  // Flag Canvas Label
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 120;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Flag Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 300, 120);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(1, '#1e293b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 300, 120);

    // Cyan Border
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, 294, 114);

    // Food Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(name.length > 18 ? name.substring(0, 16) + '...' : name, 15, 45);

    // Price Badge
    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(`$${price.toFixed(2)}`, 15, 88);

    // AR Tag
    ctx.fillStyle = '#a855f7';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText("3D REAL", 200, 88);
  }

  const flagTex = new THREE.CanvasTexture(canvas);
  flagTex.colorSpace = THREE.SRGBColorSpace;
  const flagGeo = new THREE.PlaneGeometry(0.9, 0.45);
  const flagMat = new THREE.MeshBasicMaterial({
    map: flagTex,
    side: THREE.DoubleSide,
    transparent: true
  });
  const flag = new THREE.Mesh(flagGeo, flagMat);
  flag.position.set(-0.8, 1.65, 0.8);
  flag.rotation.y = Math.PI / 6;
  group.add(flag);
}

// ----------------------------------------------------------------------------
// HELPER: SIDE FRIES BASKET
// ----------------------------------------------------------------------------
function buildSideFriesBasket(group: THREE.Group) {
  const basketGeo = new THREE.CylinderGeometry(0.6, 0.5, 0.6, 16);
  const basketMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.8,
    roughness: 0.2
  });
  const basket = new THREE.Mesh(basketGeo, basketMat);
  basket.position.set(1.5, 0.35, 1.2);
  basket.castShadow = true;
  group.add(basket);

  // Fry Sticks
  const fryGeo = new THREE.BoxGeometry(0.1, 0.8, 0.1);
  const fryMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4 });
  for (let i = 0; i < 12; i++) {
    const fry = new THREE.Mesh(fryGeo, fryMat);
    fry.position.set(
      1.5 + (Math.random() - 0.5) * 0.4,
      0.65 + Math.random() * 0.2,
      1.2 + (Math.random() - 0.5) * 0.4
    );
    fry.rotation.set(Math.random() * 0.4, Math.random(), Math.random() * 0.4);
    group.add(fry);
  }
}

// ----------------------------------------------------------------------------
// HELPER: CREATE 3D STEAM PARTICLES FOR HOT DISHES
// ----------------------------------------------------------------------------
function create3DSteamParticles(
  group: THREE.Group,
  steamArrayRef: React.MutableRefObject<THREE.Mesh[]>
) {
  const steamGeo = new THREE.SphereGeometry(0.12, 12, 12);
  const steamMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.3
  });

  for (let i = 0; i < 6; i++) {
    const p = new THREE.Mesh(steamGeo, steamMat.clone());
    p.position.set(
      (Math.random() - 0.5) * 0.6,
      0.8 + Math.random() * 0.5,
      (Math.random() - 0.5) * 0.6
    );
    group.add(p);
    steamArrayRef.current.push(p);
  }
}
