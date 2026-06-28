<template>
  <section
    ref="windowRef"
    class="window draggable-window"
    :id="id"
    :style="windowStyle"
    @click="setWindowToTop"
  >
    <div
      ref="titleBarRef"
      class="title-bar draggable-title-bar"
      @pointerdown="onTitleBarPointerDown"
      @pointermove="onTitleBarPointerMove"
      @pointerup="onTitleBarPointerUp"
      @pointercancel="onTitleBarPointerCancel"
      @lostpointercapture="onTitleBarLostPointerCapture"
    >
      <div class="title-bar-text">{{ title }}</div>
      <div ref="controlsRef" class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body" :class="bodyClass">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type DragState = {
  pointerId: number
  startPointerX: number
  startPointerY: number
  startOffsetX: number
  startOffsetY: number
}

withDefaults(defineProps<{
  title: string
  id?: string
  bodyClass?: string
}>(), {
  id: '',
  bodyClass: ''
})

const windowRef = ref<HTMLElement | null>(null)
const titleBarRef = ref<HTMLElement | null>(null)
const controlsRef = ref<HTMLElement | null>(null)
const offsetX = ref(0)
const offsetY = ref(0)
const isDragging = ref(false)
let dragState: DragState | null = null

const windowStyle = computed(() => ({
  transform: `translate3d(${offsetX.value}px, ${offsetY.value}px, 0)`,
}))

const stopDragging = (event?: PointerEvent) => {
  if (!dragState) {
    return
  }

  if (event && event.pointerId !== dragState.pointerId) {
    return
  }

  const titleBar = titleBarRef.value
  if (event && titleBar?.hasPointerCapture(event.pointerId)) {
    titleBar.releasePointerCapture(event.pointerId)
  }

  dragState = null
  isDragging.value = false
}

const onTitleBarPointerDown = (event: PointerEvent) => {
  if (event.button !== 0) {
    return
  }

  const target = event.target as Node | null

  if (target && controlsRef.value?.contains(target)) {
    return
  }

  const windowElement = windowRef.value

  setWindowToTop(event)

  const titleBar = titleBarRef.value
  if (!windowElement || !titleBar) {
    return
  }

  isDragging.value = true
  dragState = {
    pointerId: event.pointerId,
    startPointerX: event.clientX,
    startPointerY: event.clientY,
    startOffsetX: offsetX.value,
    startOffsetY: offsetY.value
  }

  titleBar.setPointerCapture(event.pointerId)
  event.preventDefault()
}

const onTitleBarPointerMove = (event: PointerEvent) => {
  if (!dragState || dragState.pointerId !== event.pointerId) {
    return
  }

  const deltaX = event.clientX - dragState.startPointerX
  const deltaY = event.clientY - dragState.startPointerY
  offsetX.value = dragState.startOffsetX + deltaX
  offsetY.value = dragState.startOffsetY + deltaY
}

const onTitleBarPointerUp = (event: PointerEvent) => {
  stopDragging(event)
}

const onTitleBarPointerCancel = (event: PointerEvent) => {
  stopDragging(event)
}

const onTitleBarLostPointerCapture = () => {
  stopDragging()
}

const setWindowToTop = (e: PointerEvent) => {
  const windows = document.querySelectorAll('.window')

  windows.forEach((window) => {
    if (window !== windowRef.value) {
      window.classList.remove('top-window')
    }
  })

  windowRef.value?.classList.add('top-window')
}
</script>

<style scoped>
.draggable-window {
  position: relative;
  will-change: transform;
}

.draggable-title-bar {
  touch-action: none;
  user-select: none;
}

.top-window {
  z-index: 1000 !important;
}
</style>
