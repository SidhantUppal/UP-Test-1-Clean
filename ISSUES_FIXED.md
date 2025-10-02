## Fixed Issues

### React Downgrade
```bash
npm install react@18.2.0 react-dom@18.2.0
Installed Missing Packages
npm install lucide-react dotenv mssql

Folder Restructuring and Import Corrections

(loci) → loci or LOCI_folders

Corrected loader imports:

// Before
import Loader from '../../../../LOCI/loader';

// After
import Loader from 'app/recycling_bin/LOCI_folders/LOCI/loader';


Fixed all LOCI pages and component imports accordingly.

Deleted duplicate/backup files: .backup, -old.*, duplicate directories.

Removed legacy Node.js services: 18 services under Web.Frontend/apps/services/.

Installed missing API module mssql.

Build Status

dotnet build: ✅

npm run build: ✅

Skipped/Deferred Issues

Some type exports still missing (BehaviourCategory, CheckItemType, EvidenceType) — requires types refactor.

Some legacy LOCI pages may still reference removed components.

Clean Codebase

Folder cleanup done.

NPM packages aligned with React 18.

All LOCI component paths corrected.
