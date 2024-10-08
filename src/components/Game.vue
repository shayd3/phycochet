<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Matter from 'matter-js'

const gameContainer = ref(null)

onMounted(() => {
  const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite;

  const engine = Engine.create()

  const render = Render.create({
    element: gameContainer.value,
    engine: engine
  })

  // two boxes and ground
  const boxA = Bodies.rectangle(400, 200, 80, 80)
  const boxB = Bodies.rectangle(450, 30, 80, 80)
  const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true })

  Composite.add(engine.world, [boxA, boxB, ground])

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
