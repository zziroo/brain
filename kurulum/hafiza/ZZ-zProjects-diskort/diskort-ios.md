---
name: diskort-ios
description: "Diskort iOS Ad Hoc distribution — Apple account, automated device onboarding, secrets locations and handling"
metadata:
  node_type: memory
  type: reference
  originSessionId: a7b70327-6e05-4060-a15b-293ddac27162
  modified: 2026-09-29T12:54:37.861Z
---

- **Apple account:** App ID `com.diskort.app` (push); team ID is in the GitHub secret APPLE_TEAM_ID. Distribution cert/key/p12, ASC keys, dispatch token and the p12 password file are in OneDrive `Yedekler/Diskort/ios-imza/` (Windows: `C:\Users\yusuf\OneDrive\...`; Mac: the OneDrive app folder, usually `~/Library/CloudStorage/OneDrive-*/`) — NEVER print their contents. Only needed when renewing certs/profiles or re-uploading secrets. Cert/profiles expire 2027-09-27.
- **Adding a device (automated):** friend registers at https://diskort.ziroo.net/udid → admin "iPhone cihazları" → Onayla → server batches 3 min, dispatches `ios.yml` (encrypted devices input, `IOS_DEVICES_KEY`) → ASC API registers device + new "Diskort Ad Hoc otomatik …" profile → IPA rebuilt from latest tag (~15–40 min). iOS may ask for Developer Mode on first launch.
- **Secrets:** GitHub secrets APPLE_TEAM_ID, IOS_CERT_P12_BASE64, IOS_CERT_PASSWORD, IOS_PROVISIONING_PROFILE_BASE64, ASC_KEY_ID/ASC_ISSUER_ID/ASC_KEY_P8, IOS_DEVICES_KEY. Server `.env` has GITHUB_DISPATCH_TOKEN + IOS_DEVICES_KEY, written by the user via `/root/set-env.sh NAME < file`.
- **One place for secrets:** every Diskort key/secret file also goes to `OneDrive\Yedekler\Diskort\<kategori>` (android-imza, ota-imza, ios-imza, sunucu-ssh, uygulama-ayarlari); index `BENIOKU.txt`. Never delete `OneDrive\Yedekler`.
- **Secret handling:** the user enters secret values; give commands reading from files; on this PC use `cmd /c '… < file'`.
- Known: public IPA embeds the UDID list (low risk).

Related: [[diskort-server]], [[diskort-baslangic]]
