import { AttendeeForm, PhotoUpload } from "./";

const AttendeeDetailsStep = () => {
  return (
    <div>
      <div className="rounded-3xl border-[#07373F] p-0 md:border md:bg-[#052228] md:p-6 md:pb-[28px]">
        <p>Upload Profile Photo</p>
        <div className="mt-3">
          <PhotoUpload />
          <hr className="my-8 border-2 border-[#07373F]" />
          <AttendeeForm />
        </div>
      </div>
    </div>
  );
};

export default AttendeeDetailsStep;
