var postcss = require('postcss');

var FAM = [
    'first',
    'last',
    'after-first',
    'from-end',
    'between',
    'even-between',
    'odd-between',
    'n-between',
    'all-but',
    'each',
    'every',
    'first-from-last',
    'middle',
    'all-but-first-last',
    'first-of',
    'last-of',
    'at-least',
    'at-most',
    'exactly',
    'in-between',
    'first-child',
    'last-child',
    'even',
    'odd',
    'all-but-first',
    'all-but-last',
    'first-last',
    'unique',
    'only',
    'not-unique'
];

var FAMONLY = [
    'first-child',
    'last-child',
    'even',
    'odd',
    'all-but-first',
    'all-but-last',
    'first-last',
    'unique',
    'only',
    'not-unique'
]


function familyFn(fam, select) {
        var thisRule = fam.parent;
        var rule = postcss.rule({selector: select});
            rule.append(fam.nodes);
        thisRule.append(rule);
        fam.remove();
}


module.exports = postcss.plugin('postcss-family', function family(options) {

    return function (css, result) {

        options = options || {};
        var cloned;

        css.walkAtRules('fam', function (fam) {

            // get rule
            var name = fam.params.split(/\(/, 1)[0].trim();
            var parent = fam.parent;

           
            if ((FAMONLY.indexOf(name) <= -1)) {
                    var param = fam.params.match(/\(([^\)]+)\)/)[1];
                    var num = param.split(',');
                }

            // check if the family rule is available
            if (FAM.indexOf(name) <= -1) {
                throw fam.error('Unknown rule ' + name);
            }

            switch (name) {
                case 'first':
                    if (num[0] == 1) {
                        familyFn(fam,'&:first-child');
                    } else {
                        familyFn(fam,'&:nth-child(-n + ' + num[0] + ')');
                    }
                    break;
                case 'last':
                    if (num[0] == 1) {
                        familyFn(fam,'&:last-child');
                    } else {
                        familyFn(fam,'&:nth-last-child(-n + ' + num[0] + ')');
                    }
                    break;
                case 'after-first':
                    familyFn(fam, '&:nth-child(n + ' + (parseInt(num[0]) + 1) +')');
                    break; 
                case 'from-end':
                    familyFn(fam, '&:nth-last-child(' + num[0] + ')');
                    break;
                case 'between':
                    if (num.length < 2) {
                        throw fam.error('Family rule between takes 2 properties')
                    } else {
                        familyFn(fam, '&:nth-child(n + ' + num[0] + '):nth-child(-n + ' + num[1] + ')');
                    }
                    break;
                case 'even-between':
                    if (num.length < 2) {
                        throw fam.error('Family rule even-between takes 2 properties')
                    } else {
                        familyFn(fam, '&:nth-child(even):nth-child(n + ' + num[0] + '):nth-child(-n + ' + num[1] + ')');
                    }
                    break;
                case 'odd-between':
                if (num.length < 2) {
                        throw fam.error('Family rule odd-between takes 2 properties')
                    } else {
                    familyFn(fam, '&:nth-child(odd):nth-child(n + ' + num[0] + '):nth-child(-n + ' + num[1] + ')');
                    }
                    break;
                case 'n-between':
                    if (num.length < 3) {
                        throw fam.error('Family rule n-between takes 3 properties')
                    } else {
                        familyFn(fam, '&:nth-child(' + num[0] + 'n):nth-child(n + ' + num[1] + '):nth-child(-n + ' + num[2] + ')');
                    }
                    break;
                case 'all-but':
                    familyFn(fam, '&:not(:nth-child(' + num[0] + '))');
                    break;
                case 'each':
                    familyFn(fam, '&:nth-child(' + num[0] + 'n)');
                    break;
                case 'every':
                    familyFn(fam, '&:nth-child(' + num[0] + 'n)');
                    break;
                case 'first-from-last':
                    familyFn(fam, '&:nth-child(' + num[0] + '), &:nth-last-child(' + num[0] + ')');
                    break;
                case 'middle':
                    familyFn(fam, '&:nth-child(' + Math.round(num[0] / 2) +')');
                    break;
                case 'all-but-first-last':
                    familyFn(fam, '&:nth-child(n + ' + num[0] + '):nth-last-child(n + ' + num[0] + ')');
                    break;
                case 'first-of':
                    familyFn(fam, '&:nth-last-child(' + num[0] + '):first-child');
                    break;
                case 'last-of':
                    familyFn(fam, '&:nth-of-type(' + num[0] + '):nth-last-of-type(1)');
                    break;
                case 'at-least':
                    var father = fam.parent.selector;
                    familyFn(fam,  '&:nth-last-child(n + ' + num[0] + '), &:nth-last-child(n + ' + num[0] + ') ~ ' + father);
                    break;
                case 'at-most':
                    var father = fam.parent.selector;
                    familyFn(fam, '&:nth-last-child(-n + ' + num[0] + '):first-child, &:nth-last-child(-n + ' + num[0] + '):first-child ~ ' + father);
                    break;
                case 'exactly':
                    var father = fam.parent.selector;
                    familyFn(fam, '&:nth-last-child(' + num[0] + '):first-child ~ ' + father);
                    break;
                case 'in-between':
                    if (num.length < 2) {
                        throw fam.error('Family rule in-between takes 2 properties')
                    } else {
                    var father = fam.parent.selector;
                    familyFn(fam, '&:nth-last-child(n + ' + num[0] + '):nth-last-child(-n + ' + num[1] + '):first-child,&:nth-last-child(n + ' + num[0] + '):nth-last-child(-n + ' + num[1] + '):first-child ~ ' + father);
                    }
                    break;
                case 'first-child':
                    familyFn(fam, '&:first-of-type');
                    break;
                case 'last-child':
                    familyFn(fam, '&:last-of-type');
                    break;
                case 'even':
                    familyFn(fam, '&:nth-child(even)');
                    break;
                case 'odd':
                    familyFn(fam, '&:nth-child(odd)');
                    break;
                case 'all-but-first':
                    familyFn(fam, '&:not(:first-child)');
                    break;
                case 'all-but-last':
                    familyFn(fam, '&:not(:last-child)');
                    break;
                case 'first-last':
                    familyFn(fam, '&:first-child, &:last-child');
                    break;
                case 'unique':
                    familyFn(fam, '&:only-child');
                    break;
                case 'only':
                    familyFn(fam, '&:only-child');
                    break;
                case 'not-unique':
                    familyFn(fam, '&:not(:only-child)');
                    break;
               }
        });
    }

});

