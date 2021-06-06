<template lang="pug">
.group-cards.container
  slot
</template>

<style>
.group-cards {
  display: flex;
  justify-content: space-evenly !important;
  gap: 20px;
  flex-wrap: wrap;
}
</style>