import { FormData } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type FormStore = {
  currentStep: number;
  formData: FormData;
  errors: Record<string, string[]>;
  setCurrentStep: (step: number) => void;
  setFormData: (data: Partial<FormData>) => void;
  setErrors: (errors: Record<string, string[]>) => void;
  resetForm: () => void;
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: {
        ticketType: "",
        attendeeName: "",
        email: "",
        specialRequest: "",
        photoUrl: "",
        noOfTickets: 0,
      },
      errors: {},
      setCurrentStep: (step) => set({ currentStep: step }),
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
          errors: {},
        })),
      setErrors: (errors) => set({ errors }),
      resetForm: () =>
        set({
          currentStep: 1,
          formData: {
            ticketType: "",
            attendeeName: "",
            email: "",
            specialRequest: "",
            photoUrl: "",
            noOfTickets: 0,
          },
          errors: {},
        }),
    }),
    { name: "form-storage" }
  )
);
