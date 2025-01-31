import EventService from '@/services/EventService.js';
export const namespaced = true;

export const state = {
  events: [],
  event: {},
};

export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id);
  },
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
};

export const actions = {
  createEvent({ commit, dispatch }, event) {
    EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event);

        const notification = {
          type: 'success',
          message: 'Your event has been created!',
        };

        dispatch('notification/add', notification, { root: true });
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message,
        };

        dispatch('notification/add', notification, { root: true });
        throw error;
      });
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((response) => {
        console.log('response.data', response.data);
        commit('SET_EVENTS', response.data.data);
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message,
        };

        dispatch('notification/add', notification, { root: true });
      });
  },
  fetchEvent({ commit, dispatch }, id) {
    EventService.getEvent(id)
      .then((response) => {
        commit('SET_EVENT', response.data);
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching event: ' + error.message,
        };

        dispatch('notification/add', notification, { root: true });
      });
  },
};
