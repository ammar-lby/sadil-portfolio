import { Suspense, useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import { styles } from "../styles";

const ControlToggle = ({ isEnabled, setIsEnabled }) => {
  return (
    <button
      className="absolute top-4 right-4 bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full 
                 text-gray-700 text-sm shadow-lg border border-white/50 z-20 
                 active:scale-95 transition-transform"
      onClick={() => setIsEnabled(!isEnabled)}
    >
      {isEnabled ? '🔒 Lock View' : '🔓 Enable View'}
    </button>
  );
};

const Cloud = ({ startPosition }) => {
  const cloudRef = useRef();

  useFrame(() => {
    if (cloudRef.current) {
      // Simpler, more stylized movement
      cloudRef.current.position.x -= 0.01;
      if (cloudRef.current.position.x < -35) {
        cloudRef.current.position.x = 35;
      }
    }
  });

  const createCloudPart = () => {
    const group = new THREE.Group();

    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      flatShading: true,
    });

    // Simplified cloud shape
    const shapes = [
      { pos: [0, 0, 0], scale: 0.5 },
      { pos: [0.3, 0.1, 0], scale: 0.4 },
      { pos: [-0.3, 0.1, 0], scale: 0.45 },
      { pos: [0, 0.2, 0], scale: 0.35 },
    ];

    shapes.forEach(({ pos, scale }) => {
      const geometry = new THREE.SphereGeometry(1, 8, 8);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...pos);
      mesh.scale.setScalar(scale);
      group.add(mesh);
    });

    const isMobile = window.innerWidth < 768;
    group.scale.setScalar(isMobile ? 0.55 : 0.8);

    return group;
  };

  return <primitive ref={cloudRef} object={createCloudPart()} position={startPosition} />;
};

const CloudField = ({ positions }) => {
  const groupRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.copy(camera.position);
      groupRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group ref={groupRef}>
      {positions.map((position, index) => (
        <Cloud key={index} startPosition={position} />
      ))}
    </group>
  );
};

const CarrotShip = () => {
  const groupRef = useRef();

  const carrotMaterial = useMemo(
    () => new THREE.MeshPhongMaterial({ color: 0xff6b3d, shininess: 30 }),
    []
  );
  const leavesMaterial = useMemo(
    () => new THREE.MeshPhongMaterial({ color: 0x2d9645, shininess: 20 }),
    []
  );
  const furMaterial = useMemo(
    () => new THREE.MeshPhongMaterial({ color: 0xf5f5f5, shininess: 10 }),
    []
  );
  const noseMaterial = useMemo(
    () => new THREE.MeshPhongMaterial({ color: 0xff9999 }),
    []
  );
  const eyeMaterial = useMemo(
    () => new THREE.MeshPhongMaterial({ color: 0x222222 }),
    []
  );

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child.geometry) {
          child.geometry.computeBoundingSphere();
        }
      });
    }
  }, []);

  const isMobile = window.innerWidth < 768;

  return (
    <group ref={groupRef} scale={isMobile ? 0.55 : 0.8}>
      {/* Carrot Body */}
      <mesh material={carrotMaterial} rotation={[0, 0, Math.PI / 2]} position={[0.6, 0, 0]}>
        <coneGeometry args={[1.6, 4.6, 10]} />
      </mesh>

      {/* Leaves */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          material={leavesMaterial}
          position={[2.95, 0.15 * (i - 3.5), 0]}
          rotation={[-Math.PI / 5, (Math.PI / 4) * (i - 3.5), Math.PI / 2]}
        >
          <coneGeometry args={[0.35, 2.4, 6]} />
        </mesh>
      ))}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={`small-${i}`}
          material={leavesMaterial}
          position={[2.75, 0.12 * (i - 2.5), 0]}
          rotation={[-Math.PI / 4, (Math.PI / 3.5) * (i - 2.5), Math.PI / 2]}
        >
          <coneGeometry args={[0.25, 1.6, 6]} />
        </mesh>
      ))}

      {/* Bunny Body */}
      <mesh material={furMaterial} position={[-0.5, 0.8, 0]} scale={[1, 1.2, 0.8]}>
        <sphereGeometry args={[0.6, 10, 10]} />
      </mesh>

      {/* Bunny Head */}
      <mesh material={furMaterial} position={[-0.8, 1.4, 0]} scale={[0.8, 0.9, 0.7]}>
        <sphereGeometry args={[0.5, 10, 10]} />
      </mesh>

      {/* Bunny Ears */}
      {[-0.2, 0.2].map((z, i) => (
        <mesh
          key={i}
          material={furMaterial}
          position={[-0.9, 2, z]}
          rotation={[i === 0 ? -Math.PI / 8 : Math.PI / 8, 0, 0]}
        >
          <cylinderGeometry args={[0.1, 0.15, 1, 6]} />
        </mesh>
      ))}

      {/* Bunny Face */}
      <mesh material={noseMaterial} position={[-1.2, 1.3, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
      </mesh>

      {/* Bunny Eyes */}
      {[-0.15, 0.15].map((z, i) => (
        <mesh
          key={i}
          material={eyeMaterial}
          position={[-1.1, 1.5, z]}
        >
          <sphereGeometry args={[0.08, 8, 8]} />
        </mesh>
      ))}
    </group>
  );
};

const HeroCanvas = () => {
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const cloudPositions = useMemo(
    () =>
      (isMobile
        ? [
            [12, 4, -25],
            [6, -3, -22],
            [-10, 5, -24],
            [8, -4, -23]
          ]
        : [
            [16, 6, -28],
            [8, -4, -24],
            [-12, 7, -26],
            [14, -6, -25],
            [5, 3, -27],
            [-6, -2, -23]
          ]),
    [isMobile]
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Centered Instructions */}
      <div className="absolute top-12 left-52 transform -translate-x-1/2 
                    text-gray-600 text-xs md:text-sm bg-white/30 backdrop-blur-sm 
                    px-4 py-2 rounded-full shadow-lg border border-white/50 z-20">
        {isMobile ? (
          controlsEnabled ? (
            <p>One finger to move • Two fingers to rotate</p>
          ) : (
            <p>Scroll enabled</p>
          )
        ) : (
          <p>Left click to rotate • Right click to move</p>
        )}
      </div>

      {/* Moved toggle button to bottom left */}
      {isMobile && (
        <button
          className="absolute bottom-28 left-4 bg-white/30 backdrop-blur-sm 
                     px-3 py-1.5 rounded-full text-gray-700 text-sm 
                     shadow-lg border border-white/50 z-20 
                     active:scale-95 transition-transform"
          onClick={() => setControlsEnabled(!controlsEnabled)}
          style={{ touchAction: 'none' }}
        >
          {controlsEnabled ? '🔒 Lock View' : '🔓 Enable View'}
        </button>
      )}

      <Canvas
        camera={{
          position: [0, 0, isMobile ? 25 : 22],
          fov: 45
        }}
        dpr={isMobile ? [1, 1.5] : [1, 1.5]}
        style={{
          background: 'transparent',
          touchAction: isMobile && !controlsEnabled ? 'auto' : 'none',
          cursor: 'grab'
        }}
        onTouchStart={(e) => {
          if (controlsEnabled) {
            e.preventDefault();
          }
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />

        <Suspense fallback={null}>
          <CarrotShip />
          <CloudField positions={cloudPositions} />
          {(!isMobile || controlsEnabled) && (
            <OrbitControls
              makeDefault
              enabled={controlsEnabled}
              enableRotate={true}
              enableZoom={false}
              enablePan={true}
              enableDamping={true}
              dampingFactor={isMobile ? 0.12 : 0.05}
              rotateSpeed={isMobile ? 0.7 : 1.5}
              panSpeed={isMobile ? 0.6 : 1.2}
              enableTouchRotate={true}
              enableTouchPan={true}
              touches={isMobile
                ? { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.ROTATE }
                : { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.PAN }
              }
              mouseButtons={{ LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }}
            />

          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`absolute inset-0 top-[100px] sm:top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col sm:flex-row items-start gap-3 sm:gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#663635]' />
          <div className='w-1 sm:h-80 h-40 brown-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#663635]'>Sadil</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I am a creative graphic designer specialising in visual content for print, digital media, and branding.
          </p>
        </div>
      </div>



      {/* Add the floating design elements */}
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>
    </section>
  );
};

export default Hero;
