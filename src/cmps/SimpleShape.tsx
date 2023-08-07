import React, { useEffect, useState } from 'react'
import * as THREE from 'three'

export const SimpleShape = () => {
  const [shapes, setShapes] = useState<any>([])
  const [sceneState, setSceneState] = useState<any>()
  const [cameraState, setCameraState] = useState<any>()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [rendererState, setRendererState] = useState<any>()

  const add = () => {
    const x = position.x,
      y = position.y

    const heartShape = new THREE.Shape()
    heartShape.moveTo(x + 5, y + 5)
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y)
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7)
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19)
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7)
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y)
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5)

    const geometry = new THREE.ShapeGeometry(heartShape)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const mesh = new THREE.Mesh(geometry, material)
    sceneState.add(mesh)
    // setPosition((prev) => ({ x: prev.x + 15, y: prev.y + 15 }))
    setPosition((prev) => ({
      x: Math.random() * (70 - 0),
      y: Math.random() * (70 - 0),
    }))
  }
  useEffect(() => {
    // Set up scene
    const scene = new THREE.Scene()
    setSceneState(scene)
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    setCameraState(camera)

    // Set up renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    setRendererState(renderer)
  }, [])

  useEffect(() => {
    if (!(cameraState && rendererState && sceneState)) return
    document.body.appendChild(rendererState.domElement)

    cameraState.position.z = 65

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      if (sceneState && cameraState)
        rendererState.render(sceneState, cameraState)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      cameraState.aspect = newWidth / newHeight
      cameraState.updateProjectionMatrix()
      rendererState.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.removeChild(rendererState.domElement)
    }
  }, [cameraState, rendererState, sceneState])

  useEffect(() => {}, [])

  return <button onClick={add}>Add</button>
}
