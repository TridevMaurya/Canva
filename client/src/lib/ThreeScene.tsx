import * as THREE from "three";

export class ThreeScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private blobs: THREE.Mesh[] = [];
  private animationFrameId: number | null = null;

  constructor() {
    // Create scene
    this.scene = new THREE.Scene();
    
    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    this.camera.position.z = 5;
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add renderer to DOM
    this.renderer.domElement.style.position = "fixed";
    this.renderer.domElement.style.top = "0";
    this.renderer.domElement.style.left = "0";
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100%";
    this.renderer.domElement.style.zIndex = "-1";
    this.renderer.domElement.style.pointerEvents = "none";
    document.body.appendChild(this.renderer.domElement);
    
    // Create blobs
    this.createBlobs();
    
    // Add window resize listener
    window.addEventListener("resize", this.handleResize);
    
    // Start animation loop
    this.animate();
  }
  
  private createBlobs(): void {
    // Create blob geometries
    const blobGeometry = new THREE.SphereGeometry(2, 32, 32);
    
    // Create materials with different colors
    const greenMaterial = new THREE.MeshBasicMaterial({
      color: 0x4DFF8E,
      transparent: true,
      opacity: 0.2
    });
    
    const purpleMaterial = new THREE.MeshBasicMaterial({
      color: 0xB56EFF,
      transparent: true,
      opacity: 0.2
    });
    
    const blueMaterial = new THREE.MeshBasicMaterial({
      color: 0x00C2FF,
      transparent: true,
      opacity: 0.2
    });
    
    // Create blobs
    const greenBlob = new THREE.Mesh(blobGeometry, greenMaterial);
    greenBlob.position.set(-5, 3, -10);
    greenBlob.scale.set(2, 2, 0.5);
    
    const purpleBlob = new THREE.Mesh(blobGeometry, purpleMaterial);
    purpleBlob.position.set(5, -3, -10);
    purpleBlob.scale.set(2, 2, 0.5);
    
    const blueBlob = new THREE.Mesh(blobGeometry, blueMaterial);
    blueBlob.position.set(0, -5, -10);
    blueBlob.scale.set(1.5, 1.5, 0.5);
    
    // Add blobs to scene
    this.scene.add(greenBlob, purpleBlob, blueBlob);
    
    // Store blobs for animation
    this.blobs = [greenBlob, purpleBlob, blueBlob];
  }
  
  private handleResize = (): void => {
    // Update camera aspect ratio
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    
    // Update renderer size
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    
    // Animate blobs
    const time = Date.now() * 0.001;
    
    this.blobs.forEach((blob, index) => {
      const offset = index * Math.PI / 4;
      blob.position.y += Math.sin(time + offset) * 0.01;
      blob.position.x += Math.cos(time + offset) * 0.005;
      blob.rotation.z += 0.001;
    });
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
  }
  
  public dispose(): void {
    // Stop animation loop
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    // Remove event listener
    window.removeEventListener("resize", this.handleResize);
    
    // Dispose geometries and materials
    this.blobs.forEach(blob => {
      blob.geometry.dispose();
      (blob.material as THREE.Material).dispose();
    });
    
    // Remove renderer from DOM
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
    
    // Dispose renderer
    this.renderer.dispose();
  }
}
