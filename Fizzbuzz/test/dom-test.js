import { Selector } from "testcafe";
const body = Selector("body");

const submission =
  process.env.SUBMISSION || "https://swkane.github.io/fizzbuzz/";

fixture`Fizzbuzz`.page(submission);

test("body should not be empty", async t => {
  await t.expect(body.innerText).notEql("");
});

test("body should contain at least one Fizz", async t => {
  await t.expect(body.innerText).contains("Fizz");
});

test("body should contain at least one Buzz", async t => {
  await t.expect(body.innerText).contains("Buzz");
});

test("body should contain at least one FizzBuzz", async t => {
  await t.expect(body.innerText).contains("FizzBuzz");
});
