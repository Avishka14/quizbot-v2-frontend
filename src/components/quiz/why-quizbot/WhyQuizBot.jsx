import React from "react";
import "./whyquizbot.css";

const POINTS = [
  {
    id: 1,
    title: "Personalized learning at the right difficulty",
    description:
      "Choosing a level (beginner, intermediate, advanced) means learners aren't bored by questions that are too easy or discouraged by ones that are too hard, so they stay engaged and keep improving.",
  },
  {
    id: 2,
    title: "Unlimited, instant quiz creation",
    description:
      "AI can generate fresh questions on any topic in seconds, so teachers, students, and trainers never run out of practice material or spend hours writing questions by hand.",
  },
  {
    id: 3,
    title: "Completely free and accessible",
    description:
      "No subscription or paywall means anyone can use it, including students, self-learners, and teachers in schools with limited budgets. This opens quality study tools to a much wider audience.",
  },
  {
    id: 4,
    title: "Saves time for educators and creators",
    description:
      "Teachers, tutors, and content creators can produce ready-to-use quizzes for classrooms, workshops, or social media, and spend their time teaching instead of preparing.",
  },
  {
    id: 5,
    title: "Active recall boosts retention",
    description:
      "Regular quizzing is one of the most effective study methods. With topic and level options, users can build a consistent practice habit, track progress, and level up as their knowledge grows.",
  },
];

function PointCard({ point, index }) {
  const { id, title, description } = point;

  return (
    <li
      className="wqb-fade-in flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
      style={{ "--fade-delay": `${index * 0.15}s` }}
    >
      <span
        aria-hidden="true"
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--qb-secondary)] text-sm font-semibold text-white"
      >
        {id}
      </span>

      <div>
        <h3 className="mb-1 text-lg font-semibold text-[var(--qb-primary)]">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
          {description}
        </p>
      </div>
    </li>
  );
}

function WhyQuizBot() {
  return (
    <section
      aria-labelledby="why-quizbot-heading"
      className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="wqb-fade-in mb-10 text-center">
        <h2
          id="why-quizbot-heading"
          className="text-2xl font-bold text-[var(--qb-primary)] sm:text-3xl lg:text-4xl"
        >
          Why QuizBot?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
          Smarter practice for learners, teachers, and creators.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {POINTS.map((point, index) => (
          <PointCard key={point.id} point={point} index={index} />
        ))}
      </ul>
    </section>
  );
}

export default WhyQuizBot;