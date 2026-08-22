## Appendix - Tests

### What & How To Test

Automated test comes with benefits that helps us write better code and makes it easy to refactor, while bugs are caught earlier in the process.  
 Consider trade-offs of what and how to test to achieve confidence application is working as intended, while writing and maintaining tests doesn't slow the team down.

✅ Do:

- Implement test to be short, explicit, and pleasant to work with. Intent of a test should be immediately visible.
- Strive for AAA pattern, to maintain clean, organized, and understandable unit tests.
  - Arrange - Setup preconditions or the initial state necessary for the test case. Create necessary objects and define input values.
  - Act - Perform the action you want to unit test (invoke a method, triggering an event etc.). **Strive for minimal number of actions**.
  - Assert - Validate the outcome against expectations. **Strive for minimal number of asserts**.  
    A rule "unit tests should fail for exactly one reason" doesn't need to apply always, but it can indicate a code smell if there are tests with many asserts in a codebase.
- As mentioned in [function conventions](#functions) try to keep them pure, and impure one small and focused.  
  It makes them easy to test, by passing args and observing return values, since we will **rarely need to mock dependencies**.
- Strive to write tests in a way your app is used by a user, meaning test business logic.  
  E.g. For a specific user role or permission, given some input, we receive the expected output from the process.
- Make tests as isolated as possible, where they don't depend on order of execution and should run independently with its own local storage, session storage, data, cookies etc.
  Test isolation speeds up the test run, improves reproducibility, makes debugging easier and prevents cascading test failures.
- Tests should be resilient to changes.
  - Black box testing - Always test only implementation that is publicly exposed, don't write fragile tests on how implementation works internally.
  - Query HTML elements based on attributes that are unlikely to change. Order of priority must be followed as specified in [Testing Library](https://testing-library.com/docs/queries/about/#priority) - [role](https://testing-library.com/docs/queries/byrole), [label](https://testing-library.com/docs/queries/bylabeltext), [placeholder](https://testing-library.com/docs/queries/byplaceholdertext), [text contents](https://testing-library.com/docs/queries/bytext), [display value](https://testing-library.com/docs/queries/bydisplayvalue), [alt text](https://testing-library.com/docs/queries/byalttext), [title](https://testing-library.com/docs/queries/bytitle), [test ID](https://testing-library.com/docs/queries/bytestid).
  - If testing with a database then make sure you control the data. If test are run against a staging environment make sure it doesn't change.

❌ Don't:

- Don't test implementation details. When refactoring code, tests shouldn't change.
- Don't re-test the library/framework.
- Don't mandate 100% code coverage for applications.
- Don't test third-party dependencies. Only test what your team controls (package, API, microservice etc.). Don't test external sites links, third party servers, packages etc.
- Don't test just to test. Every test should provide meaningful confidence.

### Test Description

All test descriptions must follow naming convention as `it('should ... when ...')`.

<Rule href="https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/valid-title.md#mustmatch">
  {`'vitest/valid-title': [
    'error',
    {
      mustMatch: { it: [/should.*when/u.source, "Test title must include 'should' and 'when'"] },
    },
  ]`}
</Rule>

```ts
// ❌ Avoid
it('accepts ISO date format where date is parsed and formatted as YYYY-MM');
it('after title is confirmed user description is rendered');

// ✅ Name test description as it('should ... when ...')
it('should return parsed date as YYYY-MM when input is in ISO date format');
it('should render user description when title is confirmed');
```


### Snapshot

Snapshot tests are discouraged to avoid fragility, which leads to a "just update it" mindset to make all tests pass.  
Exceptions can be made, with strong rationale behind them, where test output has short and clear intent about what's actually being tested (e.g., design system library critical elements that shouldn't deviate).
