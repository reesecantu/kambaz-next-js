/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../database";

const initialState = {
  enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (
      state,
      { payload }: { payload: { userId: string; courseId: string } },
    ) => {
      const alreadyEnrolled = state.enrollments.some(
        (e: any) => e.user === payload.userId && e.course === payload.courseId,
      );
      if (alreadyEnrolled) return;

      state.enrollments = [
        ...state.enrollments,
        {
          _id: new Date().getTime().toString(),
          user: payload.userId,
          course: payload.courseId,
        },
      ] as any;
    },
    unenroll: (
      state,
      { payload }: { payload: { userId: string; courseId: string } },
    ) => {
      state.enrollments = state.enrollments.filter(
        (e: any) =>
          !(e.user === payload.userId && e.course === payload.courseId),
      ) as any;
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
