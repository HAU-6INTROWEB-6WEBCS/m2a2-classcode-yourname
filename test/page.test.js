// Adapted from the course engine's INTROWEB m1a1 Vitest/jsdom checks.
// See NOTICE for source attribution and license information.
import { describe, expect, it } from "vitest"
import { existsSync, readFileSync } from "node:fs"
import { JSDOM } from "jsdom"

const src = new URL("../src/", import.meta.url)
const html = existsSync(new URL("index.html", src)) ? readFileSync(new URL("index.html", src), "utf8") : ""
const page = new JSDOM(html).window.document
const identity = JSON.parse(readFileSync(new URL("../student.json", import.meta.url), "utf8"))
const meta = (name) => page.querySelector(`head meta[name="${name}"]`)?.getAttribute("content")?.trim() ?? ""
const sheet = () => [...page.querySelectorAll("head link[rel~=stylesheet]")].map((l) => l.getAttribute("href") ?? "")
const comments = () => {
  const w = page.createTreeWalker(page, 128); let n = 0
  while (w.nextNode()) n++
  return n
}

const skeleton = () => {
  it("declares the HTML5 doctype, English and UTF-8", () => {
    expect(page.doctype?.name.toLowerCase(), "Start with <!DOCTYPE html>.").toBe("html")
    expect(page.documentElement.getAttribute("lang"), "Set lang=\"en\".").toBe("en")
    expect(page.querySelector("head meta[charset]")?.getAttribute("charset")?.toLowerCase()).toBe("utf-8")
  })
  it("has a viewport meta element and a meta description", () => {
    expect(meta("viewport"), "Add the viewport meta element.").toMatch(/width=device-width/)
    expect(meta("description").length, "Write a meta description.").toBeGreaterThan(10)
  })
}
const DATETIME = /^(\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?|\d{2}:\d{2}(:\d{2}(\.\d+)?)?|\d{4}-\d{2}|P.+)$/

describe("M2A2: Sip Trail Café Crawl Program", () => {
  skeleton()
  it("has a title", () => {
    expect(page.title.trim().length, "Name your crawl in the title.").toBeGreaterThan(3)
  })
  it("has one h1 and at least three stops, each a section with an h2", () => {
    expect(page.querySelectorAll("h1").length, "Use exactly one h1.").toBe(1)
    const stops = [...page.querySelectorAll("section")].filter((s) => s.querySelector(":scope > h2"))
    expect(stops.length, "Add three or more sections with an h2.").toBeGreaterThanOrEqual(3)
  })
  it("lists two or more drinks with h3 inside a stop", () => {
    const sections = [...page.querySelectorAll("section")]
    expect(sections.some((s) => s.querySelectorAll("h3").length >= 2), "Add two drinks with h3 in one stop.").toBe(true)
  })
  it("never skips a heading level", () => {
    const hs = page.querySelectorAll("h1, h2, h3, h4, h5, h6")
    expect(hs.length, "Add headings.").toBeGreaterThan(0)
    let last = 0
    for (const h of hs) {
      const level = Number(h.tagName[1])
      expect(level - last, `${h.tagName} "${h.textContent.trim()}" skips a level.`).toBeLessThanOrEqual(1)
      last = level
    }
  })
  it("writes times with time elements and valid datetime values", () => {
    const times = [...page.querySelectorAll("time")]
    expect(times.length, "Use <time> for the times.").toBeGreaterThan(0)
    for (const t of times) expect(t.getAttribute("datetime") ?? "", `Give "${t.textContent.trim()}" a valid datetime.`).toMatch(DATETIME)
  })
  it("links the style sheet in the css folder", () => {
    expect(sheet(), "Link css/style.css from the head.").toContain("css/style.css")
    expect(existsSync(new URL("css/style.css", src)), "Create src/css/style.css.").toBe(true)
  })
})

describe("Student identity in your private copy", () => {
  it("contains the required details as non-empty text", () => {
    for (const field of ["fullName", "studentNumber", "studentEmail", "classCode", "githubAccount", "room", "pcNumber"]) {
      expect(typeof identity[field], `Keep ${field} as text.`).toBe("string")
      expect(identity[field]?.trim(), `Fill in ${field} in student.json.`).toBeTruthy()
    }
  })

  it("uses class code 2006", () => {
    expect(identity.classCode).toBe("2006")
  })
})
