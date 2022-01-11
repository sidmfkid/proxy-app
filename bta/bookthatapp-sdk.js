!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.BookThatApp = t())
    : (e.BookThatApp = t());
})(window, function () {
  return (function (e) {
    var t = {};
    function r(n) {
      if (t[n]) return t[n].exports;
      var o = (t[n] = { i: n, l: !1, exports: {} });
      return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
    }
    return (
      (r.m = e),
      (r.c = t),
      (r.d = function (e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
      }),
      (r.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (r.t = function (e, t) {
        if ((1 & t && (e = r(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (
          (r.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var o in e)
            r.d(
              n,
              o,
              function (t) {
                return e[t];
              }.bind(null, o)
            );
        return n;
      }),
      (r.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return r.d(t, "a", t), t;
      }),
      (r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (r.p = ""),
      r((r.s = 9))
    );
  })([
    function (e, t, r) {
      "use strict";
      var n = r(3),
        o = r(11),
        i = Object.prototype.toString;
      function u(e) {
        return "[object Array]" === i.call(e);
      }
      function a(e) {
        return null !== e && "object" == typeof e;
      }
      function s(e) {
        return "[object Function]" === i.call(e);
      }
      function c(e, t) {
        if (null != e)
          if (("object" != typeof e && (e = [e]), u(e)))
            for (var r = 0, n = e.length; r < n; r++) t.call(null, e[r], r, e);
          else
            for (var o in e)
              Object.prototype.hasOwnProperty.call(e, o) &&
                t.call(null, e[o], o, e);
      }
      e.exports = {
        isArray: u,
        isArrayBuffer: function (e) {
          return "[object ArrayBuffer]" === i.call(e);
        },
        isBuffer: o,
        isFormData: function (e) {
          return "undefined" != typeof FormData && e instanceof FormData;
        },
        isArrayBufferView: function (e) {
          return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
            ? ArrayBuffer.isView(e)
            : e && e.buffer && e.buffer instanceof ArrayBuffer;
        },
        isString: function (e) {
          return "string" == typeof e;
        },
        isNumber: function (e) {
          return "number" == typeof e;
        },
        isObject: a,
        isUndefined: function (e) {
          return void 0 === e;
        },
        isDate: function (e) {
          return "[object Date]" === i.call(e);
        },
        isFile: function (e) {
          return "[object File]" === i.call(e);
        },
        isBlob: function (e) {
          return "[object Blob]" === i.call(e);
        },
        isFunction: s,
        isStream: function (e) {
          return a(e) && s(e.pipe);
        },
        isURLSearchParams: function (e) {
          return (
            "undefined" != typeof URLSearchParams &&
            e instanceof URLSearchParams
          );
        },
        isStandardBrowserEnv: function () {
          return (
            ("undefined" == typeof navigator ||
              "ReactNative" !== navigator.product) &&
            "undefined" != typeof window &&
            "undefined" != typeof document
          );
        },
        forEach: c,
        merge: function e() {
          var t = {};
          function r(r, n) {
            "object" == typeof t[n] && "object" == typeof r
              ? (t[n] = e(t[n], r))
              : (t[n] = r);
          }
          for (var n = 0, o = arguments.length; n < o; n++) c(arguments[n], r);
          return t;
        },
        extend: function (e, t, r) {
          return (
            c(t, function (t, o) {
              e[o] = r && "function" == typeof t ? n(t, r) : t;
            }),
            e
          );
        },
        trim: function (e) {
          return e.replace(/^\s*/, "").replace(/\s*$/, "");
        },
      };
    },
    function (e, t, r) {
      e.exports = r(10);
    },
    function (e, t, r) {
      "use strict";
      (function (t) {
        var n = r(0),
          o = r(14),
          i = { "Content-Type": "application/x-www-form-urlencoded" };
        function u(e, t) {
          !n.isUndefined(e) &&
            n.isUndefined(e["Content-Type"]) &&
            (e["Content-Type"] = t);
        }
        var a,
          s = {
            adapter:
              ("undefined" != typeof XMLHttpRequest
                ? (a = r(4))
                : void 0 !== t && (a = r(4)),
              a),
            transformRequest: [
              function (e, t) {
                return (
                  o(t, "Content-Type"),
                  n.isFormData(e) ||
                  n.isArrayBuffer(e) ||
                  n.isBuffer(e) ||
                  n.isStream(e) ||
                  n.isFile(e) ||
                  n.isBlob(e)
                    ? e
                    : n.isArrayBufferView(e)
                    ? e.buffer
                    : n.isURLSearchParams(e)
                    ? (u(t, "application/x-www-form-urlencoded;charset=utf-8"),
                      e.toString())
                    : n.isObject(e)
                    ? (u(t, "application/json;charset=utf-8"),
                      JSON.stringify(e))
                    : e
                );
              },
            ],
            transformResponse: [
              function (e) {
                if ("string" == typeof e)
                  try {
                    e = JSON.parse(e);
                  } catch (e) {}
                return e;
              },
            ],
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            validateStatus: function (e) {
              return e >= 200 && e < 300;
            },
          };
        (s.headers = {
          common: { Accept: "application/json, text/plain, */*" },
        }),
          n.forEach(["delete", "get", "head"], function (e) {
            s.headers[e] = {};
          }),
          n.forEach(["post", "put", "patch"], function (e) {
            s.headers[e] = n.merge(i);
          }),
          (e.exports = s);
      }.call(this, r(13)));
    },
    function (e, t, r) {
      "use strict";
      e.exports = function (e, t) {
        return function () {
          for (var r = new Array(arguments.length), n = 0; n < r.length; n++)
            r[n] = arguments[n];
          return e.apply(t, r);
        };
      };
    },
    function (e, t, r) {
      "use strict";
      var n = r(0),
        o = r(15),
        i = r(17),
        u = r(18),
        a = r(19),
        s = r(5),
        c =
          ("undefined" != typeof window &&
            window.btoa &&
            window.btoa.bind(window)) ||
          r(20);
      e.exports = function (e) {
        return new Promise(function (t, f) {
          var d = e.data,
            l = e.headers;
          n.isFormData(d) && delete l["Content-Type"];
          var p = new XMLHttpRequest(),
            h = "onreadystatechange",
            m = !1;
          if (
            ("undefined" == typeof window ||
              !window.XDomainRequest ||
              "withCredentials" in p ||
              a(e.url) ||
              ((p = new window.XDomainRequest()),
              (h = "onload"),
              (m = !0),
              (p.onprogress = function () {}),
              (p.ontimeout = function () {})),
            e.auth)
          ) {
            var g = e.auth.username || "",
              v = e.auth.password || "";
            l.Authorization = "Basic " + c(g + ":" + v);
          }
          if (
            (p.open(
              e.method.toUpperCase(),
              i(e.url, e.params, e.paramsSerializer),
              !0
            ),
            (p.timeout = e.timeout),
            (p[h] = function () {
              if (
                p &&
                (4 === p.readyState || m) &&
                (0 !== p.status ||
                  (p.responseURL && 0 === p.responseURL.indexOf("file:")))
              ) {
                var r =
                    "getAllResponseHeaders" in p
                      ? u(p.getAllResponseHeaders())
                      : null,
                  n = {
                    data:
                      e.responseType && "text" !== e.responseType
                        ? p.response
                        : p.responseText,
                    status: 1223 === p.status ? 204 : p.status,
                    statusText: 1223 === p.status ? "No Content" : p.statusText,
                    headers: r,
                    config: e,
                    request: p,
                  };
                o(t, f, n), (p = null);
              }
            }),
            (p.onerror = function () {
              f(s("Network Error", e, null, p)), (p = null);
            }),
            (p.ontimeout = function () {
              f(
                s(
                  "timeout of " + e.timeout + "ms exceeded",
                  e,
                  "ECONNABORTED",
                  p
                )
              ),
                (p = null);
            }),
            n.isStandardBrowserEnv())
          ) {
            var y = r(21),
              w =
                (e.withCredentials || a(e.url)) && e.xsrfCookieName
                  ? y.read(e.xsrfCookieName)
                  : void 0;
            w && (l[e.xsrfHeaderName] = w);
          }
          if (
            ("setRequestHeader" in p &&
              n.forEach(l, function (e, t) {
                void 0 === d && "content-type" === t.toLowerCase()
                  ? delete l[t]
                  : p.setRequestHeader(t, e);
              }),
            e.withCredentials && (p.withCredentials = !0),
            e.responseType)
          )
            try {
              p.responseType = e.responseType;
            } catch (t) {
              if ("json" !== e.responseType) throw t;
            }
          "function" == typeof e.onDownloadProgress &&
            p.addEventListener("progress", e.onDownloadProgress),
            "function" == typeof e.onUploadProgress &&
              p.upload &&
              p.upload.addEventListener("progress", e.onUploadProgress),
            e.cancelToken &&
              e.cancelToken.promise.then(function (e) {
                p && (p.abort(), f(e), (p = null));
              }),
            void 0 === d && (d = null),
            p.send(d);
        });
      };
    },
    function (e, t, r) {
      "use strict";
      var n = r(16);
      e.exports = function (e, t, r, o, i) {
        var u = new Error(e);
        return n(u, t, r, o, i);
      };
    },
    function (e, t, r) {
      "use strict";
      e.exports = function (e) {
        return !(!e || !e.__CANCEL__);
      };
    },
    function (e, t, r) {
      "use strict";
      function n(e) {
        this.message = e;
      }
      (n.prototype.toString = function () {
        return "Cancel" + (this.message ? ": " + this.message : "");
      }),
        (n.prototype.__CANCEL__ = !0),
        (e.exports = n);
    },
    function (e, t, r) {
      (function (e, n) {
        var o;
        /*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */ !(function (
          i
        ) {
          var u = t,
            a = (e && e.exports, "object" == typeof n && n);
          a.global !== a && a.window;
          var s = function (e) {
            this.message = e;
          };
          (s.prototype = new Error()).name = "InvalidCharacterError";
          var c = function (e) {
              throw new s(e);
            },
            f =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            d = /[\t\n\f\r ]/g,
            l = {
              encode: function (e) {
                (e = String(e)),
                  /[^\0-\xFF]/.test(e) &&
                    c(
                      "The string to be encoded contains characters outside of the Latin1 range."
                    );
                for (
                  var t,
                    r,
                    n,
                    o,
                    i = e.length % 3,
                    u = "",
                    a = -1,
                    s = e.length - i;
                  ++a < s;

                )
                  (t = e.charCodeAt(a) << 16),
                    (r = e.charCodeAt(++a) << 8),
                    (n = e.charCodeAt(++a)),
                    (u +=
                      f.charAt(((o = t + r + n) >> 18) & 63) +
                      f.charAt((o >> 12) & 63) +
                      f.charAt((o >> 6) & 63) +
                      f.charAt(63 & o));
                return (
                  2 == i
                    ? ((t = e.charCodeAt(a) << 8),
                      (r = e.charCodeAt(++a)),
                      (u +=
                        f.charAt((o = t + r) >> 10) +
                        f.charAt((o >> 4) & 63) +
                        f.charAt((o << 2) & 63) +
                        "="))
                    : 1 == i &&
                      ((o = e.charCodeAt(a)),
                      (u += f.charAt(o >> 2) + f.charAt((o << 4) & 63) + "==")),
                  u
                );
              },
              decode: function (e) {
                var t = (e = String(e).replace(d, "")).length;
                t % 4 == 0 && (t = (e = e.replace(/==?$/, "")).length),
                  (t % 4 == 1 || /[^+a-zA-Z0-9\/]/.test(e)) &&
                    c(
                      "Invalid character: the string to be decoded is not correctly encoded."
                    );
                for (var r, n, o = 0, i = "", u = -1; ++u < t; )
                  (n = f.indexOf(e.charAt(u))),
                    (r = o % 4 ? 64 * r + n : n),
                    o++ % 4 &&
                      (i += String.fromCharCode(255 & (r >> ((-2 * o) & 6))));
                return i;
              },
              version: "0.1.0",
            };
          void 0 ===
            (o = function () {
              return l;
            }.call(t, r, t, e)) || (e.exports = o);
        })();
      }.call(this, r(29)(e), r(30)));
    },
    function (e, t, r) {
      "use strict";
      r.r(t);
      var n = r(1),
        o = r.n(n),
        i = r(8),
        u = r.n(i);
      t.default = new /*!
       * BookThatApp JavaScript SDK
       * Version: 1.0
       * http://www.bookthatapp.com
       *
       * Copyright 2017 Zetya, Inc.
       */
      (function () {
        var e = "",
          t = {},
          r = { apiBaseUrl: "https://api.bookthatapp.com/", apiVersion: "v1" },
          n = {
            init: function (t, r) {
              return (e = t), n.configure(r), n;
            },
          };
        return (
          (n.makeRequest = function (n) {
            var i;
            (n.url = ((i = n.url), [r.apiBaseUrl, r.apiVersion, i].join(""))),
              (n.headers = n.headers || t || {}),
              e && (n.headers.Authorization = "Bearer " + e),
              (n.headers["Content-Type"] = "application/json"),
              Object.keys(t).length > 0 && (t = {});
            var u = o.a.interceptors.response.use(
                function (e) {
                  return e.data && e.data.data && (e.data = e.data.data), e;
                },
                function (e) {
                  return Promise.reject(e);
                }
              ),
              a = o()(n);
            return o.a.interceptors.response.eject(u), a;
          }),
          (n.configure = function (e) {
            for (var t in e) r[t] = e[t];
            return r;
          }),
          (n.getConfig = function () {
            return r;
          }),
          (n.headers = function (e) {
            for (var r in e) t[r] = e[r];
            return this;
          }),
          (n.auth = function (e) {
            var t = n.makeRequest({
              url: "/auth/",
              method: "post",
              data: { auth: e },
            });
            return (
              t
                .then(function (e) {
                  var t = e.data.jwt;
                  n.setToken(t);
                })
                .catch(function (e) {
                  n.setToken("");
                }),
              t
            );
          }),
          (n.setToken = function (t) {
            e = t;
          }),
          (n.getShop = function () {
            return "" == e ? "" : JSON.parse(u.a.decode(e.split(".")[1])).shop;
          }),
          (n.getReservations = function (e) {
            return n.makeRequest({
              url: "/reservations/",
              method: "get",
              params: e,
            });
          }),
          (n.getReservation = function (e) {
            return n.makeRequest({
              url: "/reservations/" + e.id,
              method: "get",
              params: e,
            });
          }),
          (n.createReservation = function (e) {
            return n.makeRequest({
              url: "/reservations",
              method: "post",
              data: e,
            });
          }),
          (n.confirmReservation = function (e) {
            return n.makeRequest({
              url: "/reservations/" + e.id + "/confirm",
              method: "put",
              data: e,
            });
          }),
          (n.updateReservation = function (e) {
            var t = e.id;
            return (
              delete e.id,
              n.makeRequest({
                url: "/reservations/" + t,
                method: "put",
                data: e,
              })
            );
          }),
          (n.deleteReservation = function (e) {
            var t = e.id;
            return (
              delete e.id,
              n.makeRequest({ url: "/reservations/" + t, method: "delete" })
            );
          }),
          (n.getBookings = function (e) {
            return n.makeRequest({
              url: "/bookings/",
              method: "get",
              params: e,
            });
          }),
          (n.getBooking = function (e) {
            return n.makeRequest({
              url: "/bookings/" + e.id,
              method: "get",
              params: e,
            });
          }),
          (n.createBooking = function (e) {
            return n.makeRequest({ url: "/bookings", method: "post", data: e });
          }),
          (n.updateBooking = function (e) {
            var t = e.id;
            return (
              delete e.id,
              n.makeRequest({ url: "/bookings/" + t, method: "put", data: e })
            );
          }),
          (n.deleteBooking = function (e) {
            var t = e.id;
            return (
              delete e.id,
              n.makeRequest({ url: "/bookings/" + t, method: "delete" })
            );
          }),
          (n.getBlackouts = function (e) {
            return n.makeRequest({
              url: "/blackouts",
              method: "get",
              params: e,
            });
          }),
          (n.getBlackout = function (e) {
            return n.makeRequest({
              url: "/blackouts/" + e.id,
              method: "get",
              params: e,
            });
          }),
          (n.createBlackout = function (e) {
            return n.makeRequest({
              url: "/blackouts",
              method: "post",
              data: e,
            });
          }),
          (n.updateBlackout = function (e) {
            var t = e.id;
            return (
              delete e.id,
              n.makeRequest({ url: "/blackouts/" + t, method: "put", data: e })
            );
          }),
          (n.deleteBlackout = function (e) {
            var t = e.id;
            return (
              delete e.id,
              n.makeRequest({ url: "/blackouts/" + t, method: "delete" })
            );
          }),
          (n.getProducts = function (e) {
            return n.makeRequest({
              url: "/products",
              method: "get",
              params: e,
            });
          }),
          (n.getProduct = function (e) {
            return n.makeRequest({
              url: "/products/" + e.id,
              method: "get",
              params: e,
            });
          }),
          (n.getFrames = function (e) {
            return n.makeRequest({ url: "/frames/", method: "get", params: e });
          }),
          (n.getCourseFrames = function (e) {
            return n.makeRequest({
              url: "/courses/",
              method: "get",
              params: e,
            });
          }),
          (n.getBlocks = function (e) {
            return n.makeRequest({ url: "/blocks", method: "get", params: e });
          }),
          (n.search = function (e) {
            return n.makeRequest({ url: "/search/", method: "get", params: e });
          }),
          (n.getLocationInventories = function (e) {
            return n.makeRequest({
              url: "/location_inventories",
              method: "get",
              params: e,
            });
          }),
          (n.updateLocationInventories = function (e) {
            return n.makeRequest({
              url: "/location_inventories",
              method: "put",
              data: e,
            });
          }),
          (n.getLocations = function () {
            return n.makeRequest({ url: "/locations" });
          }),
          n
        );
      })();
    },
    function (e, t, r) {
      "use strict";
      var n = r(0),
        o = r(3),
        i = r(12),
        u = r(2);
      function a(e) {
        var t = new i(e),
          r = o(i.prototype.request, t);
        return n.extend(r, i.prototype, t), n.extend(r, t), r;
      }
      var s = a(u);
      (s.Axios = i),
        (s.create = function (e) {
          return a(n.merge(u, e));
        }),
        (s.Cancel = r(7)),
        (s.CancelToken = r(27)),
        (s.isCancel = r(6)),
        (s.all = function (e) {
          return Promise.all(e);
        }),
        (s.spread = r(28)),
        (e.exports = s),
        (e.exports.default = s);
    },
    function (e, t) {
      function r(e) {
        return (
          !!e.constructor &&
          "function" == typeof e.constructor.isBuffer &&
          e.constructor.isBuffer(e)
        );
      }
      /*!
       * Determine if an object is a Buffer
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */
      e.exports = function (e) {
        return (
          null != e &&
          (r(e) ||
            (function (e) {
              return (
                "function" == typeof e.readFloatLE &&
                "function" == typeof e.slice &&
                r(e.slice(0, 0))
              );
            })(e) ||
            !!e._isBuffer)
        );
      };
    },
    function (e, t, r) {
      "use strict";
      var n = r(2),
        o = r(0),
        i = r(22),
        u = r(23);
      function a(e) {
        (this.defaults = e),
          (this.interceptors = { request: new i(), response: new i() });
      }
      (a.prototype.request = function (e) {
        "string" == typeof e &&
          (e = o.merge({ url: arguments[0] }, arguments[1])),
          ((e = o.merge(n, { method: "get" }, this.defaults, e)).method =
            e.method.toLowerCase());
        var t = [u, void 0],
          r = Promise.resolve(e);
        for (
          this.interceptors.request.forEach(function (e) {
            t.unshift(e.fulfilled, e.rejected);
          }),
            this.interceptors.response.forEach(function (e) {
              t.push(e.fulfilled, e.rejected);
            });
          t.length;

        )
          r = r.then(t.shift(), t.shift());
        return r;
      }),
        o.forEach(["delete", "get", "head", "options"], function (e) {
          a.prototype[e] = function (t, r) {
            return this.request(o.merge(r || {}, { method: e, url: t }));
          };
        }),
        o.forEach(["post", "put", "patch"], function (e) {
          a.prototype[e] = function (t, r, n) {
            return this.request(
              o.merge(n || {}, { method: e, url: t, data: r })
            );
          };
        }),
        (e.exports = a);
    },
    function (e, t) {
      var r,
        n,
        o = (e.exports = {});
      function i() {
        throw new Error("setTimeout has not been defined");
      }
      function u() {
        throw new Error("clearTimeout has not been defined");
      }
      function a(e) {
        if (r === setTimeout) return setTimeout(e, 0);
        if ((r === i || !r) && setTimeout)
          return (r = setTimeout), setTimeout(e, 0);
        try {
          return r(e, 0);
        } catch (t) {
          try {
            return r.call(null, e, 0);
          } catch (t) {
            return r.call(this, e, 0);
          }
        }
      }
      !(function () {
        try {
          r = "function" == typeof setTimeout ? setTimeout : i;
        } catch (e) {
          r = i;
        }
        try {
          n = "function" == typeof clearTimeout ? clearTimeout : u;
        } catch (e) {
          n = u;
        }
      })();
      var s,
        c = [],
        f = !1,
        d = -1;
      function l() {
        f &&
          s &&
          ((f = !1), s.length ? (c = s.concat(c)) : (d = -1), c.length && p());
      }
      function p() {
        if (!f) {
          var e = a(l);
          f = !0;
          for (var t = c.length; t; ) {
            for (s = c, c = []; ++d < t; ) s && s[d].run();
            (d = -1), (t = c.length);
          }
          (s = null),
            (f = !1),
            (function (e) {
              if (n === clearTimeout) return clearTimeout(e);
              if ((n === u || !n) && clearTimeout)
                return (n = clearTimeout), clearTimeout(e);
              try {
                n(e);
              } catch (t) {
                try {
                  return n.call(null, e);
                } catch (t) {
                  return n.call(this, e);
                }
              }
            })(e);
        }
      }
      function h(e, t) {
        (this.fun = e), (this.array = t);
      }
      function m() {}
      (o.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        c.push(new h(e, t)), 1 !== c.length || f || a(p);
      }),
        (h.prototype.run = function () {
          this.fun.apply(null, this.array);
        }),
        (o.title = "browser"),
        (o.browser = !0),
        (o.env = {}),
        (o.argv = []),
        (o.version = ""),
        (o.versions = {}),
        (o.on = m),
        (o.addListener = m),
        (o.once = m),
        (o.off = m),
        (o.removeListener = m),
        (o.removeAllListeners = m),
        (o.emit = m),
        (o.prependListener = m),
        (o.prependOnceListener = m),
        (o.listeners = function (e) {
          return [];
        }),
        (o.binding = function (e) {
          throw new Error("process.binding is not supported");
        }),
        (o.cwd = function () {
          return "/";
        }),
        (o.chdir = function (e) {
          throw new Error("process.chdir is not supported");
        }),
        (o.umask = function () {
          return 0;
        });
    },
    function (e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = function (e, t) {
        n.forEach(e, function (r, n) {
          n !== t &&
            n.toUpperCase() === t.toUpperCase() &&
            ((e[t] = r), delete e[n]);
        });
      };
    },
    function (e, t, r) {
      "use strict";
      var n = r(5);
      e.exports = function (e, t, r) {
        var o = r.config.validateStatus;
        r.status && o && !o(r.status)
          ? t(
              n(
                "Request failed with status code " + r.status,
                r.config,
                null,
                r.request,
                r
              )
            )
          : e(r);
      };
    },
    function (e, t, r) {
      "use strict";
      e.exports = function (e, t, r, n, o) {
        return (
          (e.config = t),
          r && (e.code = r),
          (e.request = n),
          (e.response = o),
          e
        );
      };
    },
    function (e, t, r) {
      "use strict";
      var n = r(0);
      function o(e) {
        return encodeURIComponent(e)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",")
          .replace(/%20/g, "+")
          .replace(/%5B/gi, "[")
          .replace(/%5D/gi, "]");
      }
      e.exports = function (e, t, r) {
        if (!t) return e;
        var i;
        if (r) i = r(t);
        else if (n.isURLSearchParams(t)) i = t.toString();
        else {
          var u = [];
          n.forEach(t, function (e, t) {
            null != e &&
              (n.isArray(e) ? (t += "[]") : (e = [e]),
              n.forEach(e, function (e) {
                n.isDate(e)
                  ? (e = e.toISOString())
                  : n.isObject(e) && (e = JSON.stringify(e)),
                  u.push(o(t) + "=" + o(e));
              }));
          }),
            (i = u.join("&"));
        }
        return i && (e += (-1 === e.indexOf("?") ? "?" : "&") + i), e;
      };
    },
    function (e, t, r) {
      "use strict";
      var n = r(0),
        o = [
          "age",
          "authorization",
          "content-length",
          "content-type",
          "etag",
          "expires",
          "from",
          "host",
          "if-modified-since",
          "if-unmodified-since",
          "last-modified",
          "location",
          "max-forwards",
          "proxy-authorization",
          "referer",
          "retry-after",
          "user-agent",
        ];
      e.exports = function (e) {
        var t,
          r,
          i,
          u = {};
        return e
          ? (n.forEach(e.split("\n"), function (e) {
              if (
                ((i = e.indexOf(":")),
                (t = n.trim(e.substr(0, i)).toLowerCase()),
                (r = n.trim(e.substr(i + 1))),
                t)
              ) {
                if (u[t] && o.indexOf(t) >= 0) return;
                u[t] =
                  "set-cookie" === t
                    ? (u[t] ? u[t] : []).concat([r])
                    : u[t]
                    ? u[t] + ", " + r
                    : r;
              }
            }),
            u)
          : u;
      };
    },
    function (e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.isStandardBrowserEnv()
        ? (function () {
            var e,
              t = /(msie|trident)/i.test(navigator.userAgent),
              r = document.createElement("a");
            function o(e) {
              var n = e;
              return (
                t && (r.setAttribute("href", n), (n = r.href)),
                r.setAttribute("href", n),
                {
                  href: r.href,
                  protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                  host: r.host,
                  search: r.search ? r.search.replace(/^\?/, "") : "",
                  hash: r.hash ? r.hash.replace(/^#/, "") : "",
                  hostname: r.hostname,
                  port: r.port,
                  pathname:
                    "/" === r.pathname.charAt(0)
                      ? r.pathname
                      : "/" + r.pathname,
                }
              );
            }
            return (
              (e = o(window.location.href)),
              function (t) {
                var r = n.isString(t) ? o(t) : t;
                return r.protocol === e.protocol && r.host === e.host;
              }
            );
          })()
        : function () {
            return !0;
          };
    },
    function (e, t, r) {
      "use strict";
      var n =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      function o() {
        this.message = "String contains an invalid character";
      }
      (o.prototype = new Error()),
        (o.prototype.code = 5),
        (o.prototype.name = "InvalidCharacterError"),
        (e.exports = function (e) {
          for (
            var t, r, i = String(e), u = "", a = 0, s = n;
            i.charAt(0 | a) || ((s = "="), a % 1);
            u += s.charAt(63 & (t >> (8 - (a % 1) * 8)))
          ) {
            if ((r = i.charCodeAt((a += 0.75))) > 255) throw new o();
            t = (t << 8) | r;
          }
          return u;
        });
    },
    function (e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.isStandardBrowserEnv()
        ? {
            write: function (e, t, r, o, i, u) {
              var a = [];
              a.push(e + "=" + encodeURIComponent(t)),
                n.isNumber(r) && a.push("expires=" + new Date(r).toGMTString()),
                n.isString(o) && a.push("path=" + o),
                n.isString(i) && a.push("domain=" + i),
                !0 === u && a.push("secure"),
                (document.cookie = a.join("; "));
            },
            read: function (e) {
              var t = document.cookie.match(
                new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
              );
              return t ? decodeURIComponent(t[3]) : null;
            },
            remove: function (e) {
              this.write(e, "", Date.now() - 864e5);
            },
          }
        : {
            write: function () {},
            read: function () {
              return null;
            },
            remove: function () {},
          };
    },
    function (e, t, r) {
      "use strict";
      var n = r(0);
      function o() {
        this.handlers = [];
      }
      (o.prototype.use = function (e, t) {
        return (
          this.handlers.push({ fulfilled: e, rejected: t }),
          this.handlers.length - 1
        );
      }),
        (o.prototype.eject = function (e) {
          this.handlers[e] && (this.handlers[e] = null);
        }),
        (o.prototype.forEach = function (e) {
          n.forEach(this.handlers, function (t) {
            null !== t && e(t);
          });
        }),
        (e.exports = o);
    },
    function (e, t, r) {
      "use strict";
      var n = r(0),
        o = r(24),
        i = r(6),
        u = r(2),
        a = r(25),
        s = r(26);
      function c(e) {
        e.cancelToken && e.cancelToken.throwIfRequested();
      }
      e.exports = function (e) {
        return (
          c(e),
          e.baseURL && !a(e.url) && (e.url = s(e.baseURL, e.url)),
          (e.headers = e.headers || {}),
          (e.data = o(e.data, e.headers, e.transformRequest)),
          (e.headers = n.merge(
            e.headers.common || {},
            e.headers[e.method] || {},
            e.headers || {}
          )),
          n.forEach(
            ["delete", "get", "head", "post", "put", "patch", "common"],
            function (t) {
              delete e.headers[t];
            }
          ),
          (e.adapter || u.adapter)(e).then(
            function (t) {
              return (
                c(e), (t.data = o(t.data, t.headers, e.transformResponse)), t
              );
            },
            function (t) {
              return (
                i(t) ||
                  (c(e),
                  t &&
                    t.response &&
                    (t.response.data = o(
                      t.response.data,
                      t.response.headers,
                      e.transformResponse
                    ))),
                Promise.reject(t)
              );
            }
          )
        );
      };
    },
    function (e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = function (e, t, r) {
        return (
          n.forEach(r, function (r) {
            e = r(e, t);
          }),
          e
        );
      };
    },
    function (e, t, r) {
      "use strict";
      e.exports = function (e) {
        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
      };
    },
    function (e, t, r) {
      "use strict";
      e.exports = function (e, t) {
        return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
      };
    },
    function (e, t, r) {
      "use strict";
      var n = r(7);
      function o(e) {
        if ("function" != typeof e)
          throw new TypeError("executor must be a function.");
        var t;
        this.promise = new Promise(function (e) {
          t = e;
        });
        var r = this;
        e(function (e) {
          r.reason || ((r.reason = new n(e)), t(r.reason));
        });
      }
      (o.prototype.throwIfRequested = function () {
        if (this.reason) throw this.reason;
      }),
        (o.source = function () {
          var e;
          return {
            token: new o(function (t) {
              e = t;
            }),
            cancel: e,
          };
        }),
        (e.exports = o);
    },
    function (e, t, r) {
      "use strict";
      e.exports = function (e) {
        return function (t) {
          return e.apply(null, t);
        };
      };
    },
    function (e, t) {
      e.exports = function (e) {
        return (
          e.webpackPolyfill ||
            ((e.deprecate = function () {}),
            (e.paths = []),
            e.children || (e.children = []),
            Object.defineProperty(e, "loaded", {
              enumerable: !0,
              get: function () {
                return e.l;
              },
            }),
            Object.defineProperty(e, "id", {
              enumerable: !0,
              get: function () {
                return e.i;
              },
            }),
            (e.webpackPolyfill = 1)),
          e
        );
      };
    },
    function (e, t) {
      var r;
      r = (function () {
        return this;
      })();
      try {
        r = r || new Function("return this")();
      } catch (e) {
        "object" == typeof window && (r = window);
      }
      e.exports = r;
    },
  ]).default;
});
//# sourceMappingURL=bookthatapp-sdk.min.js.map
