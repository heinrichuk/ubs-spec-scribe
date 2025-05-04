
#!/bin/bash

# Create frontend directory structure
mkdir -p frontend/src/components/layout
mkdir -p frontend/src/components/ui
mkdir -p frontend/src/hooks
mkdir -p frontend/src/lib
mkdir -p frontend/src/pages
mkdir -p frontend/public

# Copy source files
cp -r src/components/layout/* frontend/src/components/layout/
cp -r src/components/ui/* frontend/src/components/ui/
cp -r src/hooks/* frontend/src/hooks/
cp -r src/lib/* frontend/src/lib/
cp -r src/pages/* frontend/src/pages/
cp src/index.css frontend/src/index.css

# Copy public files
cp -r public/* frontend/public/

# Make the script executable
chmod +x migrate-to-frontend.sh
