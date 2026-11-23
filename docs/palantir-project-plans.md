# Palantir Foundry Portfolio Projects: Build Guide

Four personal projects that show the Foundry skills on the portfolio: Ontology, Workshop,
Pipelines / Code Repositories, plus your TypeScript/React background through OSDK. They
are listed on the site as **In progress**. Finish them in the order below, because each one
reuses work from the one before.

| # | Project | Main skills shown | Effort |
|---|---------|-------------------|--------|
| 1 | Aviation Defect Intelligence Ontology | Pipelines, Ontology, Actions, Workshop | 2–3 weeks |
| 2 | Fleet Inspection Companion (OSDK App) | OSDK, TypeScript, React, writeback | 1–2 weeks |
| 3 | Engineering Data Validation Pipeline | Python transforms, tests, data expectations | 1–2 weeks |
| 4 | Flight Delay Operations Cockpit | Incremental pipelines at scale, Workshop analytics | 2 weeks |

Effort assumes evenings and weekends.

---

## Before you start

**Foundry access.** You need a Foundry environment you are allowed to use for personal
work. **Do not build these on your Accenture or client Foundry stack.** Use Palantir's free
developer tier (sign up at palantir.com, under "AIP / Foundry Developer Tier"; check the
current offer and its limits when you sign up). Its compute and storage limits are why the
datasets below are kept to a manageable size.

**Use public data only.** Every dataset below is public. Never use client data, even as an
"example", in a personal project.

**How to show work that lives in a private Foundry stack.** Recruiters can't log in to
your Foundry, so each project needs:
1. A **public GitHub repo** with a README covering the architecture diagram, Ontology design,
   pipeline code (copy your transforms from Code Repositories), and screenshots.
2. A **2–3 minute demo video** (Loom, or YouTube unlisted). Walk through the data, then the
   Ontology, then the app, then perform one Action.
3. On the portfolio, set `sourceUrl` (GitHub) and `liveUrl` (video) in `src/data/index.ts`,
   remove `status: 'in-progress'`, and change the description to past tense.

**Documentation to keep open:** Palantir docs (palantir.com/docs/foundry) for Code
Repositories / Python transforms, Ontology Manager, Actions, Workshop, and OSDK. Palantir's
training site (learn.palantir.com) has walkthroughs for each of these.

---

## Project 1: Aviation Defect Intelligence Ontology

### Pitch (for interviews)
"I built an end-to-end Foundry workflow on FAA defect reports, from raw CSV through PySpark
pipelines to an Ontology, with a Workshop triage app where engineers act on recurring defects
using Ontology Actions."

### Why it's valuable
It covers the full Foundry flow (data, then Ontology, then application, then decisions) in
your own domain (aviation), so you can speak to it with real authority.

### Data
- **FAA Service Difficulty Reporting System (SDRS)**: public defect/malfunction reports
  (sdrs.faa.gov → query → export). Pull 2–3 years for a few aircraft makes (e.g. Boeing 737,
  Airbus A320 family) so the data stays manageable.
- **FAA Aircraft Registry** (registry.faa.gov → "Download the Aircraft Registration
  Database"): `MASTER.txt` (aircraft by N-number) and `ACFTREF.txt` (make/model reference).

### Architecture
```
Raw uploads ──► Clean transforms ──► Ontology-backing datasets ──► Ontology ──► Workshop app
(SDRS CSV,      (types, dates,        (aircraft, defect,           (objects,     (triage,
 Registry TXT)   dedupe, join)         part, operator)              links,        Actions)
                                                                    Actions)
```

### Build steps

**Step 1: Ingest (day 1)**
- Create a Foundry project `aviation-defect-intelligence` with folders `raw/`, `clean/`,
  `ontology/`.
- Upload the SDRS export and registry files as raw datasets. Never edit raw data; every change
  happens in transforms.

**Step 2: Clean pipelines in Code Repositories (days 2–5)**
Create a Python transforms repo with one transform per output:
- `clean/defects`: parse dates, trim/uppercase codes, standardise ATA chapter codes
  (first 2 digits = system, e.g. 32 = landing gear), drop exact duplicates, build a stable
  primary key `defect_id` (use the SDRS control number, or a hash of its key fields).
- `clean/aircraft`: join MASTER to ACFTREF to get make/model; key = `n_number`.
- `clean/parts`: distinct part numbers and names taken from the defect reports; key = `part_number`.
- `clean/operators`: distinct operators; key = operator code/name.

Skeleton:
```python
from transforms.api import transform_df, Input, Output
from pyspark.sql import functions as F

@transform_df(
    Output("/.../clean/defects"),
    raw=Input("/.../raw/sdrs_export"),
)
def compute(raw):
    df = (raw
          .withColumn("difficulty_date", F.to_date("difficulty_date", "MM/dd/yyyy"))
          .withColumn("ata_chapter", F.substring(F.col("jasc_code"), 1, 2))
          .withColumn("part_number", F.upper(F.trim("part_number")))
          .dropDuplicates(["control_number"]))
    return df.withColumn("defect_id", F.col("control_number"))
```
(Check the column names against your actual export; SDRS headers vary by query.)

- Add a **derived** transform `clean/recurring_defects`: same aircraft + same ATA chapter
  within 90 days, counted as a recurrence. This gives the app real analytic value.
- Add **unit tests** (`test/` folder, pytest) for the key-building and ATA parsing.

**Step 3: Ontology (days 6–8)**
In Ontology Manager:
| Object type | Backing dataset | Primary key | Key properties |
|---|---|---|---|
| Aircraft | clean/aircraft | n_number | make, model, year, operator |
| Defect | clean/defects | defect_id | date, ata_chapter, description, part_number, **status**, **assignee** |
| Part | clean/parts | part_number | name, defect_count |
| Operator | clean/operators | operator_id | name |

Links: Aircraft 1–N Defect, Part 1–N Defect, Operator 1–N Aircraft.
`status` and `assignee` are **editable** properties (they don't come from the source data),
so they need writeback; Foundry handles that when you configure Actions on them.

**Step 4: Actions (days 9–10)**
- `Assign Defect`: sets assignee, sets status = `Assigned`.
- `Escalate Defect`: status = `Escalated`, required reason text.
- `Close Defect`: status = `Closed`, required resolution note.
- Add **submission criteria** (e.g. you can't close a defect that was never assigned). This
  shows you understand governed writeback, which interviewers like to ask about.

**Step 5: Workshop app "Defect Triage" (days 11–15)**
- Left panel: filters (make/model, ATA chapter, operator, date range, status).
- Centre: object table of Defects, with the recurring ones highlighted.
- Right panel: selected defect details, linked Aircraft (with its other defects), linked
  Part, and Action buttons.
- Top: metric cards (open defects, recurring defects, top ATA chapter) plus a chart of
  defects over time by ATA chapter.

### Done when
- [ ] Pipeline builds end-to-end from raw data with tests passing
- [ ] 4 object types, 3 links, 3 Actions with submission criteria
- [ ] Workshop app: filter, then select, then act, with the status change visible straight away
- [ ] GitHub README + demo video + portfolio entry updated

### Stretch goals
- Schedule the pipeline and add health checks on the main datasets.
- A "recurrence risk" score per aircraft (simple rule-based score, no ML needed).

---

## Project 2: Fleet Inspection Companion (OSDK App)

### Pitch
"I built a React/TypeScript app on the Palantir Ontology SDK that reads aircraft and defect
objects from Foundry and writes inspection findings back through Ontology Actions."

### Why it's valuable
It turns your frontend experience into a Palantir differentiator. Many Foundry developers
can build Workshop apps; fewer can ship a custom OSDK application. It also reuses Project 1's
Ontology, so you don't need new data.

### Prerequisites
Project 1 Ontology and Actions finished.

### Build steps

**Step 1: Ontology addition (day 1)**
- New object type `Inspection` (inspection_id, n_number, inspector, date, result, notes),
  linked to Aircraft. Back it with an empty dataset and allow edits, or create objects
  through an Action.
- New Action `Record Inspection` (creates an Inspection; optional: links an existing Defect).

**Step 2: Developer Console (day 2)**
- In Foundry **Developer Console**, create a new application. Choose the OSDK client type
  and select the object types (Aircraft, Defect, Part, Inspection) and Actions it needs.
- Set it up for OAuth (public client), and add `http://localhost:8080/auth/callback` (or
  whichever port you use) as the redirect URL.
- Generate the SDK package and follow the Console's instructions to create the starter app
  (the Console shows the exact `npm create` command for the current OSDK version).

**Step 3: App (days 3–9)**
Pages:
1. **Fleet list**: search aircraft by N-number/model; shows open-defect count per aircraft.
2. **Aircraft detail**: aircraft info, open defects (from the link), past inspections.
3. **Record inspection**: form, then calls the `Record Inspection` Action; validate
   before submitting and show the Action's validation errors when it rejects.
4. **Defect quick actions**: Assign / Close buttons calling Project 1's Actions.

Code patterns to show in the repo:
- A typed OSDK client in one module (`src/client.ts`); never hard-code tokens.
- Loading/empty/error states for every query (your current portfolio already does this well).
- Pagination when listing objects.
- Mobile-friendly layout (inspectors work on tablets).

**Step 4: Polish (day 10)**
README with screenshots, an architecture diagram (React app → OSDK → Ontology → datasets),
and a section on auth: how OAuth works here and why the token never sits in source code.

### Done when
- [ ] Sign in with Foundry OAuth works
- [ ] Reads objects plus linked objects, with pagination
- [ ] Writes through at least 2 Actions, and the changes appear in Project 1's Workshop app
- [ ] GitHub repo (without secrets!) + demo video

---

## Project 3: Engineering Data Validation Pipeline

### Pitch
"I rebuilt a rule-based engineering data validation workflow natively in Foundry, with
tested Python transforms, data expectations that stop bad builds, and a Workshop inbox where
users resolve exceptions."

### Why it's valuable
It's the Foundry version of your APSNG work at Accenture, so you can contrast the C#/Excel
approach with the Foundry-native approach in interviews. Rebuild the **concept** only, with
synthetic data; don't copy any Accenture code, rules or data.

### Data
Generate synthetic data with a Python script (keep the script in the repo):
- `parts`: part_number, description, drawing_set, revision, status
- `drawing_sets`: drawing_set, revision, effective_date, alternate_drawing_set
- Deliberately add about 5% bad rows: missing revisions, unknown drawing sets, circular
  alternates, superseded revisions still active, duplicate part numbers.

### Build steps
1. **Rules as code (days 1–4).** One Python module per rule with a shared interface:
   `rule_id`, `severity`, `check(df) -> failing_rows_df`. Rules: required fields,
   referential integrity (part → drawing set), revision is latest, alternate drawing set
   exists and isn't circular, no duplicate keys.
2. **Transforms (days 5–6).**
   - `validated/parts_clean`: rows passing every rule.
   - `validated/exceptions`: one row per (record, rule) failure with `exception_id`,
     `rule_id`, `severity`, `details`, `detected_at`.
3. **Data expectations (day 7).** Add expectations (primary key unique, required columns not
   null) on the outputs, so a broken build **fails instead of publishing bad data**. Be ready
   to explain the difference between a data expectation (protects the pipeline) and a
   validation rule (business logic that produces exceptions).
4. **Unit tests (day 7).** A pytest test per rule using small hand-made DataFrames.
5. **Ontology + Workshop (days 8–10).**
   - Object `ValidationException` (editable: `resolution_status`, `resolution_note`,
     `resolved_by`), linked to `Part`.
   - Actions: `Resolve`, `Mark as False Positive`, `Reopen`.
   - Workshop "Exceptions Inbox": open exceptions grouped by rule and severity, a resolution
     panel, and a trend chart of exceptions per build.

### Done when
- [ ] 5+ rules, each with tests
- [ ] Expectations fail the build on purpose when you inject a duplicate key (show this in the video)
- [ ] Inbox app with resolve flow
- [ ] README explaining the rule framework

---

## Project 4: Flight Delay Operations Cockpit

### Pitch
"I built a Foundry operations view over millions of US flight records using incremental
pipelines, with an Ontology for flights, airports and carriers and a Workshop cockpit that
drills from network-level delay hotspots down to individual flights."

### Why it's valuable
It shows you can work with **data at scale** and **incremental** processing, the area where
Foundry data engineering interviews dig deepest.

### Data
- **BTS On-Time Performance** (transtats.bts.gov → "Reporting Carrier On-Time Performance"),
  one CSV per month. Start with 3 months, then add one more month at a time to show
  incremental processing.
- Airport reference data (OurAirports `airports.csv`, a free open dataset) for names and
  coordinates.

### Build steps
1. **Incremental ingest (days 1–4).** Upload each month as a new transaction to the raw
   dataset. Write the clean transform with the `@incremental` decorator so each build
   processes only the new files. In the README, compare build times for full vs incremental
   builds.
2. **Aggregations (days 5–6).** `daily_airport_delays`, `carrier_performance`,
   `delay_causes` (BTS splits delays into carrier, weather, NAS, security and late
   aircraft). Partition by date.
3. **Ontology (days 7–8).** Flight (key = date + carrier + flight number + origin), Airport,
   Carrier; links Flight → origin Airport, Flight → destination Airport, Flight → Carrier.
   Because Flight is a large object type, explain your indexing and property choices.
4. **Workshop cockpit (days 9–13).**
   - Map of airports sized by delay volume (using the airport coordinates).
   - Delay-cause breakdown chart, carrier ranking table.
   - Drill-down: select an airport, then its worst days, then individual delayed flights.
5. **Stretch:** an `Ops Note` object plus Action so a user can annotate a disruption day
   (e.g. "weather event"), adding writeback to an analytics app.

### Done when
- [ ] 3+ months loaded incrementally, with the 4th month's build processing only new data
- [ ] Ontology with 3 object types plus links
- [ ] Cockpit with map, causes, and drill-down
- [ ] README with build-time comparison + demo video

---

## Updating the portfolio as you go

For each finished project, in `src/data/index.ts`:
```ts
{
  meta: 'Personal project · Palantir Foundry',
  title: '…',
  // status: 'in-progress',      ← delete this line
  description: 'Built …',        // past tense, add one concrete result
  tags: [...],
  sourceUrl: 'https://github.com/Shankar-94/…',
  liveUrl: 'https://www.loom.com/share/…',   // demo video
},
```
Then commit and redeploy. Add the same project to LinkedIn at the same time, with the
demo video attached.

## Interview prep: questions these projects prepare you for
- How did you choose primary keys for your object types, and what happens if a key changes?
- Data expectations vs validation logic: where does each belong?
- How does writeback work with Actions? What do submission criteria protect against?
- Incremental vs snapshot transforms: when would an incremental build fall back to a full rebuild?
- Workshop vs OSDK app: when would you choose each?
