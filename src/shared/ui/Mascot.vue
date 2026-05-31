<template>
  <div
    ref="canvasHost"
    class="konata-canvas"
    role="img"
    :aria-label="t('aria.mascot')"
  ></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  AmbientLight,
  Box3,
  DirectionalLight,
  Group,
  HemisphereLight,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector3,
  WebGLRenderer
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const canvasHost = ref<HTMLElement | null>(null)
const { t } = useI18n()

const palette = ['#2b58a6', '#4c8fd9', '#2c2f8f', '#7b8cff', '#f6d7c3', '#ffffff']

const hashString = (value: string): number =>
  value.split('').reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0, 0)

const pickPaletteColor = (meshName: string, materialName: string) => {
  const name = `${meshName} ${materialName}`.toLowerCase()
  if (name.includes('outline')) {
    return '#1b3f7f'
  }
  if (name.includes('eye')) {
    return '#ffffff'
  }
  if (name.includes('hair')) {
    return '#4c8fd9'
  }

  return palette[Math.abs(hashString(name || 'mesh')) % palette.length] ?? '#ffffff'
}

const applyPaletteToModel = (root: Group, baseTexture: Texture) => {
  let meshCount = 0

  root.traverse((node) => {
    const mesh = node as Mesh
    if (!mesh.isMesh) {
      return
    }

    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    materials.forEach((material, index) => {
      if (
        !(
          material instanceof MeshStandardMaterial ||
          material instanceof MeshBasicMaterial ||
          material instanceof MeshLambertMaterial ||
          material instanceof MeshPhongMaterial
        )
      ) {
        return
      }

      const materialName = material.name || `material-${meshCount}-${index}`
      const paletteColor = pickPaletteColor(mesh.name || '', materialName)
      const loweredName = `${mesh.name || ''} ${materialName}`.toLowerCase()
      const isOutline = loweredName.includes('outline')

      if (isOutline) {
        material.map = null
        material.color.set(paletteColor)
      } else {
        material.map = baseTexture
        material.color.set('#ffffff')
      }

      if (material instanceof MeshStandardMaterial) {
        if (!isOutline) {
          material.emissiveMap = baseTexture
          material.emissive.set('#ffffff')
          material.emissiveIntensity = 0.12
        } else {
          material.emissive.set('#1b3f7f')
          material.emissiveIntensity = 0.06
        }
        material.metalness = 0.08
        material.roughness = Math.max(0.35, Math.min(0.85, material.roughness))
      }

      material.needsUpdate = true
    })

    meshCount += 1
  })
}

const disposeMaterial = (material: Material) => {
  const materialWithTextures = material as Material & Record<string, unknown>
  Object.values(materialWithTextures).forEach((value) => {
    if (value instanceof Texture) {
      value.dispose()
    }
  })
  material.dispose()
}

let cleanup: (() => void) | null = null

onMounted(() => {
  if (!canvasHost.value) {
    return
  }

  const host = canvasHost.value
  const scene = new Scene()
  const camera = new PerspectiveCamera(35, 1, 0.1, 100)
  camera.position.set(0, 0.25, 3.2)

  const renderer = new WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = SRGBColorSpace
  host.appendChild(renderer.domElement)

  const ambient = new AmbientLight('#ffffff', 0.6)
  const hemi = new HemisphereLight('#d6e6ff', '#0f265b', 0.8)
  const keyLight = new DirectionalLight('#7aa7ea', 1.2)
  keyLight.position.set(1.5, 2.2, 2.8)
  const fillLight = new DirectionalLight('#4c8fd9', 0.6)
  fillLight.position.set(-2, 1.4, 1.4)
  scene.add(ambient, hemi, keyLight, fillLight)

  const loader = new GLTFLoader()
  const textureLoader = new TextureLoader()
  const eyesTexture = textureLoader.load('/izumi_konata/textures/Eyes_emissive.png')
  eyesTexture.colorSpace = SRGBColorSpace
  eyesTexture.flipY = false
  const modelUrl = '/izumi_konata/scene.gltf'
  let mascot: Group | null = null
  let animationFrameId = 0
  let resizeObserver: ResizeObserver | null = null
  let targetRotationY = 0
  let currentRotationY = 0
  let isDragging = false
  let pointerId: number | null = null
  let lastPointerX = 0

  const onPointerDown = (event: PointerEvent) => {
    isDragging = true
    pointerId = event.pointerId
    lastPointerX = event.clientX
    host.classList.add('is-dragging')
    if (host.setPointerCapture) {
      host.setPointerCapture(event.pointerId)
    }
  }

  const onPointerMove = (event: PointerEvent) => {
    if (!isDragging || pointerId !== event.pointerId) {
      return
    }

    const deltaX = event.clientX - lastPointerX
    lastPointerX = event.clientX
    targetRotationY += deltaX * 0.012
  }

  const stopDragging = (event?: PointerEvent) => {
    if (event && pointerId !== event.pointerId) {
      return
    }

    isDragging = false
    pointerId = null
    host.classList.remove('is-dragging')
    if (event && host.hasPointerCapture && host.hasPointerCapture(event.pointerId)) {
      host.releasePointerCapture(event.pointerId)
    }
  }
  const onLostPointerCapture = () => stopDragging()

  const resize = () => {
    const width = host.clientWidth || 140
    const height = host.clientHeight || Math.round(width * (9 / 7))
    renderer.setSize(width, height, true)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  const animate = () => {
    if (mascot) {
      if (!isDragging) {
        targetRotationY += 0.002
      }
      currentRotationY += (targetRotationY - currentRotationY) * 0.08
      mascot.rotation.y = currentRotationY
    }
    renderer.render(scene, camera)
    animationFrameId = window.requestAnimationFrame(animate)
  }

  loader.load(modelUrl, (gltf) => {
    mascot = gltf.scene
    applyPaletteToModel(mascot, eyesTexture)

    const bounds = new Box3().setFromObject(mascot)
    const size = bounds.getSize(new Vector3())
    const center = bounds.getCenter(new Vector3())
    const maxAxis = Math.max(size.x, size.y, size.z) || 1
    const scale = 1.85 / maxAxis

    mascot.position.sub(center)
    mascot.scale.setScalar(scale)
    mascot.position.y -= 0.55
    scene.add(mascot)

    resize()
    animate()
  })

  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host)
  host.addEventListener('pointerdown', onPointerDown)
  host.addEventListener('pointermove', onPointerMove)
  host.addEventListener('pointerup', stopDragging)
  host.addEventListener('pointercancel', stopDragging)
  host.addEventListener('lostpointercapture', onLostPointerCapture)
  resize()

  cleanup = () => {
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
    host.removeEventListener('pointerdown', onPointerDown)
    host.removeEventListener('pointermove', onPointerMove)
    host.removeEventListener('pointerup', stopDragging)
    host.removeEventListener('pointercancel', stopDragging)
    host.removeEventListener('lostpointercapture', onLostPointerCapture)
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId)
    }

    if (mascot) {
      mascot.traverse((node) => {
        const mesh = node as Mesh
        if (!mesh.isMesh) {
          return
        }
        mesh.geometry.dispose()

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(disposeMaterial)
        } else {
          disposeMaterial(mesh.material)
        }
      })
    }

    renderer.dispose()
    if (renderer.domElement.parentNode === host) {
      host.removeChild(renderer.domElement)
    }
  }
})

onBeforeUnmount(() => {
  if (cleanup) {
    cleanup()
  }
})
</script>

<style scoped>
.konata-canvas {
  width: min(100%, 220px);
  aspect-ratio: 7 / 9;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 10px;
  touch-action: none;
  cursor: grab;
}

.konata-canvas.is-dragging {
  cursor: grabbing;
}

.konata-canvas :deep(canvas) {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
