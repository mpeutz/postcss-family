import postcss from 'postcss';
import test from 'ava';

var plugin = require('../lib/family.js');
function run(t, input, output, opts = {}) {
  return postcss([plugin(opts), require('postcss-nested')]).process(input)
    .then(result => {
      let parsedOut = result.css.replace(/\n|\r/g, " ");
      t.deepEqual(parsedOut, output);
      t.deepEqual(result.warnings().length, 0);
    });
}

test('handles first of (n)', t => {
  return run(t,
    '.family { @fam first(3) { margin: 0; } }',
    '.family:nth-child(-n + 3) { margin: 0 }'
  );
});

test('handles last of (n)', t => {
  return run(t,
    '.family { @fam last(2) { margin: 0; } }',
    '.family:nth-last-child(-n + 2) { margin: 0 }'
  );
});

test('handles after-first of (n)', t => {
  return run(t,
    '.family { @fam after-first(4) { margin: 0; } }',
    '.family:nth-child(n + 5) { margin: 0 }'
  );
});

test('handles from-end of (n)', t => {
  return run(t,
    '.family { @fam from-end(2) { margin: 0; } }',
    '.family:nth-last-child(2) { margin: 0 }'
  );
});

test('handles between (n1, n2)', t => {
  return run(t,
    '.family { @fam between(2,4) { margin: 0; } }',
    '.family:nth-child(n + 2):nth-child(-n + 4) { margin: 0 }'
  );
});

test('handles even-between (n1, n2)', t => {
  return run(t,
    '.family { @fam even-between(3,7) { margin: 0; } }',
    '.family:nth-child(even):nth-child(n + 3):nth-child(-n + 7) { margin: 0 }'
  );
});

test('handles odd-between (n1, n2)', t => {
  return run(t,
    '.family { @fam odd-between(2,14) { margin: 0; } }',
    '.family:nth-child(odd):nth-child(n + 2):nth-child(-n + 14) { margin: 0 }'
  );
});


test('handles n-between (n1, n2, n3)', t => {
  return run(t,
    '.family { @fam n-between(1,1,8) { margin: 0; } }',
    '.family:nth-child(1n):nth-child(n + 1):nth-child(-n + 8) { margin: 0 }'
  );
});

test('handles all-but of (n)', t => {
  return run(t,
    '.family { @fam all-but(2) { margin: 0; } }',
    '.family:not(:nth-child(2)) { margin: 0 }'
  );
});

test('handles each of (n)', t => {
  return run(t,
    '.family { @fam each(2) { margin: 0; } }',
    '.family:nth-child(2n) { margin: 0 }'
  );
});

test('handles first-from-last of (n)', t => {
  return run(t,
    '.family { @fam first-from-last(2) { margin: 0; } }',
    '.family:nth-child(2), .family:nth-last-child(2) { margin: 0 }'
  );
});

test('handles middle of (n)', t => {
  return run(t,
    '.family { @fam middle(12) { margin: 0; } }',
    '.family:nth-child(6) { margin: 0 }'
  );
});

test('handles all-but-first-last of (n)', t => {
  return run(t,
    '.family { @fam all-but-first-last(6) { margin: 0; } }',
    '.family:nth-child(n + 6):nth-last-child(n + 6) { margin: 0 }'
  );
});

test('handles first-of (n)', t => {
  return run(t,
    '.family { @fam first-of(6) { margin: 0; } }',
    '.family:nth-last-child(6):first-child { margin: 0 }'
  );
});

test('handles last-of (n)', t => {
  return run(t,
    '.family { @fam last-of(6) { margin: 0; } }',
    '.family:nth-of-type(6):nth-last-of-type(1) { margin: 0 }'
  );
});

test('handles at-least of (n)', t => {
  return run(t,
    '.family { li { @fam at-least(6) { margin: 0; } } }',
    '.family li:nth-last-child(n + 6), .family li:nth-last-child(n + 6) ~ li { margin: 0 }'
  );
});

test('handles at-most of (n)', t => {
  return run(t,
    '.family { li { @fam at-most(6) { margin: 0; } } }',
    '.family li:nth-last-child(-n + 6):first-child, .family li:nth-last-child(-n + 6):first-child ~ li { margin: 0 }'
  );
});

test('handles exactly of (n)', t => {
  return run(t,
    '.family { li { @fam exactly(6) { margin: 0; } } }',
    '.family li:nth-last-child(6):first-child ~ li { margin: 0 }'
  );
});

test('handles in-between of (n1, n2)', t => {
  return run(t,
    '.family { li { @fam in-between(6,11) { margin: 0; } } }',
    '.family li:nth-last-child(n + 6):nth-last-child(-n + 11):first-child,.family li:nth-last-child(n + 6):nth-last-child(-n + 11):first-child ~ li { margin: 0 }'
  );
});

test('handles first-child', t => {
  return run(t,
    '.family { @fam first-child { margin: 0; } }',
    '.family:first-of-type { margin: 0 }'
  );
});

test('handles last-child', t => {
  return run(t,
    '.family { @fam last-child { margin: 0; } }',
    '.family:last-of-type { margin: 0 }'
  );
});

test('handles even', t => {
  return run(t,
    '.family { @fam even { margin: 0; } }',
    '.family:nth-child(even) { margin: 0 }'
  );
});

test('handles odd', t => {
  return run(t,
    '.family { @fam odd { margin: 0; } }',
    '.family:nth-child(odd) { margin: 0 }'
  );
});

test('handles all but first', t => {
  return run(t,
    '.family { @fam all-but-first { margin: 0; } }',
    '.family:not(:first-child) { margin: 0 }'
  );
});

test('handles all but last', t => {
  return run(t,
    '.family { @fam all-but-last { margin: 0; } }',
    '.family:not(:last-child) { margin: 0 }'
  );
});

test('handles first-last', t => {
  return run(t,
    '.family { @fam first-last { margin: 0; } }',
    '.family:first-child, .family:last-child { margin: 0 }'
  );
});

test('handles unique', t => {
  return run(t,
    '.family { @fam unique { margin: 0; } }',
    '.family:only-child { margin: 0 }'
  );
});

test('handles only', t => {
  return run(t,
    '.family { @fam only { margin: 0; } }',
    '.family:only-child { margin: 0 }'
  );
});

test('handles not-unique', t => {
  return run(t,
    '.family { @fam not-unique { margin: 0; } }',
    '.family:not(:only-child) { margin: 0 }'
  );
});