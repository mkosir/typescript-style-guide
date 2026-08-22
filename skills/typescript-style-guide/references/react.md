## Appendix - React

Since React components and hooks are also functions, respective [function conventions](#functions) applies.

### Required & Optional Props

**Strive to have majority of props required and use optional props sparingly.**

Especially when creating new component for first/single use case majority of props should be required. When component starts covering more use cases, introduce optional props.  
There are potential exceptions, where component API needs to implement optional props from the start (e.g. shared components covering multiple use cases, UI design system components - button `isDisabled` etc.)

If component/hook becomes to complex it probably should be broken into smaller pieces.  
An exaggerated example where implementing 10 React components with 5 required props each, is better then implementing one "can do it all" component that accepts 50 optional props.

### Props as Discriminated Type

When applicable, use **discriminated types** to eliminate optional props. This approach reduces complexity in the component API and ensures that only the required props are passed based on the specific use case.

```ts
// ❌ Avoid optional props as they increase complexity and ambiguity in component APIs
type StatusProps = {
  data?: Products;
  title?: string;
  time?: number;
  error?: string;
};

// ✅ Prefer required props. If optional props are unavoidable,
// use a discriminated union to represent distinct use cases with required props.
type StatusSuccess = {
  status: 'success';
  data: Products;
  title: string;
};

type StatusLoading = {
  status: 'loading';
  time: number;
};

type StatusError = {
  status: 'error';
  error: string;
};

// Discriminated union 'StatusProps' ensures predictable component props with no optionals
type StatusProps = StatusSuccess | StatusLoading | StatusError;

export const Status = (props: StatusProps) => {
  switch (props.status) {
    case 'success':
      return <div>Title {props.title}</div>;
    case 'loading':
      return <div>Loading {props.time}</div>;
    case 'error':
      return <div>Error {props.error}</div>;
  }
};
```

### Props To State

In general avoid using props to state, since component will not update on prop changes. It can lead to bugs that are hard to track, with unintended side effects and difficulty testing.  
When there is truly a use case for using prop in initial state, prop must be prefixed with `initial` (e.g. `initialProduct`, `initialSort` etc.)

```tsx
// ❌ Avoid using props to state
type FooProps = {
  productName: string;
  userId: string;
};

export const Foo = ({ productName, userId }: FooProps) => {
  const [productName, setProductName] = useState(productName);
  ...

// ✅ Use prop prefix `initial`, when there is a rational use case for it
type FooProps = {
  initialProductName: string;
  userId: string;
};

export const Foo = ({ initialProductName, userId }: FooProps) => {
  const [productName, setProductName] = useState(initialProductName);
  ...
```

### Props Type

```tsx
// ❌ Avoid using React.FC type
type FooProps = {
  name: string;
  score: number;
};

export const Foo: React.FC<FooProps> = ({ name, score }) => {

// ✅ Use props argument with type
type FooProps = {
  name: string;
  score: number;
};

export const Foo = ({ name, score }: FooProps) => {...
```

### Component Types

#### Container

- All container components have postfix "Container" or "Page" `[ComponentName]Container|Page`. Use "Page" postfix to indicate component is an actual web page.
- Each feature has a container component (`AddUserContainer.tsx`, `EditProductContainer.tsx`, `ProductsPage.tsx` etc.)
- Includes business logic.
- API integration.
- Structure:
  ```
  ProductsPage/
  ├─ api/
  │  └─ useGetProducts/
  ├─ components/
  │  └─ ProductItem/
  ├─ utils/
  │  └─ filterProductsByType/
  └─ index.tsx
  ```

#### UI - Feature

- Representational components that are designed to fulfill feature requirements.
- Nested inside container component folder.
- Should follow [functions conventions](#functions) as much as possible.
- No API integration.
- Structure:
  ```
  ProductItem/
  ├─ index.tsx
  ├─ ProductItem.stories.tsx
  └─ ProductItem.test.tsx
  ```

#### UI - Design system

- Global Reusable/shared components used throughout whole codebase.
- Structure:
  ```
  Button/
  ├─ index.tsx
  ├─ Button.stories.tsx
  └─ Button.test.tsx
  ```

### Store & Pass Data

- Pass only the necessary props to child components rather than passing the entire object.
- Utilize storing state in the URL, especially for filtering, sorting etc.
- Don't sync URL state with local state.
- Consider passing data simply through props, using the URL, or composing children. Use global state (Zustand, Context) as a last resort.
- Use React compound components when components should belong and work together: `menu`, `accordion`,`navigation`, `tabs`, `list`, etc.  
  Always export compound components as:

  ```tsx
  // PriceList.tsx
  const PriceListRoot = ({ children }) => <ul>{children}</ul>;
  const PriceListItem = ({ title, amount }) => <li>Name: {name} - Amount: {amount}<li/>;

  // ❌
  export const PriceList = {
    Container: PriceListRoot,
    Item: PriceListItem,
  };
  // ❌
  PriceList.Item = Item;
  export default PriceList;

  // ✅
  export const PriceList = PriceListRoot as typeof PriceListRoot & {
    Item: typeof PriceListItem;
  };
  PriceList.Item = PriceListItem;

  // App.tsx
  import { PriceList } from "./PriceList";

  <PriceList>
    <PriceList.Item title="Item 1" amount={8} />
    <PriceList.Item title="Item 2" amount={12} />
  </PriceList>;
  ```

- UI components should show derived state and send events, nothing more (no business logic).
- As in many programming languages functions args can be passed to the next function and on to the next etc.  
  React components are no different, where prop drilling should not become an issue.  
  If with app scaling prop drilling truly becomes an issue, try to refactor render method, local states in parent components, using composition etc.
- Data fetching is only allowed in container components.
- Use of server-state library is encouraged ([TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview), [apollo client](https://github.com/apollographql/apollo-client) etc.).
- Use of client-state library for global state is discouraged.  
  Reconsider if something should be truly global across application, e.g. `themeMode`, `Permissions` or even that can be put in server-state (e.g. user settings - `/me` endpoint). If still global state is truly needed use [Zustand](https://github.com/pmndrs/zustand) or [Context](https://react.dev/reference/react/createContext).
