# Configuration

Project configuration starts in build workflow file located at `.github\workflows\build.yml`.
This file defines where the `Azure/static-web-apps-deploy` action shall look for the application.

          app_location: "/"
          output_location: "build"
          app_build_command: "yarn build"
          skip_api_build: true
