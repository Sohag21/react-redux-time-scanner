import { createSlice } from "@reduxjs/toolkit";

import { TasksData } from "../FakeData";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: { value: TasksData },
  reducers: {
    addTask: (state, action) => {
      state.value.push(action.payload);
    },

    deleteTask: (state, action) => {
      state.value = state.value.filter((task) => task.id !== action.payload.id);
    },

    updateTask: (state, action) => {
      state.value.map((task) => {
        if (task.id === action.payload.id) {
          task.name = action.payload.name;
          task.duration = action.payload.duration;
        }
      });
    },
  },
});

export const { addTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;