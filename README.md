# M2A2: Sip Trail: Café Crawl Program

**Kind:** take-home practice. Do it on your own time before the next meeting. Searching, AI and helping each other are allowed, because this is practice; record what you used in `SOURCES-AND-ASSISTANCE.md`. The lab exam is closed book, so make sure you understand every line you submit.

This is the first piece of **Sip Trail**, the guide to Pampanga's cafés, milk tea shops and matcha bars that you build all term. The demo had one section per idea; a café crawl has stops inside stops, so you decide the outline yourself.

## Before you start

Start the activity with the shared-lab launcher, exactly as in M1A0: follow the [setup guide](SETUP.md) to download and run `start-activity.sh` in Mac Terminal or Windows Git Bash, then clone your private repository `m2a2-CLASSCODE-USERNAME` in VS Code. Check the branch, remote and author before you start. Then install the test tools once:

```sh
npm ci
```

## What to build

The program for a one-day café crawl through Pampanga (for example Angeles, San Fernando and Clark) in `src/index.html`:

- the full skeleton and head, with a title and a meta description that name your crawl;
- one `h1` for the crawl, then at least **three stops**, each a `section` with an `h2` naming the café, milk tea shop or matcha bar;
- inside at least one stop, **two or more drinks to try**, each with an `h3`;
- every time written with the `<time>` element and a machine-readable `datetime` attribute;
- a style sheet at `src/css/style.css`, linked from the head. It may be empty.

Real places are welcome. Visiting them is not required.

## Concepts to research

- How heading levels show which part belongs inside which.
- When to use `section` and when `article`.
- Writing the `href` for a file in a subfolder.
- The `datetime` formats `<time>` accepts.

## How it is graded

6 test points for structure: skeleton, head, heading outline without skipped levels, sections, `time` elements, and the style sheet path. 4 rubric points for organization and labelling.

Every activity also checks `student.json`: fill in your full name, student number, school email, class code **2006**, GitHub username, `room` and `pcNumber`, all as text.

## Check and save your work

Open your page in the browser and look at it in the developer tools' device toolbar at phone size. Then run the checks:

```sh
npm test
```

The tests in your repository are a guide. The instructor grades from the course's own copy of the tests, so do not edit the tests to make them pass. In VS Code, open **Source Control**, commit your files with a short message, choose **Push**, and check that the commit appears on GitHub.

## Submit the exact commit link in Canvas

Open your repository's commit history on GitHub, open the commit with your finished work, copy its full URL (it contains **/commit/**), and submit it in the Canvas assignment for M2A2 using the Website URL option. Submit the commit page, not the repository home page or a screenshot.
