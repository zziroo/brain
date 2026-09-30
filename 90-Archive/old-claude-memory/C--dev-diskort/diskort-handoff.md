---
name: diskort-handoff
description: "Devir notu 2026-09-28 akşam — v0.8.1 live (desktop/Android OTA/iOS Ad Hoc), schema 21, iOS device onboarding automated; main has UNRELEASED client changes; release only when user says so"
metadata:
  node_type: memory
  type: project
  originSessionId: fed9b022-eedf-4139-8a63-e3a6d0cf883d
  modified: 2026-09-28T13:57:17.432Z
---

## Current state (2026-09-28 evening)
- **Production:** v0.8.1 on all platforms. Desktop auto-updates; Android APK is 0.7.0 (JS via OTA, runtime native-fbb196e1596b4cfa); iOS Ad Hoc IPA 0.8.1 (first iPhone: Jezzz).
- **Server:** schema 21 (17 account admin, 18 pins, 19 FTS search, 20 voice_sessions + invite_uses, 21 profile cosmetics). Deployed from main 560bdfc.
- **Nothing running:** no agents, no worktrees, no open local branches. Old merged branches remain on GitHub (auto mode blocked deleting them; the user can do it).
- **Feedback:** nothing open; #25 (cosmetics) tamamlandı.
- **SSH in auto mode:** the classifier blocks production SSH unless it matches the allow rules the user approved in `.claude/settings.local.json`. Those rules cover `ssh -i ~/.ssh/diskort_vps root@185.92.0.242 …`, with optional `-o` flags before or after `-i`. Use exactly that form. The rules do not cover scp.

## Unreleased on main (release only when the user says "sürüm çıkar")
- **Invite deep links:**
  - Web invite page: "Uygulamada aç" button on every platform (Android `intent://`, others `diskort://`) with a fallback hint; already deployed.
  - Desktop registers `diskort://` (installer.nsh HKCU key, `setAsDefaultProtocolClient` in packaged builds only, `src/main/deepLink.ts`, preload `invites` bridge); needs a desktop release.
  - Mobile: `src/app/+native-intent.ts` + client-core `pendingInvite.ts`; OTA only.
  - Logged-out link → login mode with a notice (guild invites cannot register).
- **Read-state sync (fae4ec3, server deployed):**
  - A READ_STATE_UPDATE gateway event clears badges on the user's other devices.
  - Mobile dismisses a channel's notifications when it is read. This needs the OTA.
  - Push notifications now go out one per message (Android per-message tag, iOS thread-id). This is live for all phones since the server deploy.
- **LiveKit post-leave warnings** (ping timeout) are no longer reported as client errors.
- **Not verified yet:** real Android/iOS, packaged Windows install.
- **Next version:** 0.8.2, or 0.9.0 if the user adds a bigger batch; ask.

## Rules decided with the user (keep)
- **Releases:** don't cut client releases on your own; accumulate on main. Server-only fixes may be deployed.
- **Registration:** new accounts ONLY via account invites (Ayarlar → Yönetim → Hesaplar ve davetler). Guild invites, even an admin's, only let existing accounts join. No exceptions, no setting.
- **Login screen:** the server address is hidden (5 taps on the logo); a non-default server shows a "Test sunucusu" warning.
- **Screen share:** fixed presets only (720p60 6M, 1080p30 8M, 1080p60 12M default/max); no runtime resolution/fps switching without real multi-user tests.
- **UI sounds:** one original set (marimba/wood, peak -8 dBFS); no sound packs, no SFX slider; never copy Discord's sounds.
- **Settings:** shared taxonomy in `packages/client-core/src/settingsSections.ts` for both platforms.
- **Profile cosmetics:** banner, theme, effects (code-drawn), 8 decorations + 4 frames as SVG in `apps/server/cosmetics` (rasterized by sharp, served from `/api/cosmetics`). Designs can be changed server-side without an app release. Frame adds 14 px padding only when set.
- **Mobile video:** tap → animated fullscreen (own modal), mute button bottom-left, no inline native controls.
- **Mobile gallery save:** own module `apps/mobile/modules/gallery` (MediaStore, Android 10+, no permissions). The user confirmed it works.
- **Versioning:** patch bump per release. An unpublished draft may be deleted and re-tagged with the same version (user OK'd).

## iOS (live)
- **Apple account:** team F892426M52, App ID `com.diskort.app` (push). Distribution cert/key/p12 in `C:\Users\yusuf\diskort-ios\`.
  - p12 was re-packed on 2026-09-28 with an ASCII password + 3DES; the password is in `p12-parola.txt`. NEVER print it. Old files are kept as `*-eski`.
  - Cert and profiles expire 2027-09-27.
- **Adding a device is automated:**
  1. The friend registers at https://diskort.ziroo.net/udid in Safari.
  2. The device appears in the admin panel tab "iPhone cihazları" → the user clicks Onayla.
  3. The server batches for 3 min and dispatches `ios.yml` with an encrypted devices input (`IOS_DEVICES_KEY`).
  4. The ASC API registers the device and creates a "Diskort Ad Hoc otomatik …" profile.
  5. The IPA is rebuilt from the latest tag and replaces the release asset (~15–40 min); status becomes "eklendi".
  - Verified end-to-end with Jezzz's device.
- **Secrets:** GitHub has APPLE_TEAM_ID, IOS_CERT_P12_BASE64, IOS_CERT_PASSWORD, IOS_PROVISIONING_PROFILE_BASE64 (manual fallback), ASC_KEY_ID/ASC_ISSUER_ID/ASC_KEY_P8 (key MFHXB9DW2D), IOS_DEVICES_KEY. Server `.env` has GITHUB_DISPATCH_TOKEN + IOS_DEVICES_KEY, written by the user via `/root/set-env.sh NAME < file` (stdin, never printed).
- **One place for secrets (user asked, 2026-09-28):** every Diskort key or secret file must also be copied to `OneDrive\Yedekler\Diskort\<kategori>`: android-imza, ota-imza, ios-imza, sunucu-ssh, uygulama-ayarlari. The index is in `BENIOKU.txt`. When a new key or secret file is created or changed, copy it there too and update `BENIOKU.txt`.
- **Secret handling:** the user enters secret values themselves. Give commands that read from files; on this PC use `cmd /c '… < file'`, because PowerShell 5.1 mangles non-ASCII and Get-Content encodings.
- **Known:** the public IPA embeds the profile's UDID list (low risk). A possible future step is serving the IPA only from our server.
- iOS may ask for Developer Mode on first launch.

## Admin panel
- https://diskort.ziroo.net/admin, for account admins only.
- Tabs include feedback, security, voice quality/history, infra, API health, servers and iPhone cihazları.
- Error logs persist 14 days in `/data/client-errors.jsonl` and `/data/server-errors.jsonl`. Other data: telemetry/*.jsonl, auth-log.jsonl, udids.jsonl + udid-status.json.

## Proposals not done (ask before doing)
- Channel categories.
- SignPath code signing (the user must apply; `docs/kod-imzalama.md`).
- Serving the IPA only from our server (hides the UDID list).
- Project skills for recurring procedures (release, deploy, migration check, feedback review, iOS device): suggested. The repo is public, so keep server/secret details out of repo files.

## Workflow
- **Coordination:** see [[orchestrator-mode]].
- **Migrations:** first take a fresh backup (`bash infra/backup-db.sh` on the server) and scp `latest.db.gz` to the scratchpad. Write a small check script and run it with `npx tsx` from `apps/server`; it opens the copy with `Store` and prints only user_version, table counts, foreign_key_check and integrity_check. Delete the copy afterwards.
- **Deploy:** backup if there is a migration, then `git pull`, then `docker compose up -d --no-deps --build api`. Static web (`apps/web`) needs only `git pull`.
- **Release:**
  - Bump `apps/desktop` + `apps/mobile` package.json, then tag and push.
  - Watch the `release.yml` run in the background with `gh run watch`.
  - Check the assets: exe, apk (reused when the fingerprint is unchanged), ipa, `ota-android.json`, `ota-ios.json`.
  - Publish with `gh release edit --draft=false --latest --notes-file`.
  - Wait for the server to pick it up (up to ~5 min).
  - GitHub asset uploads sometimes fail with HTTP 500; `gh run rerun --failed` fixes it.
- **Local test environment for UI checks:**
  - Run the server from a worktree on port 3100 with a temp DATA_DIR and seed accounts via the API.
  - Start the desktop dev app with `VITE_DEFAULT_SERVER=http://localhost:3100 DISKORT_PROFILE=<name> DISKORT_DEBUG_PORT=<port>`, logged in via CDP.
  - Afterwards kill every process and delete the temp data and `%APPDATA%\Diskort-dev-<name>`.
  - Stale processes from old worktrees can hold ports (5173); check before starting.
- **LiveKit restart:** only when no rooms are open.
- **Scheduled task** `diskort-geri-bildirim-kontrolu`: every 2 h, notify only.
- **Style:** reply in Turkish, short status messages. Don't run `python` in bash. Don't prettier existing files.
- **Bash heredocs:** the bash tool mangles backslashes in heredocs. Use the Write/Edit tools for code containing `\n` or regex.

Related: [[diskurt-project]], [[diskort-server]], [[diskort-feedback-workflow]], [[orchestrator-mode]]
