import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  createEvent: {},
  allEvents: [],
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
  },
});

export const { createNewEvent, getAllEvents } = eventSlice.actions;
export default eventSlice;
