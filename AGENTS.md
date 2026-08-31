# AGENTS.md

## Project
- Hybrid app: Spring Boot 4.0.2 (Java 25) + static single-page wedding invitation (`index.html` 60KB at repo root). Remote `serajusong/serajusong.github.io` (GitHub Pages). Date: 2026-10-17, venue 오하 하우스 웨딩.
- Two web serving modes: Spring Boot via `src/main/java/com/example/demo/controller/MainController.java:8` (`GET /` → Thymeleaf `index`) and direct static `index.html` for Pages.

## Commands — use `workdir="C:\\청첩"`
- Boot: `./gradlew bootRun` (`bootrun.md:1`) — requires Java 25 toolchain (`build.gradle:12`).
- Test: `./gradlew test` (JUnit Platform, `build.gradle:29`). Single test: `./gradlew test --tests "com.example.demo.DemoApplicationTests"`.
- Frontend dev: `npm run dev` → `vite` (`package.json:8`) — NOTE: no `vite.config.*` exists; vite runs with defaults.
- Build: `./gradlew build` (Gradle wrapper 8.x, `gradle/wrapper/`).

## Architecture Quirks
- `src/main/resources/application.properties:3` — `spring.thymeleaf.prefix=file:./` serves template from **filesystem root** (`./index.html`), not classpath `templates/`. Editing `src/main/resources/static/` alone won't affect Thymeleaf view; keep `index.html` and `asset/` at repo root in sync with `src/main/resources/static/asset/`.
- Assets duplicated: `asset/` (root, used by `index.html`) and `src/main/resources/static/asset/` (served by Spring). Update both when changing images/BGM.
- Entrypoints: `src/main/java/com/example/demo/DemoApplication.java:7` / `src/main/java/com/example/demo/controller/MainController.java:10`. All HTML/CSS/JS is inline in single `index.html` (~1500 lines) — no framework separation.
- Naver Maps: key in `key.md` (`ncpKeyId=f9zb7s7erg` in `index.html:8`) and `asset/image/` icons. Don't commit `key.md` (ignored but contains `Client Secret`).

## Gotchas
- Java 25 required — `build.gradle:13` enforces toolchain; lower JDK fails.
- `index.html` mixes Korean (UTF-8) — PowerShell `Get-Content` may garble; use `Read` tool or `Get-Content -Encoding UTF8`.
- Path contains non-ASCII `C:\청첩` — always quote with `-LiteralPath` in PowerShell; bash `workdir` param handles it automatically. Folder shows as `C:\ûø` in some shells due to encoding but same path.
- No CI/`.github/workflows`, no lint/format config. Verify manually via `bootRun` + browser.
- `package.json` test script is placeholder (`echo "Error: no test specified"`).
