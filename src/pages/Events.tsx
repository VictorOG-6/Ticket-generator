import { Progress } from "@/components/ui/progress";
import {
  AttendeeDetailsStep,
  BookedTicketStep,
  TicketSelectionStep,
} from "@/components";
import { attendeeDetailsSchema, ticketSelectionSchema } from "@/lib/validation";
import { useFormStore } from "@/store/form-store";
import { generateTicketPDF } from "@/lib/generateTicketPdf";

type FormStep = {
  title: string;
  component: React.ReactNode;
};

const Events = () => {
  const { currentStep, formData, resetForm, setCurrentStep } = useFormStore();
  const totalSteps = 3;

  const steps: FormStep[] = [
    {
      title: "Ticket Selection",
      component: <TicketSelectionStep />,
    },
    {
      title: "Attendee Details",
      component: <AttendeeDetailsStep />,
    },
    {
      title: "Ready",
      component: <BookedTicketStep />,
    },
  ];

  const progressValue = (currentStep / totalSteps) * 100;
  const isLastStep = currentStep === totalSteps;

  const handleStepChange = async (direction: "next" | "prev") => {
    if (direction === "next") {
      const isValid = await validateCurrentStep();
      if (!isValid) return;
    }

    if (direction === "prev") {
      if (currentStep === totalSteps) {
        resetForm();
        setCurrentStep(1);
        return;
      }

      setCurrentStep(Math.max(1, currentStep - 1));
      return;
    }

    setCurrentStep(Math.min(totalSteps, currentStep + 1));
  };

  const validateCurrentStep = async () => {
    if (currentStep === 1) {
      return ticketSelectionSchema.safeParse(formData).success;
    }
    if (currentStep === 2) {
      const result = attendeeDetailsSchema.safeParse(formData);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        useFormStore
          .getState()
          .setErrors(
            Object.fromEntries(
              Object.entries(errors).map(([key, value]) => [key, value || []])
            )
          );
        return false;
      }
    }
    return true;
  };

  return (
    <div className="pt-[46px]">
      <div className="flex justify-center">
        <div className="chromebook:p-12 flex h-max w-[700px] flex-col rounded-3xl border border-[#0E464F] bg-[#041E23] px-6 py-8">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <h2 className="font-jeju">{steps[currentStep - 1]?.title}</h2>
              <p>
                Step {currentStep}/{totalSteps}
              </p>
            </div>
            <Progress
              indicatorClassName="bg-[#24A0B5] rounded-lg"
              className="mt-3 h-1 bg-[#0E464F] md:h-2"
              value={progressValue}
            />
          </div>
          <div
            className={`mt-8 h-full rounded-4xl border p-6 ${!isLastStep ? "border-[#0E464F] bg-[#08252B]" : "border-none !p-0"}`}
          >
            {steps[currentStep - 1]?.component}
            <div className="mt-8 grid w-full items-center gap-4 md:grid-cols-2 md:gap-6">
              <button
                className="secondary-btn"
                onClick={() => handleStepChange("prev")}
              >
                {currentStep === totalSteps
                  ? "Book Another Ticket"
                  : currentStep === 1
                    ? "Cancel"
                    : "Back"}
              </button>
              <button
                className="primary-btn"
                onClick={() =>
                  currentStep === totalSteps
                    ? generateTicketPDF(formData)
                    : handleStepChange("next")
                }
              >
                {currentStep === totalSteps
                  ? "Download Ticket"
                  : currentStep === 2
                    ? "Get My Free Ticket"
                    : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
