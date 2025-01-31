<template>
  <div>
    <h1>404 - Not Found</h1>
    <p>
      The {{ resource || 'resource' }} you are looking for does not exist. It
      may have been removed, had its name changed, or is temporarily
      unavailable.
      <router-link to="/">Go Home</router-link>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: false,
    },
  },
};
</script>

<style></style>
