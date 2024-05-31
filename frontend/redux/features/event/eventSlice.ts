import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  createEvent: {},
  allEvents: [],
  eventsForUser: []
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    createNewEvent: (state, action: PayloadAction<{ event: any }>) => {
      state.createEvent = action.payload.event;
    },
    getAllEvents: (state, action: PayloadAction<{ event: any }>) => {
      state.allEvents = action.payload.event;
    },
    getAllEventsForUser: (state, action: PayloadAction<{ event: any }>) => {
      state.eventsForUser = action.payload.event;
    },
  },
});

export const { createNewEvent, getAllEvents, getAllEventsForUser } = eventSlice.actions;
export default eventSlice;
