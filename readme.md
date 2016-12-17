# sveltify

A Browserify transform allowing you to require [Svelte](https://svelte.technology) templates.

Defaults to transforming all `.html` and `.svelte` files.  You can overwrite the transformed extensions with the `extensions` argument.


## Usage

```sh
browserify -t [ sveltify --extensions [.htmlz .svelte] ] myfile.js
```

## License

[WTFPL](http://wtfpl2.com/)
