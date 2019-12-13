MathJax.Hub.Config({
                jax: ["input/TeX","output/SVG"],
                extensions: ["tex2jax.js"],
                showProcessingMessages: false,
                messageStyle: "none",
                showMathMenu: false,
                tex2jax: {
                	inlineMath: [['$','$'], ['\\(','\\)']],
                	processEscapes: true,
           		},
            	TeX: {extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]},
           		SVG: {linebreaks: { automatic: true}},
            	"HTML-CSS": { linebreaks: { automatic: true } }
            });