"use client";

import { useState } from "react";
import {
  engineeringCutoffs,
  type EngineeringCutoff,
} from "../data/engineering-cutoffs";

type Chance =
  | "Good Chance"
  | "Possible Chance"
  | "Difficult Chance";

type Result = EngineeringCutoff & {
  chance: Chance;
};

const branches = [
  {
    value: "CSE",
    label: "CSE — Computer Science and Engineering",
  },
  {
    value: "EEE",
    label: "EEE — Electrical and Electronics Engineering",
  },
  {
    value: "ECE",
    label: "ECE — Electronics and Communication Engineering",
  },
  {
    value: "AIM_CSM",
    label: "AIML / CSM — AI & Machine Learning",
  },
  {
    value: "AID_CSD",
    label: "AIDS / CSD — AI & Data Science",
  },
  {
    value: "CIV",
    label: "CIVIL — Civil Engineering",
  },
  {
    value: "MEC",
    label: "MECHANICAL — Mechanical Engineering",
  },
  {
    value: "CAI",
    label: "CAI — Computer Applications & AI",
  },
  {
    value: "INF",
    label: "INF — Information Technology",
  },
  {
    value: "IOT",
    label: "IOT — Internet of Things",
  },
];

const branchCodes: Record<string, string[]> = {
  CSE: ["CSE"],
  EEE: ["EEE"],
  ECE: ["ECE"],
  AIM_CSM: ["AIM", "CSM"],
  AID_CSD: ["AID", "CSD"],
  CIV: ["CIV"],
  MEC: ["MEC"],
  CAI: ["CAI"],
  INF: ["INF"],
  IOT: ["IOT"],
};

const genders = ["Male", "Female"];

const categories = [
  "OC",
  "EWS",
  "BC-A",
  "BC-B",
  "BC-C",
  "BC-D",
  "BC-E",
  "SC",
  "ST",
];

function clean(value: unknown): string {
  return String(value ?? "")
    .trim()
    .toUpperCase();
}

function getChance(
  studentRank: number,
  closingRank: number
): Chance {
  if (studentRank <= closingRank) {
    return "Good Chance";
  }

  if (studentRank - closingRank <= 5000) {
    return "Possible Chance";
  }

  return "Difficult Chance";
}

export default function EngineeringPredictorPage() {
  const [rank, setRank] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [gender, setGender] = useState("Male");
  const [category, setCategory] = useState("OC");

  const [results, setResults] = useState<Result[]>([]);
  const [searched, setSearched] = useState(false);

  const handlePredict = () => {
    const studentRank = Number(rank);

    setSearched(true);
    setResults([]);

    if (!studentRank || studentRank <= 0) {
      return;
    }

    const selectedBranchCodes =
      branchCodes[branch] ?? [branch];

    const normalizedBranches =
      selectedBranchCodes.map(clean);

    const normalizedGender = clean(gender);
    const normalizedCategory = clean(category);

    /*
      Show only colleges whose closing rank is
      within +/- 10,000 of the student's rank.
    */
    const minimumClosingRank =
      studentRank - 10000;

    const maximumClosingRank =
      studentRank + 10000;

    const matchingRecords =
      engineeringCutoffs.filter(
        (item: EngineeringCutoff) => {
          const itemBranch = clean(item.branch);
          const itemGender = clean(item.gender);
          const itemCategory = clean(item.category);
          const closingRank = Number(
            item.closingRank
          );

          return (
            normalizedBranches.includes(itemBranch) &&
            itemGender === normalizedGender &&
            itemCategory === normalizedCategory &&
            closingRank >= minimumClosingRank &&
            closingRank <= maximumClosingRank
          );
        }
      );

    /*
      Remove exact duplicate records from the
      displayed results.
    */
    const calculatedResults: Result[] = [];

    const seen = new Set<string>();

    for (const item of matchingRecords) {
      const duplicateKey = [
        clean(item.collegeCode),
        clean(item.branch),
        clean(item.gender),
        clean(item.category),
        Number(item.closingRank),
      ].join("|");

      if (seen.has(duplicateKey)) {
        continue;
      }

      seen.add(duplicateKey);

      calculatedResults.push({
        ...item,
        chance: getChance(
          studentRank,
          Number(item.closingRank)
        ),
      });
    }

    /*
      Sort results:
      1. Good Chance
      2. Possible Chance
      3. Difficult Chance

      Within each chance group, show the
      closest closing ranks first.
    */
    const chanceOrder: Record<Chance, number> = {
      "Good Chance": 1,
      "Possible Chance": 2,
      "Difficult Chance": 3,
    };

    calculatedResults.sort((a, b) => {
      const chanceDifference =
        chanceOrder[a.chance] -
        chanceOrder[b.chance];

      if (chanceDifference !== 0) {
        return chanceDifference;
      }

      return (
        Number(a.closingRank) -
        Number(b.closingRank)
      );
    });

    setResults(calculatedResults);
  };

  return (
    <main className="min-h-screen bg-[#070a10] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* Header */}
        <section className="mb-10">
          <div className="mb-3 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
            AP EAMCET Engineering Predictor
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Engineering College Predictor
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
            Enter your AP EAMCET rank, preferred branch,
            gender and reservation category to see
            estimated college chances using the available
            2025 engineering cutoff data.
          </p>
        </section>

        <div className="grid gap-8 lg:grid-cols-[520px_1fr]">

          {/* Form */}
          <section className="rounded-3xl border border-white/10 bg-[#0d111a] p-8 shadow-2xl">
            <h2 className="text-2xl font-bold">
              Your Details
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Enter your details to see estimated college
              chances.
            </p>

            <div className="mt-8 space-y-6">

              {/* Rank */}
              <div>
                <label
                  htmlFor="rank"
                  className="mb-3 block text-base font-medium text-slate-200"
                >
                  AP EAMCET Rank
                </label>

                <input
                  id="rank"
                  type="number"
                  min="1"
                  value={rank}
                  onChange={(event) =>
                    setRank(event.target.value)
                  }
                  placeholder="Enter your rank"
                  className="w-full rounded-2xl border border-white/10 bg-[#080b11] px-5 py-4 text-lg text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              {/* Branch */}
              <div>
                <label
                  htmlFor="branch"
                  className="mb-3 block text-base font-medium text-slate-200"
                >
                  Preferred Branch
                </label>

                <select
                  id="branch"
                  value={branch}
                  onChange={(event) =>
                    setBranch(event.target.value)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-[#080b11] px-5 py-4 text-base text-white outline-none transition focus:border-blue-500"
                >
                  {branches.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                      className="bg-[#080b11] text-white"
                    >
                      {item.label}
                    </option>
                  ))}
                </select>

                <p className="mt-2 text-sm text-slate-500">
                  Branch codes are matched with the cutoff
                  dataset.
                </p>
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="mb-3 block text-base font-medium text-slate-200"
                >
                  Gender
                </label>

                <select
                  id="gender"
                  value={gender}
                  onChange={(event) =>
                    setGender(event.target.value)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-[#080b11] px-5 py-4 text-base text-white outline-none transition focus:border-blue-500"
                >
                  {genders.map((item) => (
                    <option
                      key={item}
                      value={item}
                      className="bg-[#080b11] text-white"
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-3 block text-base font-medium text-slate-200"
                >
                  Reservation Category
                </label>

                <select
                  id="category"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-[#080b11] px-5 py-4 text-base text-white outline-none transition focus:border-blue-500"
                >
                  {categories.map((item) => (
                    <option
                      key={item}
                      value={item}
                      className="bg-[#080b11] text-white"
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={handlePredict}
                disabled={!rank}
                className="w-full rounded-2xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Predict Colleges
              </button>
            </div>
          </section>

          {/* Results */}
          <section>

            {!searched && (
              <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-white/10 bg-[#0d111a] p-8 text-center">
                <div>
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
                    🎓
                  </div>

                  <h2 className="text-2xl font-bold">
                    Your college chances will appear here
                  </h2>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
                    Enter your details and select Predict
                    Colleges to see estimated options based
                    on the available cutoff dataset.
                  </p>
                </div>
              </div>
            )}

            {searched && !rank && (
              <div className="rounded-3xl border border-yellow-500/30 bg-yellow-500/5 p-8">
                <h2 className="text-2xl font-bold text-yellow-300">
                  Enter your AP EAMCET rank
                </h2>

                <p className="mt-3 text-slate-400">
                  Please enter a valid rank before predicting
                  colleges.
                </p>
              </div>
            )}

            {searched &&
              rank &&
              results.length === 0 && (
                <div className="rounded-3xl border border-yellow-500/30 bg-yellow-500/5 p-8">
                  <h2 className="text-2xl font-bold text-yellow-300">
                    No matching cutoff data available
                  </h2>

                  <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                    No matching 2025 engineering cutoff
                    record was found within ±10,000 ranks
                    for the selected branch, gender and
                    category.
                  </p>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-sm text-slate-400">
                      Selected combination
                    </p>

                    <div className="mt-4 space-y-4">

                      <div>
                        <span className="text-sm text-slate-500">
                          Branch
                        </span>

                        <p className="mt-1 font-medium text-white">
                          {
                            branches.find(
                              (item) =>
                                item.value === branch
                            )?.label
                          }
                        </p>
                      </div>

                      <div>
                        <span className="text-sm text-slate-500">
                          Gender
                        </span>

                        <p className="mt-1 font-medium text-white">
                          {gender}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm text-slate-500">
                          Category
                        </span>

                        <p className="mt-1 font-medium text-white">
                          {category}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm text-slate-500">
                          Allowed Closing Rank Range
                        </span>

                        <p className="mt-1 font-medium text-white">
                          {Math.max(
                            1,
                            Number(rank) - 10000
                          ).toLocaleString()}{" "}
                          —{" "}
                          {(
                            Number(rank) + 10000
                          ).toLocaleString()}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              )}

            {searched && results.length > 0 && (
              <div>
                <div className="mb-5">
                  <h2 className="text-2xl font-bold">
                    Estimated College Chances
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Based on available 2025 engineering
                    cutoff records within ±10,000 ranks of
                    your rank.
                  </p>
                </div>

                <div className="space-y-4">

                  {results.map((result, index) => (
                    <article
                      key={`${result.collegeCode}-${result.branch}-${result.gender}-${result.category}-${result.closingRank}-${index}`}
                      className="rounded-3xl border border-white/10 bg-[#0d111a] p-6 transition hover:border-white/20"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                        <div className="min-w-0">
                          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                            {result.collegeCode}
                          </p>

                          <h3 className="mt-1 text-xl font-bold text-white">
                            {result.collegeName}
                          </h3>

                          <div className="mt-4 flex flex-wrap gap-2">

                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                              Branch: {result.branch}
                            </span>

                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                              {result.gender}
                            </span>

                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                              {result.category}
                            </span>

                          </div>
                        </div>

                        <span
                          className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                            result.chance ===
                            "Good Chance"
                              ? "bg-green-500/10 text-green-300"
                              : result.chance ===
                                  "Possible Chance"
                                ? "bg-yellow-500/10 text-yellow-300"
                                : "bg-red-500/10 text-red-300"
                          }`}
                        >
                          {result.chance}
                        </span>
                      </div>

                      <div className="mt-6 border-t border-white/10 pt-5">
                        <div className="flex items-center justify-between gap-4">

                          <div>
                            <p className="text-sm text-slate-500">
                              2025 Closing Rank
                            </p>

                            <p className="mt-1 text-lg font-semibold text-white">
                              {Number(
                                result.closingRank
                              ).toLocaleString()}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-slate-500">
                              Your Rank
                            </p>

                            <p className="mt-1 text-lg font-semibold text-white">
                              {Number(
                                rank
                              ).toLocaleString()}
                            </p>
                          </div>

                        </div>
                      </div>
                    </article>
                  ))}

                </div>
              </div>
            )}

          </section>
        </div>

        {/* Counselling Guidance */}
        <section className="mt-10 rounded-3xl border border-white/10 bg-[#0d111a] p-8">
          <h2 className="text-2xl font-bold">
            AP EAMCET Counselling Guidance
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            After checking estimated college chances, follow
            the official counselling schedule and instructions
            applicable to your admission year.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {[
              {
                title: "1. Fee Payment",
                text: "Complete the counselling processing fee payment when the official schedule opens.",
              },
              {
                title: "2. Certificate Verification",
                text: "Keep the required certificates and documents ready for verification.",
              },
              {
                title: "3. Web Options",
                text: "Enter and prioritize your preferred colleges and branches carefully.",
              },
              {
                title: "4. Seat Allotment",
                text: "Check the official seat allotment result after web options are processed.",
              },
              {
                title: "5. Self Reporting",
                text: "Complete self-reporting through the prescribed official process.",
              },
              {
                title: "6. College Reporting",
                text: "Report to the allotted college according to the official instructions.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-black/10 p-5"
              >
                <h3 className="font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {item.text}
                </p>
              </div>
            ))}

          </div>

          <div className="mt-7 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
            <h3 className="font-semibold text-blue-300">
              Documents Checklist
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Keep your rank card, hall ticket, qualifying
              examination documents, study/residence documents,
              category or EWS certificates where applicable,
              income certificate where required, and other
              documents specified by the official counselling
              authority.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-8 rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6">
          <h2 className="font-semibold text-yellow-300">
            Important Note
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            These predictions are estimates based on the
            available 2025 engineering cutoff dataset. A
            prediction is not a guarantee of admission or
            seat allotment. Actual allotment depends on the
            official counselling process, seat availability,
            candidate choices, eligibility, reservations and
            other applicable rules.
          </p>
        </section>

      </div>
    </main>
  );
}