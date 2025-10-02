**Time Estimate:** 30 min (25%)

## Critical Issues

- **React 19.1.1 is experimental**
  - Many libraries are incompatible. Builds fail frequently.
  - **Solution:** Downgrade to React 18.2.0.

- **Webpack build errors due to missing modules**
  - Examples:
    - `lucide-react` not found (`./app/(main)/incidents/behaviour/my-walks/page.tsx`)
    - `GlassCard`, `NeonButton`, `ActivityMatrix` not found in (loci) folders.
    - `../../../../../LOCI/loader` imports fail in LOCI pages and components.
    - `mssql` not found in API route `./app/api/admin/role-navigation-preferences/route.ts`.

## High Issues

- Multiple module path errors due to folders like `(loci)` inside `recycling_bin` causing path resolution issues.
- Duplicate and legacy directories causing confusion (`.backup`, `-old.*`, multiple Node.js services).

## Medium Issues

- Missing exports from types:
  - `BehaviourCategory`, `BehaviourReport` from `@/types/behaviour/reports`
  - `CheckItem`, `CheckItemType`, `EvidenceType` from `@/types/behaviour/walks`
  - `Location` from `@/types/common/location`

## Low Issues

- Environment variables injection warnings via dotenv.

## Execution Plan

1. Downgrade React to 18.2.0.
2. Install missing NPM packages (`lucide-react`, `dotenv`, `mssql`).
3. Fix folder structure:
   - Remove parentheses `(loci)` in folder names.
   - Update all relative imports to match the new folder structure.
4. Delete duplicate and backup folders.
5. Remove legacy Node.js services from `Web.Frontend/apps/services`.
6. Correct TypeScript export/import mismatches.
7. Run `npm install` and `npm run build` after each fix to verify success.

## Images


<img width="1920" height="1020" alt="image (49)" src="https://github.com/user-attachments/assets/9ed0c0f6-2122-4e35-be39-1a81b599a3d3" />
<img width="1920" height="1020" alt="image (47)" src="https://github.com/user-attachments/assets/d9e30ac6-6aa8-4eec-861f-ca6e07c619bc" />
<img width="1920" height="1020" alt="image (48)" src="https://github.com/user-attachments/assets/3b238dbe-5b2f-496f-a7a6-b3e447c8df70" />
