# 程式解題社 講義

## Test and run

```bash
$ npm install
$ git submodule update --init --recursive
$ cp .env.example .env
$ npm run dev
```

## 框架
+ [next.js](https://nextjs.org/)
+ [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)

搭配 Typescript。

Trying to render MathJax from [jsdelivr](https://www.jsdelivr.com/).

### Usefule Links:
+ [Plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md)
+ [remark-directive](https://github.com/remarkjs/remark-directive)

## Convetions
### Commit
沒符合 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 的話會被 [commitlint](https://commitlint.js.org) 擋掉。

### Coding style
部份參考 [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
