import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "./Icon";
import { useFormStore } from "@/store/form-store";
import { cn } from "@/lib/utils";

const AttendeeForm = () => {
  const { formData, setFormData, errors } = useFormStore();

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Add error styling utility
  const errorClasses = (field: keyof typeof errors) =>
    errors[field] ? "border-red-500 focus-visible:ring-red-500" : "";

  return (
    <div className="space-y-8">
      <div>
        <label className="text-sm font-medium">
          <p>Enter your name*</p>
        </label>
        <Input
          value={formData.attendeeName || ""}
          onChange={(e) => handleChange("attendeeName", e.target.value)}
          className={cn(
            "mt-2 h-12 border-[#07373F] py-3 ring-0 placeholder:text-[#AAAAAA] focus-visible:ring-1",
            errorClasses("attendeeName")
          )}
          placeholder="John Doe"
          required
        />
        {errors.attendeeName && (
          <p className="mt-1 !text-xs !text-red-500">
            {errors.attendeeName[0]}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">
          <p>Enter your email*</p>
        </label>
        <div className="relative">
          <div className="relative">
            <Input
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              type="email"
              placeholder="john@example.com"
              className={cn(
                "relative mt-2 h-12 border-[#07373F] py-3 pl-11 ring-0 placeholder:text-[#AAAAAA] focus-visible:ring-1",
                errorClasses("email")
              )}
              required
            />
            <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
              <Icon icon="envelope" size={24} />
            </div>
          </div>
          {errors.email && (
            <p className="mt-1 !text-xs !text-red-500">{errors.email[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Special request?</label>
        <Textarea
          value={formData.specialRequest || ""}
          onChange={(e) => handleChange("specialRequest", e.target.value)}
          placeholder="Any special requirements or requests..."
          className="mt-2 h-[127px] resize-none border-[#07373F] py-3 ring-0 placeholder:text-[#AAAAAA] focus-visible:ring-1 focus-visible:ring-[#24A0B5]"
        />
      </div>
    </div>
  );
};

export default AttendeeForm;
