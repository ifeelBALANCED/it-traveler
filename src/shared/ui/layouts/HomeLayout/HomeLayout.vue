<template>
  <main class="h-screen flex flex-col md:flex-row">
    <section class="flex-1 bg-primary p-5 grid place-items-center">
      <div class="text-white w-full h-full grid place-items-center">
        <slot />
      </div>
    </section>

    <section
      class="flex-1 bg-[url('https://i.ibb.co/MxdGKyKB/SVG-to-PNG-conversion.png')] bg-cover bg-no-repeat bg-center"
    />
  </main>
</template>
