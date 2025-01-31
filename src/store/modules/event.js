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
  createEvent({ commit }, event) {
    EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event);
    });
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((response) => {
        console.log('response.data', response.data);
        commit('SET_EVENTS', response.data.data);
      })
      .catch((error) => {
        console.log('There was an error:', error.response);
      });
  },
  fetchEvent({ commit }, id) {
    EventService.getEvent(id)
      .then((response) => {
        commit('SET_EVENT', response.data);
      })
      .catch((error) => {
        console.log('There was an error:', error.response);
      });
  },
};
