<template>
  <div>
    <h1>Events Listing for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <router-link
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      rel="prev"
      >Prev Page</router-link
    >
    |
    <router-link
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
      >Next Page</router-link
    >
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';

export default {
  components: {
    EventCard,
  },
  created() {
    this.perPage = 3;
    this.$store.dispatch('event/fetchEvents', { perPage: 3, page: this.page });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.events.eventTotal > this.page * this.perPage;
    },
    ...mapState(['event', 'user']),
  },
};
</script>
