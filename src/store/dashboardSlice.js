import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: []
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.categories = action.payload;
    },
    addWidget: (state, action) => {
        const { categoryId, widget } = action.payload;
        const category = state.categories.find(cat => cat.id === categoryId);
        if (category) {
          category.widgets.push({ id: Date.now(), ...widget });
        }
      },          
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(w => w.id !== widgetId);
      }
    }
  }
});

export const { setInitialState, addWidget,removeWidget } = dashboardSlice.actions;
export default dashboardSlice.reducer;
