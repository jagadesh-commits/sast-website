"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SteelThreeProps = {
  className?: string;
};

export function SteelThree({ className }: SteelThreeProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const coilGroup = new THREE.Group();
    scene.add(coilGroup);

    const coilMaterial = new THREE.MeshPhysicalMaterial({
      color: "#bcc6d3",
      metalness: 1,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      reflectivity: 1,
      sheen: 0.35,
      sheenColor: new THREE.Color("#f4f8ff"),
    });

    const sideMaterial = coilMaterial.clone();
    sideMaterial.roughness = 0.18;

    // Main steel coil body (industrial roll profile).
    const outerRadius = 1.95;
    const innerRadius = 0.72;
    const width = 1.4;

    const coilBody = new THREE.Mesh(
      new THREE.CylinderGeometry(outerRadius, outerRadius, width, 96, 1, true),
      sideMaterial
    );
    coilGroup.add(coilBody);

    // Front and back ring faces create the visible "rolled steel coil" look.
    const frontFace = new THREE.Mesh(
      new THREE.RingGeometry(innerRadius, outerRadius, 96),
      coilMaterial
    );
    frontFace.position.y = width / 2;
    frontFace.rotation.x = -Math.PI / 2;
    coilGroup.add(frontFace);

    const backFace = frontFace.clone();
    backFace.position.y = -width / 2;
    backFace.rotation.x = Math.PI / 2;
    coilGroup.add(backFace);

    // Inner hollow wall so the center opening reads clearly as a coil roll.
    const innerWall = new THREE.Mesh(
      new THREE.CylinderGeometry(innerRadius, innerRadius, width, 72, 1, true),
      new THREE.MeshPhysicalMaterial({
        color: "#8e99a6",
        metalness: 0.85,
        roughness: 0.28,
      })
    );
    coilGroup.add(innerWall);

    // Layered bands simulate wound steel layers.
    const layerMaterial = new THREE.MeshStandardMaterial({
      color: "#d2d9e3",
      metalness: 0.95,
      roughness: 0.24,
    });
    const layerBands: THREE.Mesh[] = [];
    for (let i = 0; i < 14; i++) {
      const radius = outerRadius - i * 0.055;
      if (radius <= innerRadius + 0.06) break;
      const band = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.015, 8, 120),
        layerMaterial
      );
      band.rotation.x = Math.PI / 2;
      band.position.y = (i % 2 === 0 ? 1 : -1) * 0.012;
      layerBands.push(band);
      coilGroup.add(band);
    }

    // Subtle industrial accent ring.
    const accentRing = new THREE.Mesh(
      new THREE.TorusGeometry(outerRadius + 0.08, 0.022, 16, 120),
      new THREE.MeshStandardMaterial({ color: "#1a3a8f", metalness: 0.55, roughness: 0.45 })
    );
    accentRing.rotation.x = Math.PI / 2;
    accentRing.position.y = -width / 2 - 0.03;
    coilGroup.add(accentRing);

    coilGroup.rotation.z = Math.PI / 2;
    coilGroup.rotation.x = 0.14;
    coilGroup.rotation.y = -0.25;

    scene.add(new THREE.AmbientLight("#ffffff", 0.9));

    const keyLight = new THREE.DirectionalLight("#ffffff", 2.3);
    keyLight.position.set(4, 3, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight("#9db7ff", 1.2);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight("#ffffff", 1.8, 40);
    rimLight.position.set(-2.5, -1.5, -2.5);
    scene.add(rimLight);

    let raf = 0;
    const animate = () => {
      coilGroup.rotation.z += 0.0022;
      coilGroup.rotation.y += 0.0012;
      accentRing.rotation.z -= 0.0015;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      coilBody.geometry.dispose();
      coilMaterial.dispose();
      sideMaterial.dispose();
      innerWall.geometry.dispose();
      (innerWall.material as THREE.Material).dispose();
      frontFace.geometry.dispose();
      backFace.geometry.dispose();
      layerMaterial.dispose();
      layerBands.forEach((band) => band.geometry.dispose());
      accentRing.geometry.dispose();
      (accentRing.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}
