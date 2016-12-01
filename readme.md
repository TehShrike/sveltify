# sveltify

A Browserify transform allowing you to require [Svelte](https://svelte.technology) templates.

Defaults to transforming all `.html` and `.svelte` files.  You can overwrite the transformed extensions with the `extensions` argument.


## Usage

```sh
browserify -t [ sveltify --extensions [.htmlz .svelte] ] myfile.js
```

## Source maps

Right now the source maps contain the JavaScript file generated from the template, which actually isn't as bad as you'd expect.  Full source maps should be workable once [this bug](https://github.com/sveltejs/svelte/issues/60) is fixed.

## License

[WTFPL](http://wtfpl2.com/)
