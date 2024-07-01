# 程式解題社 講義

## Test and run

```bash
$ npm install
$ git submodule update --init --recursive
$ cp .env.example .env
$ npm run dev
```

**注意 refactor 後，guide repo 的版本需要是 `c1e3120` 的子孫，請先把 guide repo 切到 `frontend-refactor`。**（如果你不自己改路徑的話，它在 `public/guide`。）

你可能會想要使用在這個 repo 外面的 guide repo 而不是 submodule，你可以在 public 裡面弄一個 symlink 到你喜歡的地方，然後把 `.env` 裡的 `GUIDE_RELATIVE_PATH` 改成那個 symlink。不要直接把 public/guide 換成你要的 symlink，不然好像有時候會被 git 殺掉。

`npm run build` 會生出一個目錄 `out`，裡面是蓋好的靜態網頁，建議做任何事之後確定可以順利 build。

## 框架
+ [next.js](https://nextjs.org/)
+ [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)

搭配 Typescript。

Done rendering MathJax from [jsdelivr](https://cdnjs.com/).

### Useful Links:
+ [Plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md)
+ [remark-directive](https://github.com/remarkjs/remark-directive)

## Convetions
### Commit
沒符合 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 的話會被 [commitlint](https://commitlint.js.org) 擋掉。

### Coding style
部份參考 [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
