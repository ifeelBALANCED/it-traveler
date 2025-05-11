<script setup lang="ts">
import { ref } from 'vue'
import { default as LocationCard } from './LocationCard.vue'
import { Typography } from '@/shared/ui/typography'

const locations = ref([
  {
    id: 1,
    name: 'Пункт незламності',
    description:
      'Проєкт української влади, який ініціювали у листопаді 2022 року на фоні масованих обстрілів критичної інфраструктури з боку Росії під час російсько-української війни. ',
    image:
      'https://fastly.picsum.photos/id/661/100/100.jpg?hmac=sI5T30v1AIDVoLoc0fszEd2C2uPiciUh5SAzNyUC3Gc',
  },
  {
    id: 2,
    name: 'Палац Спорту',
    description:
      'Ки́ївський пала́ц спо́рту (КПС) — найбільша крита спортивно-видовищна споруда України, розташована у центральній частині міста Київ, біля підніжжя Черепанової гори.',
    image:
      'https://fastly.picsum.photos/id/979/100/100.jpg?hmac=ZuQkhSGSvEmTpJKLI1CR3Bt2qVjYO8DW0IuS0vc9jfE',
  },
  {
    id: 3,
    name: 'ТЦ Олімпійський',
    description:
      'TK "Олімпійський" - унікальний сучасний Торговий комплекс, що задає стиль та динаміку життя XXI століття. Комплекс розташований у самому центрі ділового та торгового життя столиці з інтенсивним потоком людей та транспорту.',
    image:
      'https://fastly.picsum.photos/id/450/100/100.jpg?hmac=zzJCVMAuJKcieFWNi-pYpdTBCE4_ns2CNsV5aXQ4dfM',
  },
])

const handleEdit = (id: number) => {
  console.log('Edit location with ID:', id)
}

const handleDelete = (id: number) => {
  locations.value = locations.value.filter((location) => location.id !== id)
}
</script>

<template>
  <section class="flex flex-col mx-6 gap-y-4.5">
    <Typography variant="subtitle-2" class="text-[color:var(--color-action)]">
      Додані маркери
    </Typography>
    <ul class="space-y-3 divide-y divide-[#2C2C2C1A]">
      <li v-for="location in locations" :key="location.id">
        <location-card :location="location" @edit="handleEdit" @delete="handleDelete" />
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
