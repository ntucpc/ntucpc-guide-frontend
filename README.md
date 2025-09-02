# 程式解題社 講義

## Test and run

```bash
$ npm install
$ git submodule update --init --recursive
$ cp .env.example .env
$ ln -s ../guide public/guide
$ npm run dev
```

`ln -s ../guide public/guide` 的目的是讓圖片可以被 access，注意到這麼做只是為了方便在修改 guide 的同時看到網頁，圖片路徑會跟 production 有所不同。

**注意 refactor 後，guide repo 的版本需要是 `c1e3120` 的子孫，請先把 guide repo 切到 `frontend-refactor`。**（如果你不自己改路徑的話，它在 `guide`。）

你可能會想要使用在這個 repo 外面的 guide repo 而不是 submodule，比較方便的方式是**在 `public` 裡面**弄一個 symlink 到 guide repo 的根目錄，然後把 `GUIDE_RELATIVE_PATH` 改成那個 symlink（這個 path 相對於 frontend 根目錄，所以必須要有 `public/` 前綴），並確定 `.env` 裡面沒有設 `PUBLIC_ROOT`。不要直接把 guide 換成你要的 symlink，不然好像有時候會被 git 殺掉。舉例來說：

```bash
$ ln -s your-guide-relative-path public/guide
# 這裡的 your-guide-relative-path 是相對於 public/
# 所以例如你想要的路徑是相對於 frontend root 的 ../guide，那你就要寫 ../../guide
```

然後把 `GUIDE_RELATIVE_PATH` 改成 `public/guide/`。

`npm run build` 會生出一個目錄 `out`，裡面是蓋好的靜態網頁，建議做任何事之後確定可以順利 build。

## Production build

把 `PUBLIC_ROOT` 設成 `files/`（就像 `.env.example` 註解裡的那樣），然後

```bash
$ python3 build_public.py guide # guide 是放 guide 的目錄
$ npm run build
```

`build_public.py` 會把 `guide` 裡的以下檔案放進 `public/files`，相對路徑不變：

- `contributors/photos/<filename>`
- `content/<topic>/<article>/figure/<filename>`
- `problems/<source>/<problem>/figure/<filename>`

## 框架

- [next.js](https://nextjs.org/)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)

搭配 Typescript。

Done rendering MathJax from [jsdelivr](https://cdnjs.com/).

### Useful Links:

- [Plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md)
- [remark-directive](https://github.com/remarkjs/remark-directive)

## Convetions

### Commit

沒符合 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 的話會被 [commitlint](https://commitlint.js.org) 擋掉。

### Coding style

部份參考 [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)

## 其他注意事項

### Custom Icon

Custom SVG icon files are stored in `@/raw-icons` and can be converted into React components by running `npm run build:icons`.
**Note:** This command will overwrite all files in `@/icons`, so **do not modify anything in `@/icons` directly**. Instead, make changes only to files in `@/raw-icons`.

Currently, custom icons are used exclusively for chapter icons.

Since the workflow does not run `build:icons` automatically, the generated component files in `@/icons` must be committed and pushed to the repository. This design choice avoids requiring Guide authors to run extra build steps in order to get the frontend working.

Here are guidelines for raw SVG files:

- **Avoid using strokes.** In Inkscape, you can convert strokes to paths via: `Path → Stroke to Path`.
- **Do not include colors or stroke styles.** The root `<svg>` tag should contain `fill="currentColor"` to ensure that Tailwind classes (e.g., `text-blue-500`) can control the icon color.
- **Clean up non-standard attributes.** Inkscape may insert proprietary styles like `-inkscape-stroke:none`, even in plain SVG exports. These must be removed manually to satisfy strict TSX attribute checking.
