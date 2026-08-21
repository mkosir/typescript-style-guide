## Source Organization

### Code Collocation

- Every application or package in monorepo has project files/folders organized and grouped **by feature**.
- **Collocate code as close as possible to where it's relevant.**
- Deep folder nesting should not represent an issue.

### Imports

Import paths can be relative, starting with `./` or `../`, or they can be absolute `@common/utils`.

To make import statements more readable and easier to understand:

- **Relative** imports `./sortItems` must be used when importing files within the same feature, that are 'close' to each other, which also allows moving feature around the codebase without introducing changes in these imports.
- **Absolute** imports `@common/utils` must be used in all other cases.
- **All** imports must be auto sorted by tooling e.g. [prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports), [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md) etc.

```ts
// ❌ Avoid
import { bar, foo } from '../../../../../../distant-folder';

// ✅ Use
import { locationApi } from '@api/locationApi';

import { foo } from '../../foo';
import { bar } from '../bar';
import { baz } from './baz';
```

### Project Structure

Example frontend monorepo project, where every application has file/folder grouped by feature:

```shell
apps/
├─ product-manager/
│  ├─ common/
│  │  ├─ components/
│  │  │  ├─ Button/
│  │  │  ├─ ProductTitle/
│  │  │  ├─ ...
│  │  │  └─ index.tsx
│  │  ├─ consts/
│  │  │  ├─ paths.ts
│  │  │  └─ ...
│  │  ├─ hooks/
│  │  └─ types/
│  ├─ modules/
│  │  ├─ HomePage/
│  │  ├─ ProductAddPage/
│  │  ├─ ProductPage/
│  │  ├─ ProductsPage/
│  │  │  ├─ api/
│  │  │  │  └─ useGetProducts/
│  │  │  ├─ components/
│  │  │  │  ├─ ProductItem/
│  │  │  │  ├─ ProductsStatistics/
│  │  │  │  └─ ...
│  │  │  ├─ utils/
│  │  │  │  └─ filterProductsByType/
│  │  │  └─ index.tsx
│  │  ├─ ...
│  │  └─ index.tsx
│  ├─ eslint.config.mjs
│  ├─ package.json
│  └─ tsconfig.json
├─ warehouse/
├─ admin-dashboard/
└─ ...
```

- `modules` folder is responsible for implementation of each individual page, where all custom features for that page are being implemented (components, hooks, utils functions etc.).
- `common` folder is responsible for implementations that are truly used across application. Since it's a "global folder" it should be used sparingly.  
  If same component e.g. `common/components/ProductTitle` starts being used on more than one page, it shall be moved to common folder.

In case using frontend framework with file-system based router (e.g. Nextjs), `pages` folder serves only as a router, where its responsibility is to define routes (no business logic implementation).

Example backend project structure with file/folder grouped by feature:

```shell
product-manager/
├─ dist/
├── database/
│   ├── migrations/
│   │   ├── 20220102063048_create_accounts.ts
│   │   └── ...
│   └── seeders/
│       ├── 20221116042655-feeds.ts
│       └── ...
├─ docker/
├─ logs/
├─ scripts/
├─ src/
│  ├─ common/
│  │  ├─ consts/
│  │  ├─ middleware/
│  │  ├─ types/
│  │  └─ ...
│  ├─ dao/
│  │  ├─ user/
│  │  └─ ...
│  ├─ modules/
│  │   ├── admin/
│  │   │   ├── account/
│  │   │   │   ├── account.model.ts
│  │   │   │   ├── account.controller.ts
│  │   │   │   ├── account.route.ts
│  │   │   │   ├── account.service.ts
│  │   │   │   ├── account.validation.ts
│  │   │   │   ├── account.test.ts
│  │   │   │   └── index.ts
│  │   │   └── ...
│  │   ├── general/
│  │   │   ├── general.model.ts
│  │   │   ├── general.controller.ts
│  │   │   ├── general.route.ts
│  │   │   ├── general.service.ts
│  │   │   ├── general.validation.ts
│  │   │   ├── general.test.ts
│  │   │   └── index.ts
│  │   ├─ ...
│  │   └─ index.tsx
│  └─ ...
├─ ...
├─ eslint.config.mjs
├─ package.json
└─ tsconfig.json
```
