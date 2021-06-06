<template lang="pug">
.service-card.general-shadow
  .body
    p.title {{ title }}
    p.description {{ subtitle }}
  .card_content
    img.image(:src="image")
    p.description(v-for="element in description") {{ element }}
  .footer
    p.bold {{ bold }}
    BPButton(:fit="true", :onAction="action_button") {{ text_button }}
</template>

<script>
export default {
  props: {
    title: { type: String, default: "Service Card" },
    subtitle: { type: String },
    description: { type: Array },
    text_button: { type: String, default: "Buy" },
    image: { type: String },
    action_button: { type: Function },
    bold: { type: String },
  },
};
</script>

<style>
.service-card {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: 2em;
  min-width: 270px;
  min-height: 400px;
  border-radius: 30px;
  border: none;
  margin-bottom: 1em !important;
  background: #fff;
  transition: 0.4s;
}

.service-card:hover {
  transform: translateY(-15px);
}

p.description {
  font-size: 19px;
}

.service-card .body {
  display: block;
  width: 100%;
}

.service-card .body p.title {
  font-weight: 600;
  font-size: 30px;
  margin: 16px 0;
}
.service-card .card_content

.service-card .footer {
  margin: 25px;
  padding: 0 calc(var(--text-field-padding) * 1.5);
}

.service-card .image {
  width: 200px;
  height: 200px;
}

.service-card .bold {
  font-size: 40px;
  color: var(--primary);
  margin: 30px 0px;
}

.container {
  overflow: unset;
}



@media (max-width: 1000px) {
  .service-card .image {
      width: 200px;
      height: 150px;
  }
  p.description {
    margin: 10px 0px;
  }
  .service-card .bold {
    font-size: 33px;
    color: var(--primary);
    margin: 15px 0px;
  }
}

</style>