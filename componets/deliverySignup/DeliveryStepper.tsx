"use client";

interface Props {
  step: number;
}

export default function DeliveryStepper({ step }: Props) {
  const steps = [
    "Create Account",
    "Verify Email",
    "Verify Application",
    "Vehicle Details",
    "Documents",
    "Contract",
  ];

  return (
    <div className="w-full md:w-[300px] bg-slate-50/80 p-8 md:p-10 flex flex-col border-b md:border-b-0 md:border-r border-slate-200">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <span className="bg-orange-500 text-white text-sm px-2 py-0.5 rounded-md">
            STEP {step}
          </span>
          Delivery Partner
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Complete all steps to start delivering
        </p>
      </div>

      <div className="space-y-6 flex-1">
        {steps.map((item, index) => {
          const current = index + 1;
          const isCompleted = current < step;
          const isActive = current === step;

          return (
            <div key={item} className="flex items-center gap-4 group">
              <div
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 shrink-0
                  ${
                    isCompleted
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                      : isActive
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-200 ring-4 ring-orange-100"
                        : "bg-slate-200 text-slate-500"
                  }
                `}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  current
                )}
              </div>

              <div>
                <p
                  className={`
                    text-sm font-medium transition-colors duration-300
                    ${
                      isActive
                        ? "text-orange-600"
                        : isCompleted
                          ? "text-slate-700"
                          : "text-slate-400"
                    }
                  `}
                >
                  {item}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 hidden md:block">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
          Need help? Contact support
        </div>
      </div>
    </div>
  );
}
