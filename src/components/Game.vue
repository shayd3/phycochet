<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as Matter from 'matter-js'

const gameContainer = ref(null)

onMounted(() => {
  const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite;

  const engine = Engine.create()

  if (!gameContainer.value) {
    return
  }
  const render = Render.create({
    element: gameContainer.value,
    engine: engine
  })

  // Barriers
  const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true, restitution: 1 })
  const leftWall = Bodies.rectangle(0, 300, 60, 600, { isStatic: true, restitution: 1 })
  const rightWall = Bodies.rectangle(800, 300, 60, 600, { isStatic: true, restitution: 1 })
  const ceiling = Bodies.rectangle(400, 0, 810, 60, { isStatic: true, restitution: 1 })
  Composite.add(engine.world, [ground, leftWall, rightWall, ceiling])

  // Controllable player paddles
  const paddle1 = Bodies.rectangle(400, 500, 100, 20, { restitution: 1 })
  const paddle2 = Bodies.rectangle(400, 100, 100, 20, { restitution: 1 })
  Composite.add(engine.world, [paddle1, paddle2])

  // Ball
  const ball = Bodies.circle(400, 300, 20, { restitution: 1 })
  Composite.add(engine.world, [ball])



  Render.run(render)

  const runner = Runner.create()

  Runner.run(runner, engine)
})

</script>

<template>
  <div ref="gameContainer" style="width: 800px; height: 600px;"></div>
</template>

<style scoped>
</style>
