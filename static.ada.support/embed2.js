! function() {
    "use strict";
    var e, t, n, r, o = {
            740: function(e, t) {
                var n = this && this.__assign || function() {
                    return n = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                        return e
                    }, n.apply(this, arguments)
                };
                t.__esModule = !0, t.createStorage = void 0;
                var r = "Cannot access Web Storage API";
                t.createStorage = function(e) {
                    var t;
                    try {
                        t = "local" === e ? localStorage : sessionStorage
                    } catch (e) {
                        console.warn(r)
                    }
                    var o = {
                        setItem: function(e, n) {
                            try {
                                null == t || t.setItem(e, JSON.stringify(n))
                            } catch (e) {
                                console.warn(r)
                            }
                        },
                        getItem: function(e) {
                            try {
                                var n = null == t ? void 0 : t.getItem(e);
                                return n && JSON.parse(n)
                            } catch (e) {
                                return console.warn(r), null
                            }
                        },
                        removeItem: function(e) {
                            try {
                                null == t || t.removeItem(e)
                            } catch (e) {
                                console.warn(r)
                            }
                        },
                        clear: function() {
                            try {
                                null == t || t.clear()
                            } catch (e) {
                                console.warn(r)
                            }
                        },
                        setFnItem: function(e, t) {
                            var r, a = o.getItem("ada-functional-storage") || {},
                                i = n(n({}, a), ((r = {})[e] = t, r));
                            o.setItem("ada-functional-storage", i)
                        },
                        getFnItem: function(e) {
                            var t = o.getItem("ada-functional-storage");
                            return t && t[e] || null
                        }
                    };
                    return o
                }
            },
            110: function(e, t, n) {
                t.wG = void 0;
                var r = n(740);
                t.wG = (0, r.createStorage)("local"), (0, r.createStorage)("session")
            },
            226: function(e, t, n) {
                n.a(e, (async function(e, t) {
                    try {
                        var r = n(375);
                        window.__AdaEmbedLoaderVersion = "aa8ecb488d3272495251fe0aa7875df8f5b83914", await (0, r.S)(), t()
                    } catch (e) {
                        t(e)
                    }
                }), 1)
            },
            375: function(e, t, n) {
                n.d(t, {
                    S: function() {
                        return f
                    }
                });
                class r extends Error {
                    constructor(e) {
                        super(e), this.name = "AdaEmbedLoaderError"
                    }
                }
                const o = function(e) {
                        window.__AdaEmbedLoaderInitialActionQueue = window.__AdaEmbedLoaderInitialActionQueue || [];
                        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                        return window.__AdaEmbedLoaderInitialActionQueue.push({
                            method: e,
                            arguments: n
                        }), new Promise((t => {
                            window.addEventListener(`__ada-embed-action-resolve-${e}`, (e => {
                                t(e.detail)
                            }))
                        }))
                    },
                    a = "The format of manifest file is incorrect";
                var i = n(110);
                const c = e => {
                        try {
                            return i.wG.getItem(e)
                        } catch (e) {
                            return null
                        }
                    },
                    s = (e, t) => {
                        try {
                            i.wG.setItem(e, t)
                        } catch (e) {}
                    },
                    u = async () => {
                        const e = (e => {
                            const t = new RegExp("[?&]__ada-embed-version=([^&#]*)").exec(window.location.href);
                            return t ? decodeURI(t[1]) : null
                        })();
                        if (e) return e;
                        if (window.__AdaEmbedVersion) return window.__AdaEmbedVersion;
                        return (e => {
                            if (!(e => {
                                    if ("object" != typeof e) throw new r(a);
                                    if (null === e) throw new r(a);
                                    const t = e;
                                    if (!Array.isArray(t.versions)) throw new r(a);
                                    if (!t.versions.length) throw new r(a);
                                    if ("string" != typeof t.versions[0].hash) throw new r(a);
                                    if (!t.versions[0].hash) throw new r(a);
                                    if ("number" != typeof t.versions[0].weight) throw new r(a);
                                    if (1 !== t.versions.reduce(((e, t) => e + t.weight), 0)) throw new r('The sum of version weights must be "1"');
                                    return !0
                                })(e)) throw new r(a);
                            const t = JSON.stringify(e);
                            if (t === c("ada-embed-manifest-cache")) {
                                const e = c("ada-embed-assigned-version");
                                if (e) return e
                            }
                            const n = Math.random(),
                                {
                                    versions: o
                                } = e;
                            let {
                                hash: i
                            } = o[o.length - 1];
                            for (let e = 0; e < o.length; e += 1) {
                                const t = o[e];
                                if (n <= t.weight) {
                                    i = t.hash;
                                    break
                                }
                            }
                            return s("ada-embed-assigned-version", i), s("ada-embed-manifest-cache", t), i
                        })(await (async () => (await fetch("https://static.ada.support/embed-manifest.json")).json())())
                    },
                    f = async () => {
                        if (window.__AdaEmbedLoaderScriptLoaded) throw new Error("Ada Embed script is included more than once, skipping.");
                        window.__AdaEmbedLoaderScriptLoaded = !0, window.adaEmbed = {
                            closeCampaign: function() {
                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                return o("closeCampaign", ...t)
                            },
                            start: function() {
                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                return o("start", ...t)
                            },
                            stop: () => o("stop"),
                            toggle: () => o("toggle"),
                            deleteHistory: () => o("deleteHistory"),
                            reset: function() {
                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                return o("reset", ...t)
                            },
                            setMetaFields: function() {
                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                return o("setMetaFields", ...t)
                            },
                            setSensitiveMetaFields: function() {
                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                return o("setSensitiveMetaFields", ...t)
                            },
                            getInfo: () => o("getInfo"),
                            createProactive: function() {
                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                return o("createProactive", ...t)
                            },
                            trackEvent: function() {
                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                return o("trackEvent", ...t)
                            },
                            triggerCampaign: function() {
                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                return o("triggerCampaign", ...t)
                            },
                            subscribeEvent: (e, t) => o("subscribeEvent", e, t),
                            unsubscribeEvent: function() {
                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                return o("unsubscribeEvent", ...t)
                            },
                            evaluateCampaignConditions: function() {
                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                return o("evaluateCampaignConditions", ...t)
                            }
                        }, (e => {
                            const t = `https://static.ada.support/embed2.${e.slice(0,7)}.js`,
                                n = document.createElement("script");
                            n.type = "text/javascript", n.async = !0, n.src = t, document.getElementsByTagName("head")[0].appendChild(n)
                        })(await u())
                    }
            }
        },
        a = {};

    function i(e) {
        var t = a[e];
        if (void 0 !== t) return t.exports;
        var n = a[e] = {
            exports: {}
        };
        return o[e].call(n.exports, n, n.exports, i), n.exports
    }
    e = "function" == typeof Symbol ? Symbol("webpack queues") : "__webpack_queues__", t = "function" == typeof Symbol ? Symbol("webpack exports") : "__webpack_exports__", n = "function" == typeof Symbol ? Symbol("webpack error") : "__webpack_error__", r = function(e) {
        e && !e.d && (e.d = 1, e.forEach((function(e) {
            e.r--
        })), e.forEach((function(e) {
            e.r-- ? e.r++ : e()
        })))
    }, i.a = function(o, a, i) {
        var c;
        i && ((c = []).d = 1);
        var s, u, f, d = new Set,
            l = o.exports,
            w = new Promise((function(e, t) {
                f = t, u = e
            }));
        w[t] = l, w[e] = function(e) {
            c && e(c), d.forEach(e), w.catch((function() {}))
        }, o.exports = w, a((function(o) {
            var a;
            s = function(o) {
                return o.map((function(o) {
                    if (null !== o && "object" == typeof o) {
                        if (o[e]) return o;
                        if (o.then) {
                            var a = [];
                            a.d = 0, o.then((function(e) {
                                i[t] = e, r(a)
                            }), (function(e) {
                                i[n] = e, r(a)
                            }));
                            var i = {};
                            return i[e] = function(e) {
                                e(a)
                            }, i
                        }
                    }
                    var c = {};
                    return c[e] = function() {}, c[t] = o, c
                }))
            }(o);
            var i = function() {
                    return s.map((function(e) {
                        if (e[n]) throw e[n];
                        return e[t]
                    }))
                },
                u = new Promise((function(t) {
                    (a = function() {
                        t(i)
                    }).r = 0;
                    var n = function(e) {
                        e !== c && !d.has(e) && (d.add(e), e && !e.d && (a.r++, e.push(a)))
                    };
                    s.map((function(t) {
                        t[e](n)
                    }))
                }));
            return a.r ? u : i()
        }), (function(e) {
            e ? f(w[n] = e) : u(l), r(c)
        })), c && (c.d = 0)
    }, i.d = function(e, t) {
        for (var n in t) i.o(t, n) && !i.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        })
    }, i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, i(226)
}();