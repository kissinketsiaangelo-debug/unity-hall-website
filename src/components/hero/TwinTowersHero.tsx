'use client';

import * as React from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, Stars, Float, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';

interface TwinTowersHeroProps {
  className?: string;
}

function TwinTowersScene() {
  const groupRef = React.useRef<THREE.Group>(null);
  const towerARef = React.useRef<THREE.Mesh>(null);
  const towerBRef = React.useRef<THREE.Mesh>(null);
  const courtRef = React.useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  React.useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = -0.15;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = -0.15 + Math.sin(time * 0.15) * 0.08;
    }
    
    if (towerARef.current) {
      towerARef.current.position.y = Math.sin(time * 1.2) * 0.02;
      towerARef.current.scale.y = 1 + Math.sin(time * 2) * 0.005;
    }
    
    if (towerBRef.current) {
      towerBRef.current.position.y = Math.cos(time * 1.2) * 0.02;
      towerBRef.current.scale.y = 1 + Math.cos(time * 2) * 0.005;
    }
    
    if (courtRef.current) {
      (courtRef.current.material as THREE.MeshStandardMaterial).opacity = 0.15 + Math.sin(time * 1.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={towerARef} position={[-4, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 12, 3]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            roughness={0.7}
            metalness={0.1}
            transparent
            opacity={0.95}
          />
        </mesh>
      </Float>
      
      <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={towerBRef} position={[4, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 12, 3]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            roughness={0.7}
            metalness={0.1}
            transparent
            opacity={0.95}
          />
        </mesh>
      </Float>

      <mesh position={[0, -5.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[14, 0.5, 10]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.9} metalness={0} />
      </mesh>

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh ref={courtRef} position={[0, -5.2, 0]} castShadow receiveShadow>
          <planeGeometry args={[8, 6]} />
          <meshStandardMaterial 
            color="#B8001F" 
            transparent 
            opacity={0.2}
            side={2}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
      </Float>

      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow color="#fff5e6" />
      <directionalLight position={[-10, 15, -10]} intensity={0.8} color="#ff6b35" />
      <pointLight position={[0, 8, 0]} intensity={0.5} color="#B8001F" distance={30} decay={2} />
      <hemisphereLight args={['#87ceeb', '#2d2d2d', 0.6]} />
    </group>
  );
}

function CameraController() {
  const { camera } = useThree();
  
  React.useEffect(() => {
    camera.position.set(0, 3, 18);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

export function TwinTowersHero({ className }: TwinTowersHeroProps) {
  return (
    <div className={cn('relative w-full h-[90vh] min-h-[600px] max-h-[900px] overflow-hidden', className)}>
      <Canvas
        camera={{ position: [0, 3, 18], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        style={{ touchAction: 'none' }}
      >
        <color attach="background" args={["#0d0d0d"]} />
        <fog attach="fog" args={["#0d0d0d", 5, 50]} />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} />
        
        <TwinTowersScene />
        <CameraController />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.3}
          minPolarAngle={0.3}
          maxPolarAngle={1.2}
          minZoom={0.8}
          maxZoom={2.5}
          target={[0, -1, 0]}
        />
      </Canvas>
      
      <div className="absolute inset-0 bg-gradient-to-t from-knust-charcoal/90 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0d0d0d_100%)] pointer-events-none" />
    </div>
  );
}

import { cn } from '@/lib/utils';