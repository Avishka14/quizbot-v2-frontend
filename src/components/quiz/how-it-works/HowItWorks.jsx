import React from 'react'
import Step01Image from "../../../assets/images/home-images/step_1.jpg";
import Step02Image from "../../../assets/images/home-images/step_2.jpg";
import Step03Image from "../../../assets/images/home-images/step_3.jpg";
import "./howitworks.css"; 


const STEPS = [
  {
    id: 1,
    title: "Enter a Topic",
    description:
      "Type in any subject you would like to be quizzed on. The more specific you are, the more focused your quiz will be.",
    example: "Nuclear Technology, Java, Sri Lanka",
    image: Step01Image,
  },
  {
    id: 2,
    title: "Generate Your Quiz",
    description:
      "Your topic is sent to our AI model, which instantly creates a custom quiz tailored just for you.",
    image: Step02Image,
  },
  {
    id: 3,
    title: "Submit and Improve",
    description:
      "Answer the questions, submit your responses, and review your results to strengthen your knowledge.",
    image: Step03Image,
  },
];

function StepCard({ step, index }) {
  const { id, title, description, example, image } = step;

  return (
    <li
      className="fade-in flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-md"
      style={{ "--fade-delay": `${index * 0.2}s` }}
    >
      <img
        src={image}
        alt={`Illustration for step ${id}: ${title}`}
        width={112}
        height={112}
        loading="lazy"
        className="mb-4 h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28"
      />

      <span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--qb-secondary)] text-sm font-semibold text-white">
        {id}
      </span>

      <h3 className="mb-2 text-lg font-semibold text-[var(--qb-primary)]">
        Step {String(id).padStart(2, "0")}: {title}
      </h3>

      <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
        {description}
      </p>

      {example && (
        <p className="mt-3 text-sm text-gray-500">
          <span className="font-medium text-[var(--qb-secondary)]">
            Examples:
          </span>{" "}
          {example}
        </p>
      )}
    </li>
  );
}

function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="fade-in mb-10 text-center">
        <h2
          id="how-it-works-heading"
          className="text-2xl font-bold text-[var(--qb-primary)] sm:text-3xl lg:text-4xl"
        >
          How It Works
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
          Creating a quiz takes just three simple steps.
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <StepCard key={step.id} step={step} index={index} />
        ))}
      </ol>
    </section>
  );
}

export default HowItWorks;