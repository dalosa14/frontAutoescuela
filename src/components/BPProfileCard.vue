<template lang="pug">
//- Detailed card.
.profile-card.general-shadow.detailed-card(v-if="detailed")
  .header
    .bg-icon(v-if="resource", :class="`${resource}-icon`")
    p.title(v-if="title") {{ title }}
  hr
  p.description(v-if="description") {{ description }}
  .description(v-else)
    slot

//- Simple card.
.profile-card.general-shadow.simple-card(v-else, @click="action")
  .bg-icon(v-if="resource", :class="`${resource}-icon`")
  p.title(v-if="title") {{ title }}
  p.description(v-if="description") {{ description }}
  .description(v-else)
    slot
</template>

<script>
export default {
  props: {
    detailed: { type: Boolean, default: false },
    title: { type: String, default: "ProfileCard Title" },
    description: { type: String },
    resource: { type: String },
    onAction: { type: Function }
  },
  setup(props) {
    let action = props.onAction ? props.onAction : () => console.log("no definido");

    return { action }
  }
};
</script>

<style>
.profile-card {
  display: flex;
  flex-flow: column;
  padding: 1em 0;
  min-width: 308px;
  width: 25%;
  min-height: 165px;
  border-radius: 30px;
  border: none;
  margin-bottom: 1em !important;
  background-color: white;
}

.profile-card p.title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 0;
}

.profile-card p.description {
  margin-bottom: 0;
}

.profile-card .description li {
  margin: 5px 0px;
}

.profile-card.simple-card {
  justify-content: center;
  align-items: center;
}

.profile-card.detailed-card .header {
  padding: 0 10px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-bottom: 8px;
}

.profile-card.detailed-card .header .bg-icon {
  margin: 0 1em;
  width: 28px;
  height: 28px;
}

.profile-card.detailed-card .header * {
  margin: 0;
}

.profile-card.detailed-card hr {
  width: calc(100% - 3em);
  height: 1px;
  margin: 0 auto;
  background: var(--primary);
  height: 2px;
  border: none;
}

.profile-card.detailed-card .description {
  text-align: left;
  margin: 10px calc(1em + 10px);
  font-weight: 600;
}

.profile-card.detailed-card .description ul {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}
</style>