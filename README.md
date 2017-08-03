
# Postcss-Family

[![Build Status](https://travis-ci.org/mpeutz/postcss-family.svg?branch=master)](https://travis-ci.org/mpeutz/postcss-family)   [![Coverage Status](https://coveralls.io/repos/github/mpeutz/postcss-family/badge.svg?branch=master)](https://coveralls.io/github/mpeutz/postcss-family?branch=master)

PostCSS-Family is a partial port of [Family.scss](https://lukyvj.github.io/family.scss/).

> Family is a set of **26** smart Postcss functions which will help you to manage
> the style of `:nth-child`'ified elements, in an easy and classy way.
> *- Family.scss*


## Usage

You can call the family command using the at rule `@fam` followed by the appropriate keyword and parameter (if applicable).

:warning: requires a postcsss nesting plugin called after postcss-family

```css
/* input.css */
ul li {
  background: red;

  @fam first(3) {
    background: blue;
  }
}
```

```css
/* output.css */
ul li {
  background: red;
}
ul li:nth-child(-n + 3) {
  background: blue;
}

```

## PostCSS-Family Available keywords

#### Sequence Queries

- first
- last
- after-first
- from-end
- between
- even-between
- odd-between
- n-between
- all-but
- each
- every
- first-from-last
- middle
- all-but-first-last



#### Quantity Queries

- first-of
- last-of
- at-least
- at-most
- in-between

#### No Parameter Queries

- first-child
- even
- odd
- all-but-first
- all-but-last
- first-last
- unique
- only

This port is is missing the child-index mixin.
