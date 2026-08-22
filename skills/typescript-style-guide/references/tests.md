## Appendix - Tests

### What & How To Test

Automated tests help us write better code, make refactoring easier, and catch bugs earlier in the process.  
Consider the trade-offs of what and how to test to gain confidence that the application is working as intended, while ensuring that writing and maintaining tests doesn't slow the team down.

✅ Do:

- Keep tests short, explicit, and pleasant to work with. A test's intent should be immediately visible.
- Strive to follow the AAA pattern to maintain clean, organized, and understandable unit tests.
  - Arrange - Setup preconditions or the initial state necessary for the test case. Create necessary objects and define input values.
  - Act - Perform the action you want to unit test (invoke a method, triggering an event etc.). **Strive for minimal number of actions**.
  - Assert - Validate the outcome against expectations. **Strive for minimal number of asserts**.  
    The rule "unit tests should fail for exactly one reason" doesn't always need to apply, but tests with many assertions can indicate a code smell.
- As mentioned in [function conventions](#functions), try to keep functions pure and impure ones small and focused.  
  This makes them easy to test by passing arguments and observing return values, since we will **rarely need to mock dependencies**.
- Strive to write tests based on how a user interacts with your app, meaning test business logic.  
  E.g. for a specific user role or permission, given some input, we receive the expected output from the process.
- Make tests as isolated as possible so they don't depend on execution order and can run independently with their own local storage, session storage, data, cookies etc.
  Test isolation speeds up the test run, improves reproducibility, makes debugging easier and prevents cascading test failures.
- Tests should be resilient to changes.
  - Black box testing - Always test only publicly exposed behavior. Don't write fragile tests based on how the implementation works internally.
  - Query HTML elements based on attributes that are unlikely to change. Order of priority must be followed as specified in [Testing Library](https://testing-library.com/docs/queries/about/#priority) - [role](https://testing-library.com/docs/queries/byrole), [label](https://testing-library.com/docs/queries/bylabeltext), [placeholder](https://testing-library.com/docs/queries/byplaceholdertext), [text contents](https://testing-library.com/docs/queries/bytext), [display value](https://testing-library.com/docs/queries/bydisplayvalue), [alt text](https://testing-library.com/docs/queries/byalttext), [title](https://testing-library.com/docs/queries/bytitle), [test ID](https://testing-library.com/docs/queries/bytestid).
  - If testing with a database, make sure you control the data. If tests are run against a staging environment, make sure it doesn't change.

❌ Don't:

- Don't test implementation details. When refactoring code, tests shouldn't change.
- Don't re-test the library/framework.
- Don't mandate 100% code coverage for applications.
- Don't test third-party dependencies. Only test what your team controls (package, API, microservice etc.). Don't test external site links, third-party servers, packages etc.
- Don't test just to test. Every test should provide meaningful confidence.

### Test Description

All test descriptions must follow the naming convention `it('should ... when ...')`.

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
Exceptions can be made with strong rationale when the snapshot is short and clearly communicates what's being tested (e.g., critical design system library elements that shouldn't deviate).
