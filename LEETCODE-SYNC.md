# LeetCode Machines sync

The source is the ChatGPT Page `page_6acb13823a848191a93e7f433967c91e`
([Leetcode machines](https://chatgpt.com/space/page_6acb13823a848191a93e7f433967c91e)).
A Codex heartbeat in the “Sync LeetCode Machines page” chat checks it every two hours.
It uses the authenticated Pages connector; this is not a GitHub Actions job.
The local Codex app must be running with source Page and GitHub access.

`content/leetcode-machines.json` records the last published title, ordered ordinary
Markdown blocks, and exported asset mappings. Exclude agent instruction blocks.
Do not publish access metadata, user IDs, comments, or unrelated Pages.

To publish a content update:

1. Start from current `origin/main` in a clean checkout. Preserve unrelated edits.
2. Read the complete source Page. Compare its title and ordered Markdown with the
   snapshot. Read failures or incomplete responses must never erase site content.
3. Export any referenced files or visualizations using the Page reference tools to
   `assets/leetcode-machines/`, preserving functional HTML machines. Map exact source
   reference strings to relative asset paths in the snapshot's `assets` object.
   Verify linked assets and inspect active HTML before publishing. If an asset cannot
   be exported, report the issue and retain the last complete published version.
4. Update the snapshot without rewriting or completing the author's prose.
5. Run `npm ci` when dependencies are absent or changed, then `npm run build`.
   The generator sanitizes note HTML and rejects unexported internal references.
6. Check the rendered content, links, and `git diff --check`. Stage only the sync
   snapshot, generated page, and required assets. Commit and push to `main` only
   when content changed. Never force-push. On concurrent upstream changes, refresh
   and reapply the content update before pushing.

The homepage link lives under “On this site” and points to
`leetcode-machines.html`. GitHub Pages serves the root of `main`.
