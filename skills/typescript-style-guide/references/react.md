## Appendix - React

Since React components and hooks are also functions, the respective [function conventions](#functions) apply.

### Props To State

In general, avoid using props as initial state because the state will not update when the props change. This can lead to bugs that are hard to track, unintended side effects, and difficulty testing.  
When there is truly a use case for using a prop as initial state, the prop must be prefixed with `initial` (e.g. `initialProduct`, `initialSort` etc.)

```tsx
// ❌ Avoid using props to state
type FooProps = {
  productName: string;
  userId: string;
};

export const Foo = ({ productName, userId }: FooProps) => {
  const [productName, setProductName] = useState(productName);
  ...

// ✅ Use prop prefix `initial` when there is a rationale for it
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

- All container components have the suffix "Container" or "Page" `[ComponentName]Container|Page`. Use the "Page" suffix to indicate that a component is an actual web page.
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
- Should follow [function conventions](#functions) as much as possible.
- No API integration.
- Structure:
  ```
  ProductItem/
  ├─ index.tsx
  ├─ ProductItem.stories.tsx
  └─ ProductItem.test.tsx
  ```

#### UI - Design system

- Globally reusable or shared components used throughout the whole codebase.
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
- Use React compound components when components should belong and work together: `menu`, `accordion`, `navigation`, `tabs`, `list`, etc.  
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
- As in many programming languages, function arguments can be passed to the next function and on to the next etc.  
  React components are no different, so prop drilling should not become an issue.  
  If prop drilling truly becomes an issue as the app scales, try refactoring render methods or local state in parent components, or use composition.
- Data fetching is only allowed in container components.
- The use of a server-state library is encouraged ([TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview), [Apollo Client](https://github.com/apollographql/apollo-client) etc.).
- Use of client-state library for global state is discouraged.  
  Reconsider whether something should be truly global across the application, e.g. `themeMode` or `Permissions`, or whether it can be put in server state (e.g. user settings from the `/me` endpoint). If global state is still truly needed, use [Zustand](https://github.com/pmndrs/zustand) or [Context](https://react.dev/reference/react/createContext).
