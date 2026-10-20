
"use client";

import { useMemo, useState } from "react";
import { pharmacycutoffs } from "../data/pharmacy-cutoffs";

type CutoffRecord = Record<string, unknown>;
type Chance = "Good Chance" | "Possible Chance" | "Difficult Chance";

const dataset = pharmacycutoffs as unknown as CutoffRecord[];

const courses = [
  { value: "B.Pharmacy", label: "B.Pharmacy" },
  { value: "Pharm.D", label: "Pharm.D" },
];

const genders = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const categories = [
  { value: "OC", label: "OC — Open Category" },
  { value: "EWS", label: "EWS" },
  { value: "BC-A", label: "BC-A" },
  { value: "BC-B", label: "BC-B" },
  { value: "BC-C", label: "BC-C" },
  { value: "BC-D", label: "BC-D" },
  { value: "BC-E", label: "BC-E" },
  { value: "SC", label: "SC" },
  { value: "ST", label: "ST" },
];

function getField(
  record: CutoffRecord,
  keys: string[]
): unknown {
  for (const key of keys) {
    const value = record[key];

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return "";
}

function getText(
  record: CutoffRecord,
  keys: string[]
): string {
  return String(getField(record, keys)).trim();
}

function normalizeText(value: unknown): string {
  return String(value ?? "")
    .trim()
    .toUpperCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}


function normalizeCourse(value: unknown): string {
  const course = String(value ?? "")
    .trim()
    .toUpperCase()
    .replace(/\./g, "")
    .replace(/\s+/g, "");

  if (
    course === "PHB" ||
    course === "PHM" ||
    course === "BPHARMACY" ||
    course === "BPHARM"
  ) {
    return "B.Pharmacy";
  }

  if (
    course === "PDB" ||
    course === "PHD" ||
    course === "PHARMD" ||
    course === "DOCTOROFPHARMACY"
  ) {
    return "Pharm.D";
  }

  return course;
}

function normalizeGender(
  genderValue: unknown,
  categoryValue: unknown
): string {
  const gender = normalizeText(genderValue);
  const category = normalizeText(categoryValue);

  if (
    gender.includes("GIRL") ||
    gender.includes("FEMALE") ||
    category.endsWith(" GIRLS")
  ) {
    return "Female";
  }

  if (
    gender.includes("BOY") ||
    gender.includes("MALE") ||
    category.endsWith(" BOYS")
  ) {
    return "Male";
  }

  return gender;
}

function normalizeCategory(value: unknown): string {
  let category = normalizeText(value);

  category = category
    .replace(/\s+(BOYS|GIRLS|MALE|FEMALE)$/, "")
    .trim();

  if (category === "OC EWS" || category === "OC E W S") {
    return "EWS";
  }

  if (/^SC\s*(I|1)$/.test(category)) return "SC";
  if (/^SC\s*(II|2)$/.test(category)) return "SC";
  if (/^SC\s*(III|3)$/.test(category)) return "SC";

  if (category === "BCA") return "BC-A";
  if (category === "BCB") return "BC-B";
  if (category === "BCC") return "BC-C";
  if (category === "BCD") return "BC-D";
  if (category === "BCE") return "BC-E";

  if (category === "OPEN CATEGORY") return "OC";

  return category;
}

function getCourse(record: CutoffRecord): string {
  return normalizeCourse(
    getField(record, [
      "course",
      "courseName",
      "course_name",
      "courseCode",
      "course_code",
      "branch",
      "branchCode",
      "branch_code",
      "program",
    ])
  );
}

function getCategory(record: CutoffRecord): string {
  return normalizeCategory(
    getField(record, [
      "category",
      "reservationCategory",
      "reservation_category",
      "quota",
    ])
  );
}

function getGender(record: CutoffRecord): string {
  const categoryValue = getField(record, [
    "category",
    "reservationCategory",
    "reservation_category",
    "quota",
  ]);

  return normalizeGender(
    getField(record, ["gender", "sex", "seatType", "seat_type"]),
    categoryValue
  );
}

function getClosingRank(record: CutoffRecord): number {
  const value = getField(record, [
    "closingRank",
    "closing_rank",
    "lastRank",
    "last_rank",
    "rank",
  ]);

  const rank = Number(value);

  return Number.isFinite(rank) && rank > 0 ? rank : 0;
}

function getCollegeName(record: CutoffRecord): string {
  return (
    getText(record, [
      "collegeName",
      "college_name",
      "inst_name",
      "institutionName",
      "institution_name",
      "name",
    ]) || "College name unavailable"
  );
}

function getCollegeCode(record: CutoffRecord): string {
  return getText(record, [
    "collegeCode",
    "college_code",
    "inst_code",
    "institutionCode",
    "institution_code",
    "code",
  ]);
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

function chanceClasses(chance: Chance): string {
  if (chance === "Good Chance") {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
  }

  if (chance === "Possible Chance") {
    return "border-amber-500/30 bg-amber-500/10 text-amber-300";
  }

  return "border-rose-500/30 bg-rose-500/10 text-rose-300";
}

export default function PharmacyPredictorPage() {
  const [rankInput, setRankInput] = useState("");
  const [gender, setGender] = useState("Male");
  const [course, setCourse] = useState("B.Pharmacy");
  const [category, setCategory] = useState("OC");
  const [results, setResults] = useState<CutoffRecord[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const matchingDatasetCount = useMemo(() => {
    return dataset.filter(
      (item) =>
        getCourse(item) === course &&
        getGender(item) === gender &&
        getCategory(item) === category &&
        getClosingRank(item) > 0
    ).length;
  }, [course, gender, category]);

  function handlePredict(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setHasSearched(false);
    setResults([]);

    const studentRank = Number(rankInput);

    if (
      !rankInput.trim() ||
      !Number.isInteger(studentRank) ||
      studentRank < 1
    ) {
      setError("Please enter a valid positive integer rank.");
      return;
    }

    const minimumRank = studentRank - 10000;
    const maximumRank = studentRank + 10000;

    const matches = dataset.filter((item) => {
      const closingRank = getClosingRank(item);

      return (
        getCourse(item) === course &&
        getGender(item) === gender &&
        getCategory(item) === category &&
        closingRank > 0 &&
        closingRank >= minimumRank &&
        closingRank <= maximumRank
      );
    });

    // Remove exact duplicate records without changing the source dataset.
    const uniqueRecords = new Map<string, CutoffRecord>();

    for (const item of matches) {
      const key = [
        getCollegeCode(item),
        getCollegeName(item),
        getCourse(item),
        getCategory(item),
        getGender(item),
        getClosingRank(item),
      ].join("|");

      if (!uniqueRecords.has(key)) {
        uniqueRecords.set(key, item);
      }
    }

    const finalResults = Array.from(uniqueRecords.values());

    finalResults.sort(
      (a, b) =>
        Math.abs(getClosingRank(a) - studentRank) -
        Math.abs(getClosingRank(b) - studentRank)
    );

    setResults(finalResults);
    setHasSearched(true);
  }

  const studentRank = Number(rankInput);

  return (
    <main className="min-h-screen bg-[#080d18] text-slate-100">
      <header className="border-b border-white/10 bg-[#0b1120]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5">
          <a
            href="/"
            className="text-xl font-extrabold tracking-[0.18em] text-white"
          >
            YOUR <span className="text-blue-400">GUIDE</span>
          </a>

          <nav className="flex flex-wrap gap-5 text-sm text-slate-300">
            <a className="transition hover:text-white" href="/">
              Home
            </a>
            <a className="transition hover:text-white" href="/tools">
              All Tools
            </a>
            <a className="transition hover:text-white" href="/admin">
              Admin
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-12 md:pt-16">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
            AP EAMCET / AP EAPCET
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Pharmacy College Predictor
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-slate-400">
            Explore pharmacy college options using your rank, preferred
            course, gender and reservation category. Results are estimates
            based on the cutoff dataset currently available.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-[380px_minmax(0,1fr)]">
          <section className="h-fit rounded-2xl border border-white/10 bg-[#101827] p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white">
              Enter your details
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Complete the fields below to find matching college records.
            </p>

            <form
              onSubmit={handlePredict}
              className="mt-6 space-y-5"
            >
              <div>
                <label
                  htmlFor="rank"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  AP EAMCET rank
                </label>

                <input
                  id="rank"
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={rankInput}
                  onChange={(event) => setRankInput(event.target.value)}
                  placeholder="Enter your rank"
                  className="w-full rounded-xl border border-white/10 bg-[#080d18] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                />

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Results include closing ranks within 10,000 places above
                  or below your rank.
                </p>
              </div>

              <div>
                <label
                  htmlFor="course"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Preferred course
                </label>

                <select
                  id="course"
                  value={course}
                  onChange={(event) => setCourse(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#080d18] px-4 py-3 text-white outline-none focus:border-emerald-400"
                >
                  {courses.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Gender
                </label>

                <select
                  id="gender"
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#080d18] px-4 py-3 text-white outline-none focus:border-emerald-400"
                >
                  {genders.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Reservation category
                </label>

                <select
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#080d18] px-4 py-3 text-white outline-none focus:border-emerald-400"
                >
                  {categories.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-500 px-5 py-3.5 font-semibold text-[#04130e] transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-[#101827]"
              >
                Predict Colleges
              </button>

              <p className="text-xs text-slate-500">
                Dataset records available: {dataset.length.toLocaleString()}
              </p>
            </form>
          </section>

          <section className="min-w-0">
            {!hasSearched ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#0c1422] p-8 text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-2xl text-emerald-300">
                  ↗
                </div>

                <h2 className="text-xl font-semibold text-white">
                  Your results will appear here
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                  Enter your rank, choose your course and category, then
                  select Predict Colleges to view matching cutoff records.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="rounded-2xl border border-white/10 bg-[#101827] p-5 md:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-400">
                        Prediction results
                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-white">
                        {results.length} matching{" "}
                        {results.length === 1 ? "college" : "colleges"}
                      </h2>

                      <p className="mt-2 text-sm text-slate-400">
                        Rank: {studentRank.toLocaleString()} · {course} ·{" "}
                        {gender} · {category}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setHasSearched(false);
                        setResults([]);
                        setError("");
                      }}
                      className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                    >
                      New search
                    </button>
                  </div>
                </div>

                {results.length === 0 ? (
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
                    <h3 className="text-lg font-semibold text-white">
                      No matching cutoff records found
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {matchingDatasetCount === 0
                        ? "The dataset contains no records matching this exact course, gender and category combination. The stored values may use a different course or category format."
                        : "Matching records exist for your selected filters, but none have a closing rank within 10,000 places of your rank."}
                    </p>

                    <div className="mt-4 space-y-1 text-sm text-slate-400">
                      <p>
                        Records matching course, gender and category:{" "}
                        {matchingDatasetCount}
                      </p>
                      <p>
                        Total imported dataset records: {dataset.length}
                      </p>
                    </div>

                    <p className="mt-4 text-sm text-slate-400">
                      Try another category or course. If matching records
                      remain at zero for every selection, the dataset
                      structure needs to be checked.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {(
                        [
                          "Good Chance",
                          "Possible Chance",
                          "Difficult Chance",
                        ] as Chance[]
                      ).map((chance) => {
                        const count = results.filter(
                          (item) =>
                            getChance(
                              studentRank,
                              getClosingRank(item)
                            ) === chance
                        ).length;

                        return (
                          <div
                            key={chance}
                            className="rounded-xl border border-white/10 bg-[#101827] p-4"
                          >
                            <p className="text-sm text-slate-400">
                              {chance}
                            </p>
                            <p className="mt-2 text-2xl font-bold text-white">
                              {count}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="space-y-4">
                      {results.map((item, index) => {
                        const closingRank = getClosingRank(item);
                        const chance = getChance(
                          studentRank,
                          closingRank
                        );

                        const collegeName = getCollegeName(item);
                        const collegeCode = getCollegeCode(item);

                        return (
                          <article
                            key={[
                              collegeCode,
                              collegeName,
                              getCourse(item),
                              getCategory(item),
                              getGender(item),
                              closingRank,
                              index,
                            ].join("-")}
                            className="rounded-2xl border border-white/10 bg-[#101827] p-5 transition hover:border-white/20 md:p-6"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div className="min-w-0">
                                <h3 className="text-lg font-semibold leading-7 text-white">
                                  {collegeName}
                                </h3>

                                {collegeCode && (
                                  <p className="mt-1 text-sm text-slate-400">
                                    College code: {collegeCode}
                                  </p>
                                )}
                              </div>

                              <span
                                className={`inline-flex shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${chanceClasses(chance)}`}
                              >
                                {chance}
                              </span>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                              <div className="rounded-xl bg-[#080d18] p-3">
                                <p className="text-xs text-slate-500">
                                  Closing rank
                                </p>
                                <p className="mt-1 font-semibold text-white">
                                  {closingRank.toLocaleString()}
                                </p>
                              </div>

                              <div className="rounded-xl bg-[#080d18] p-3">
                                <p className="text-xs text-slate-500">
                                  Course
                                </p>
                                <p className="mt-1 font-semibold text-white">
                                  {course}
                                </p>
                              </div>

                              <div className="rounded-xl bg-[#080d18] p-3">
                                <p className="text-xs text-slate-500">
                                  Category / Gender
                                </p>
                                <p className="mt-1 font-semibold text-white">
                                  {category} / {gender}
                                </p>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12">
        <div className="rounded-2xl border border-white/10 bg-[#101827] p-6 md:p-8">
          <h2 className="text-xl font-bold text-white">
            How to use your prediction
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
            Use these results as a starting point for researching colleges.
            Historical closing ranks can help you shortlist options, but
            they do not guarantee admission in a future counselling round.
            Verify the current year's official counselling instructions,
            eligibility, seat matrix and college details before making
            decisions.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "1. Registration",
                text: "Follow the official counselling notification and registration instructions.",
              },
              {
                title: "2. Certificates",
                text: "Prepare the required certificates and complete verification as instructed.",
              },
              {
                title: "3. Web options",
                text: "Research colleges and arrange your options according to your preferences.",
              },
              {
                title: "4. Allotment",
                text: "Check official allotment instructions, payment requirements and reporting dates.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-xl border border-white/10 bg-[#080d18] p-4"
              >
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <h3 className="mt-7 font-semibold text-white">
            Documents to check
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-400">
            Depending on the current official instructions, you may need
            your rank card, hall ticket, qualifying examination records,
            study or residence certificates, transfer certificate,
            category certificate where applicable, and other documents
            requested by the counselling authority.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0b1120]">
        <div className="mx-auto max-w-7xl px-5 py-7">
          <p className="text-sm leading-6 text-slate-500">
            Disclaimer: YOUR GUIDE is an independent educational tool and
            does not guarantee admission. Predictions depend on the
            completeness and accuracy of the supplied historical dataset.
            Always consult the official AP EAPCET counselling authority for
            current rules, cutoffs, seat availability, fees and deadlines.
          </p>

          <p className="mt-4 text-xs text-slate-600">
            © {new Date().getFullYear()} YOUR GUIDE
          </p>
        </div>
      </footer>
    </main>
  );
}