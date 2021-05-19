/*******************************************************************************
 * Copyright (c) 2013, 2016 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution.
 *
 * The Eclipse Public License is available at
 *    http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 *******************************************************************************/
(function (m, r) { "object" === typeof exports && "object" === typeof module ? module.exports = r() : "function" === typeof define && define.amd ? define(r) : "object" === typeof exports ? exports = r() : ("undefined" === typeof m.Paho && (m.Paho = {}), m.Paho.MQTT = r()) })(global, function () {
  return function (m) {
    function r(a, b, d) { b[d++] = a >> 8; b[d++] = a % 256; return d } function u(a, b, d, k) { k = r(b, d, k); D(a, d, k); return k + b } function p(a) { for (var b = 0, d = 0; d < a.length; d++) { var k = a.charCodeAt(d); 2047 < k ? (55296 <= k && 56319 >= k && (d++ , b++), b += 3) : 127 < k ? b += 2 : b++ } return b }
    function D(a, b, d) { for (var k = 0; k < a.length; k++) { var e = a.charCodeAt(k); if (55296 <= e && 56319 >= e) { var f = a.charCodeAt(++k); if (isNaN(f)) throw Error(h(g.MALFORMED_UNICODE, [e, f])); e = (e - 55296 << 10) + (f - 56320) + 65536 } 127 >= e ? b[d++] = e : (2047 >= e ? b[d++] = e >> 6 & 31 | 192 : (65535 >= e ? b[d++] = e >> 12 & 15 | 224 : (b[d++] = e >> 18 & 7 | 240, b[d++] = e >> 12 & 63 | 128), b[d++] = e >> 6 & 63 | 128), b[d++] = e & 63 | 128) } return b } function E(a, b, d) {
      for (var k = "", e, f = b; f < b + d;) {
        e = a[f++]; if (!(128 > e)) {
          var n = a[f++] - 128; if (0 > n) throw Error(h(g.MALFORMED_UTF, [e.toString(16), n.toString(16),
            ""])); if (224 > e) e = 64 * (e - 192) + n; else { var c = a[f++] - 128; if (0 > c) throw Error(h(g.MALFORMED_UTF, [e.toString(16), n.toString(16), c.toString(16)])); if (240 > e) e = 4096 * (e - 224) + 64 * n + c; else { var l = a[f++] - 128; if (0 > l) throw Error(h(g.MALFORMED_UTF, [e.toString(16), n.toString(16), c.toString(16), l.toString(16)])); if (248 > e) e = 262144 * (e - 240) + 4096 * n + 64 * c + l; else throw Error(h(g.MALFORMED_UTF, [e.toString(16), n.toString(16), c.toString(16), l.toString(16)])); } }
        } 65535 < e && (e -= 65536, k += String.fromCharCode(55296 + (e >> 10)), e = 56320 + (e &
          1023)); k += String.fromCharCode(e)
      } return k
    } var y = function (a, b) { for (var d in a) if (a.hasOwnProperty(d)) if (b.hasOwnProperty(d)) { if (typeof a[d] !== b[d]) throw Error(h(g.INVALID_TYPE, [typeof a[d], d])); } else { d = "Unknown property, " + d + ". Valid properties are:"; for (var k in b) b.hasOwnProperty(k) && (d = d + " " + k); throw Error(d); } }, s = function (a, b) { return function () { return a.apply(b, arguments) } }, g = {
      OK: { code: 0, text: "AMQJSC0000I OK." }, CONNECT_TIMEOUT: { code: 1, text: "AMQJSC0001E Connect timed out." }, SUBSCRIBE_TIMEOUT: {
        code: 2,
        text: "AMQJS0002E Subscribe timed out."
      }, UNSUBSCRIBE_TIMEOUT: { code: 3, text: "AMQJS0003E Unsubscribe timed out." }, PING_TIMEOUT: { code: 4, text: "AMQJS0004E Ping timed out." }, INTERNAL_ERROR: { code: 5, text: "AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}" }, CONNACK_RETURNCODE: { code: 6, text: "AMQJS0006E Bad Connack return code:{0} {1}." }, SOCKET_ERROR: { code: 7, text: "AMQJS0007E Socket error:{0}." }, SOCKET_CLOSE: { code: 8, text: "AMQJS0008I Socket closed." }, MALFORMED_UTF: { code: 9, text: "AMQJS0009E Malformed UTF data:{0} {1} {2}." },
      UNSUPPORTED: { code: 10, text: "AMQJS0010E {0} is not supported by this browser." }, INVALID_STATE: { code: 11, text: "AMQJS0011E Invalid state {0}." }, INVALID_TYPE: { code: 12, text: "AMQJS0012E Invalid type {0} for {1}." }, INVALID_ARGUMENT: { code: 13, text: "AMQJS0013E Invalid argument {0} for {1}." }, UNSUPPORTED_OPERATION: { code: 14, text: "AMQJS0014E Unsupported operation." }, INVALID_STORED_DATA: { code: 15, text: "AMQJS0015E Invalid data in local storage key\x3d{0} value\x3d{1}." }, INVALID_MQTT_MESSAGE_TYPE: { code: 16, text: "AMQJS0016E Invalid MQTT message type {0}." },
      MALFORMED_UNICODE: { code: 17, text: "AMQJS0017E Malformed Unicode string:{0} {1}." }, BUFFER_FULL: { code: 18, text: "AMQJS0018E Message buffer is full, maximum buffer size: {0}." }
    }, H = { 0: "Connection Accepted", 1: "Connection Refused: unacceptable protocol version", 2: "Connection Refused: identifier rejected", 3: "Connection Refused: server unavailable", 4: "Connection Refused: bad user name or password", 5: "Connection Refused: not authorized" }, h = function (a, b) {
      var d = a.text; if (b) for (var k, e, f = 0; f < b.length; f++)if (k = "{" +
        f + "}", e = d.indexOf(k), 0 < e) var g = d.substring(0, e), d = d.substring(e + k.length), d = g + b[f] + d; return d
    }, A = [0, 6, 77, 81, 73, 115, 100, 112, 3], B = [0, 4, 77, 81, 84, 84, 4], q = function (a, b) { this.type = a; for (var d in b) b.hasOwnProperty(d) && (this[d] = b[d]) }; q.prototype.encode = function () {
      var a = (this.type & 15) << 4, b = 0, d = [], k = 0, e; void 0 !== this.messageIdentifier && (b += 2); switch (this.type) {
        case 1: switch (this.mqttVersion) { case 3: b += A.length + 3; break; case 4: b += B.length + 3 }b += p(this.clientId) + 2; void 0 !== this.willMessage && (b += p(this.willMessage.destinationName) +
          2, e = this.willMessage.payloadBytes, e instanceof Uint8Array || (e = new Uint8Array(g)), b += e.byteLength + 2); void 0 !== this.userName && (b += p(this.userName) + 2); void 0 !== this.password && (b += p(this.password) + 2); break; case 8: for (var a = a | 2, f = 0; f < this.topics.length; f++)d[f] = p(this.topics[f]), b += d[f] + 2; b += this.requestedQos.length; break; case 10: a |= 2; for (f = 0; f < this.topics.length; f++)d[f] = p(this.topics[f]), b += d[f] + 2; break; case 6: a |= 2; break; case 3: this.payloadMessage.duplicate && (a |= 8); a = a |= this.payloadMessage.qos << 1; this.payloadMessage.retained &&
            (a |= 1); var k = p(this.payloadMessage.destinationName), g = this.payloadMessage.payloadBytes, b = b + (k + 2) + g.byteLength; g instanceof ArrayBuffer ? g = new Uint8Array(g) : g instanceof Uint8Array || (g = new Uint8Array(g.buffer))
      }var c = b, f = Array(1), h = 0; do { var t = c % 128, c = c >> 7; 0 < c && (t |= 128); f[h++] = t } while (0 < c && 4 > h); c = f.length + 1; b = new ArrayBuffer(b + c); h = new Uint8Array(b); h[0] = a; h.set(f, 1); if (3 == this.type) c = u(this.payloadMessage.destinationName, k, h, c); else if (1 == this.type) {
        switch (this.mqttVersion) {
          case 3: h.set(A, c); c += A.length;
            break; case 4: h.set(B, c), c += B.length
        }a = 0; this.cleanSession && (a = 2); void 0 !== this.willMessage && (a = a | 4 | this.willMessage.qos << 3, this.willMessage.retained && (a |= 32)); void 0 !== this.userName && (a |= 128); void 0 !== this.password && (a |= 64); h[c++] = a; c = r(this.keepAliveInterval, h, c)
      } void 0 !== this.messageIdentifier && (c = r(this.messageIdentifier, h, c)); switch (this.type) {
        case 1: c = u(this.clientId, p(this.clientId), h, c); void 0 !== this.willMessage && (c = u(this.willMessage.destinationName, p(this.willMessage.destinationName), h, c),
          c = r(e.byteLength, h, c), h.set(e, c), c += e.byteLength); void 0 !== this.userName && (c = u(this.userName, p(this.userName), h, c)); void 0 !== this.password && u(this.password, p(this.password), h, c); break; case 3: h.set(g, c); break; case 8: for (f = 0; f < this.topics.length; f++)c = u(this.topics[f], d[f], h, c), h[c++] = this.requestedQos[f]; break; case 10: for (f = 0; f < this.topics.length; f++)c = u(this.topics[f], d[f], h, c)
      }return b
    }; var F = function (a, b) {
    this._client = a; this._keepAliveInterval = 1E3 * b; this.isReset = !1; var d = (new q(12)).encode(), c =
      function (a) { return function () { return e.apply(a) } }, e = function () { this.isReset ? (this.isReset = !1, this._client._trace("Pinger.doPing", "send PINGREQ"), m.sendSocketMessage({ data: d, success: function () { }, fail: function () { }, complete: function () { } }), this.timeout = setTimeout(c(this), this._keepAliveInterval)) : (this._client._trace("Pinger.doPing", "Timed out"), this._client._disconnected(g.PING_TIMEOUT.code, h(g.PING_TIMEOUT))) }; this.reset = function () {
      this.isReset = !0; clearTimeout(this.timeout); 0 < this._keepAliveInterval &&
        (this.timeout = setTimeout(c(this), this._keepAliveInterval))
      }; this.cancel = function () { clearTimeout(this.timeout) }
    }, z = function (a, b, d, c) { b || (b = 30); this.timeout = setTimeout(function (a, b, d) { return function () { return a.apply(b, d) } }(d, a, c), 1E3 * b); this.cancel = function () { clearTimeout(this.timeout) } }, c = function (a, b, d, c, e) {
      this._trace("Paho.MQTT.Client", a, b, d, c, e); this.host = b; this.port = d; this.path = c; this.uri = a; this.clientId = e; this._wsuri = null; this._localKey = b + ":" + d + ("/mqtt" != c ? ":" + c : "") + ":" + e + ":"; this._msg_queue =
        []; this._buffered_msg_queue = []; this._sentMessages = {}; this._receivedMessages = {}; this._notify_msg_sent = {}; this._message_identifier = 1; this._sequence = 0; for (var f in m.getStorageInfoSync().keys) 0 !== f.indexOf("Sent:" + this._localKey) && 0 !== f.indexOf("Received:" + this._localKey) || this.restore(f)
    }; c.prototype.host = null; c.prototype.port = null; c.prototype.path = null; c.prototype.uri = null; c.prototype.clientId = null; c.prototype.socket = null; c.prototype.connected = !1; c.prototype.maxMessageIdentifier = 65536; c.prototype.connectOptions =
      null; c.prototype.hostIndex = null; c.prototype.onConnected = null; c.prototype.onConnectionLost = null; c.prototype.onMessageDelivered = null; c.prototype.onMessageArrived = null; c.prototype.traceFunction = null; c.prototype._msg_queue = null; c.prototype._buffered_msg_queue = null; c.prototype._connectTimeout = null; c.prototype.sendPinger = null; c.prototype.receivePinger = null; c.prototype._reconnectInterval = 1; c.prototype._reconnecting = !1; c.prototype._reconnectTimeout = null; c.prototype.disconnectedPublishing = !1; c.prototype.disconnectedBufferSize =
        5E3; c.prototype.receiveBuffer = null; c.prototype._traceBuffer = null; c.prototype._MAX_TRACE_ENTRIES = 100; c.prototype.connect = function (a) {
          var b = this._traceMask(a, "password"); this._trace("Client.connect", b, null, this.connected); if (this.connected) throw Error(h(g.INVALID_STATE, ["already connected"])); this._reconnecting && (this._reconnectTimeout.cancel(), this._reconnectTimeout = null, this._reconnecting = !1); this.connectOptions = a; this._reconnectInterval = 1; this._reconnecting = !1; a.uris ? (this.hostIndex = 0, this._doConnect(a.uris[0])) :
            this._doConnect(this.uri)
        }; c.prototype.subscribe = function (a, b) {
          this._trace("Client.subscribe", a, b); if (!this.connected) throw Error(h(g.INVALID_STATE, ["not connected"])); var d = new q(8); d.topics = [a]; d.requestedQos = void 0 !== b.qos ? [b.qos] : [0]; b.onSuccess && (d.onSuccess = function (a) { b.onSuccess({ invocationContext: b.invocationContext, grantedQos: a }) }); b.onFailure && (d.onFailure = function (a) { b.onFailure({ invocationContext: b.invocationContext, errorCode: a, errorMessage: h(a) }) }); b.timeout && (d.timeOut = new z(this, b.timeout,
            b.onFailure, [{ invocationContext: b.invocationContext, errorCode: g.SUBSCRIBE_TIMEOUT.code, errorMessage: h(g.SUBSCRIBE_TIMEOUT) }])); this._requires_ack(d); this._schedule_message(d)
        }; c.prototype.unsubscribe = function (a, b) {
          this._trace("Client.unsubscribe", a, b); if (!this.connected) throw Error(h(g.INVALID_STATE, ["not connected"])); var d = new q(10); d.topics = [a]; b.onSuccess && (d.callback = function () { b.onSuccess({ invocationContext: b.invocationContext }) }); b.timeout && (d.timeOut = new z(this, b.timeout, b.onFailure, [{
            invocationContext: b.invocationContext,
            errorCode: g.UNSUBSCRIBE_TIMEOUT.code, errorMessage: h(g.UNSUBSCRIBE_TIMEOUT)
          }])); this._requires_ack(d); this._schedule_message(d)
        }; c.prototype.send = function (a) {
          this._trace("Client.send", a); var b = new q(3); b.payloadMessage = a; if (this.connected) 0 < a.qos ? this._requires_ack(b) : this.onMessageDelivered && (this._notify_msg_sent[b] = this.onMessageDelivered(b.payloadMessage)), this._schedule_message(b); else if (this._reconnecting && this.disconnectedPublishing) {
            if (Object.keys(this._sentMessages).length + this._buffered_msg_queue.length >
              this.disconnectedBufferSize) throw Error(h(g.BUFFER_FULL, [this.disconnectedBufferSize])); 0 < a.qos ? this._requires_ack(b) : (b.sequence = ++this._sequence, this._buffered_msg_queue.push(b))
          } else throw Error(h(g.INVALID_STATE, ["not connected"]));
        }; c.prototype.disconnect = function () {
          this._trace("Client.disconnect"); this._reconnecting && (this._reconnectTimeout.cancel(), this._reconnectTimeout = null, this._reconnecting = !1); if (!this.connected) throw Error(h(g.INVALID_STATE, ["not connecting or connected"])); var a = new q(14);
          this._notify_msg_sent[a] = s(this._disconnected, this); this._schedule_message(a)
        }; c.prototype.getTraceLog = function () { if (null !== this._traceBuffer) { this._trace("Client.getTraceLog", new Date); this._trace("Client.getTraceLog in flight messages", this._sentMessages.length); for (var a in this._sentMessages) this._trace("_sentMessages ", a, this._sentMessages[a]); for (a in this._receivedMessages) this._trace("_receivedMessages ", a, this._receivedMessages[a]); return this._traceBuffer } }; c.prototype.startTrace = function () {
        null ===
          this._traceBuffer && (this._traceBuffer = []); this._trace("Client.startTrace", new Date, "1.0.3")
        }; c.prototype.stopTrace = function () { delete this._traceBuffer }; c.prototype._doConnect = function (a) {
          this.connectOptions.useSSL && (a = a.split(":"), a[0] = "wss", a = a.join(":")); this._wsuri = a; this.connected = !1; m.connectSocket({ url: a }); m.onSocketOpen(s(this._on_socket_open, this)); m.onSocketMessage(s(this._on_socket_message, this)); m.onSocketError(s(this._on_socket_error, this)); m.onSocketClose(s(this._on_socket_close,
            this)); this.sendPinger = new F(this, this.connectOptions.keepAliveInterval); this.receivePinger = new F(this, this.connectOptions.keepAliveInterval); this._connectTimeout && (this._connectTimeout.cancel(), this._connectTimeout = null); this._connectTimeout = new z(this, this.connectOptions.timeout, this._disconnected, [g.CONNECT_TIMEOUT.code, h(g.CONNECT_TIMEOUT)])
        }; c.prototype._schedule_message = function (a) { this._msg_queue.push(a); this.connected && this._process_queue() }; c.prototype.store = function (a, b) {
          var d = {
            type: b.type,
            messageIdentifier: b.messageIdentifier, version: 1
          }; switch (b.type) {
            case 3: b.pubRecReceived && (d.pubRecReceived = !0); d.payloadMessage = {}; for (var c = "", e = b.payloadMessage.payloadBytes, f = 0; f < e.length; f++)c = 15 >= e[f] ? c + "0" + e[f].toString(16) : c + e[f].toString(16); d.payloadMessage.payloadHex = c; d.payloadMessage.qos = b.payloadMessage.qos; d.payloadMessage.destinationName = b.payloadMessage.destinationName; b.payloadMessage.duplicate && (d.payloadMessage.duplicate = !0); b.payloadMessage.retained && (d.payloadMessage.retained =
              !0); 0 === a.indexOf("Sent:") && (void 0 === b.sequence && (b.sequence = ++this._sequence), d.sequence = b.sequence); break; default: throw Error(h(g.INVALID_STORED_DATA, [key, d]));
          }try { m.setStorageSync(a + this._localKey + b.messageIdentifier, JSON.stringify(d)) } catch (n) { }
        }; c.prototype.restore = function (a) {
          var b = m.getStorageSync(a), d = JSON.parse(b), c = new q(d.type, d); switch (d.type) {
            case 3: for (var b = d.payloadMessage.payloadHex, e = new ArrayBuffer(b.length / 2), e = new Uint8Array(e), f = 0; 2 <= b.length;) {
              var n = parseInt(b.substring(0,
                2), 16), b = b.substring(2, b.length); e[f++] = n
            } b = new v(e); b.qos = d.payloadMessage.qos; b.destinationName = d.payloadMessage.destinationName; d.payloadMessage.duplicate && (b.duplicate = !0); d.payloadMessage.retained && (b.retained = !0); c.payloadMessage = b; break; default: throw Error(h(g.INVALID_STORED_DATA, [a, b]));
          }0 === a.indexOf("Sent:" + this._localKey) ? (c.payloadMessage.duplicate = !0, this._sentMessages[c.messageIdentifier] = c) : 0 === a.indexOf("Received:" + this._localKey) && (this._receivedMessages[c.messageIdentifier] = c)
        };
    c.prototype._process_queue = function () { for (var a = null, b = this._msg_queue.reverse(); a = b.pop();)this._socket_send(a), this._notify_msg_sent[a] && (this._notify_msg_sent[a](), delete this._notify_msg_sent[a]) }; c.prototype._requires_ack = function (a) {
      var b = Object.keys(this._sentMessages).length; if (b > this.maxMessageIdentifier) throw Error("Too many messages:" + b); for (; void 0 !== this._sentMessages[this._message_identifier];)this._message_identifier++; a.messageIdentifier = this._message_identifier; this._sentMessages[a.messageIdentifier] =
        a; 3 === a.type && this.store("Sent:", a); this._message_identifier === this.maxMessageIdentifier && (this._message_identifier = 1)
    }; c.prototype._on_socket_open = function (a) { a = new q(1, this.connectOptions); a.clientId = this.clientId; this._socket_send(a) }; c.prototype._on_socket_message = function (a) { this._trace("Client._on_socket_message", a.data); a = this._deframeMessages(a.data); for (var b = 0; b < a.length; b += 1)this._handleMessage(a[b]) }; c.prototype._deframeMessages = function (a) {
      a = new Uint8Array(a); var b = []; if (this.receiveBuffer) {
        var d =
          new Uint8Array(this.receiveBuffer.length + a.length); d.set(this.receiveBuffer); d.set(a, this.receiveBuffer.length); a = d; delete this.receiveBuffer
      } try {
        for (d = 0; d < a.length;) {
          var c; a: {
            var e = a, f = d, n = f, m = e[f], l = m >> 4, t = m & 15, f = f + 1, w = void 0, C = 0, p = 1; do { if (f == e.length) { c = [null, n]; break a } w = e[f++]; C += (w & 127) * p; p *= 128 } while (0 !== (w & 128)); w = f + C; if (w > e.length) c = [null, n]; else {
              var x = new q(l); switch (l) {
                case 2: e[f++] & 1 && (x.sessionPresent = !0); x.returnCode = e[f++]; break; case 3: var n = t >> 1 & 3, r = 256 * e[f] + e[f + 1], f = f + 2, u = E(e, f, r),
                  f = f + r; 0 < n && (x.messageIdentifier = 256 * e[f] + e[f + 1], f += 2); var s = new v(e.subarray(f, w)); 1 == (t & 1) && (s.retained = !0); 8 == (t & 8) && (s.duplicate = !0); s.qos = n; s.destinationName = u; x.payloadMessage = s; break; case 4: case 5: case 6: case 7: case 11: x.messageIdentifier = 256 * e[f] + e[f + 1]; break; case 9: x.messageIdentifier = 256 * e[f] + e[f + 1], f += 2, x.returnCode = e.subarray(f, w)
              }c = [x, w]
            }
          } var z = c[0], d = c[1]; if (null !== z) b.push(z); else break
        } d < a.length && (this.receiveBuffer = a.subarray(d))
      } catch (y) {
        c = "undefined" == y.hasOwnProperty("stack") ?
          y.stack.toString() : "No Error Stack Available"; this._disconnected(g.INTERNAL_ERROR.code, h(g.INTERNAL_ERROR, [y.message, c])); return
      } return b
    }; c.prototype._handleMessage = function (a) {
      this._trace("Client._handleMessage", a); try {
        switch (a.type) {
          case 2: this._connectTimeout.cancel(); this._reconnectTimeout && this._reconnectTimeout.cancel(); if (this.connectOptions.cleanSession) {
            for (var b in this._sentMessages) { var d = this._sentMessages[b]; m.removeStorageSync("Sent:" + this._localKey + d.messageIdentifier) } this._sentMessages =
              {}; for (b in this._receivedMessages) { var c = this._receivedMessages[b]; m.removeStorageSync("Received:" + this._localKey + c.messageIdentifier) } this._receivedMessages = {}
          } if (0 === a.returnCode) this.connected = !0, this.connectOptions.uris && (this.hostIndex = this.connectOptions.uris.length); else { this._disconnected(g.CONNACK_RETURNCODE.code, h(g.CONNACK_RETURNCODE, [a.returnCode, H[a.returnCode]])); break } a = []; for (var e in this._sentMessages) this._sentMessages.hasOwnProperty(e) && a.push(this._sentMessages[e]); if (0 < this._buffered_msg_queue.length) {
            e =
            null; for (var f = this._buffered_msg_queue.reverse(); e = f.pop();)a.push(e), this.onMessageDelivered && (this._notify_msg_sent[e] = this.onMessageDelivered(e.payloadMessage))
          } a = a.sort(function (a, b) { return a.sequence - b.sequence }); for (var f = 0, n = a.length; f < n; f++)if (d = a[f], 3 == d.type && d.pubRecReceived) { var p = new q(6, { messageIdentifier: d.messageIdentifier }); this._schedule_message(p) } else this._schedule_message(d); if (this.connectOptions.onSuccess) this.connectOptions.onSuccess({ invocationContext: this.connectOptions.invocationContext });
            d = !1; this._reconnecting && (d = !0, this._reconnectInterval = 1, this._reconnecting = !1); this._connected(d, this._wsuri); this._process_queue(); break; case 3: this._receivePublish(a); break; case 4: if (d = this._sentMessages[a.messageIdentifier]) if (delete this._sentMessages[a.messageIdentifier], m.removeStorageSync("Sent:" + this._localKey + a.messageIdentifier), this.onMessageDelivered) this.onMessageDelivered(d.payloadMessage); break; case 5: if (d = this._sentMessages[a.messageIdentifier]) d.pubRecReceived = !0, p = new q(6, { messageIdentifier: a.messageIdentifier }),
              this.store("Sent:", d), this._schedule_message(p); break; case 6: c = this._receivedMessages[a.messageIdentifier]; m.removeStorageSync("Received:" + this._localKey + a.messageIdentifier); c && (this._receiveMessage(c), delete this._receivedMessages[a.messageIdentifier]); var l = new q(7, { messageIdentifier: a.messageIdentifier }); this._schedule_message(l); break; case 7: d = this._sentMessages[a.messageIdentifier]; delete this._sentMessages[a.messageIdentifier]; m.removeStorageSync("Sent:" + this._localKey + a.messageIdentifier);
            if (this.onMessageDelivered) this.onMessageDelivered(d.payloadMessage); break; case 9: if (d = this._sentMessages[a.messageIdentifier]) { d.timeOut && d.timeOut.cancel(); if (128 === a.returnCode[0]) { if (d.onFailure) d.onFailure(a.returnCode) } else if (d.onSuccess) d.onSuccess(a.returnCode); delete this._sentMessages[a.messageIdentifier] } break; case 11: if (d = this._sentMessages[a.messageIdentifier]) d.timeOut && d.timeOut.cancel(), d.callback && d.callback(), delete this._sentMessages[a.messageIdentifier]; break; case 13: this.sendPinger.reset();
            break; case 14: this._disconnected(g.INVALID_MQTT_MESSAGE_TYPE.code, h(g.INVALID_MQTT_MESSAGE_TYPE, [a.type])); break; default: this._disconnected(g.INVALID_MQTT_MESSAGE_TYPE.code, h(g.INVALID_MQTT_MESSAGE_TYPE, [a.type]))
        }
      } catch (t) { d = "undefined" == t.hasOwnProperty("stack") ? t.stack.toString() : "No Error Stack Available", this._disconnected(g.INTERNAL_ERROR.code, h(g.INTERNAL_ERROR, [t.message, d])) }
    }; c.prototype._on_socket_error = function (a) {
    this._reconnecting || this._disconnected(g.SOCKET_ERROR.code, h(g.SOCKET_ERROR,
      [a.data]))
    }; c.prototype._on_socket_close = function () { this._reconnecting || this._disconnected(g.SOCKET_CLOSE.code, h(g.SOCKET_CLOSE)) }; c.prototype._socket_send = function (a) { if (1 == a.type) { var b = this._traceMask(a, "password"); this._trace("Client._socket_send", b) } else this._trace("Client._socket_send", a); m.sendSocketMessage({ data: a.encode(), success: function () { }, fail: function () { }, complete: function () { } }); this.sendPinger.reset() }; c.prototype._receivePublish = function (a) {
      switch (a.payloadMessage.qos) {
        case "undefined": case 0: this._receiveMessage(a);
          break; case 1: var b = new q(4, { messageIdentifier: a.messageIdentifier }); this._schedule_message(b); this._receiveMessage(a); break; case 2: this._receivedMessages[a.messageIdentifier] = a; this.store("Received:", a); a = new q(5, { messageIdentifier: a.messageIdentifier }); this._schedule_message(a); break; default: throw Error("Invaild qos\x3d" + wireMmessage.payloadMessage.qos);
      }
    }; c.prototype._receiveMessage = function (a) { if (this.onMessageArrived) this.onMessageArrived(a.payloadMessage) }; c.prototype._connected = function (a, b) {
      if (this.onConnected) this.onConnected(a,
        b)
    }; c.prototype._reconnect = function () { this._trace("Client._reconnect"); this.connected || (this._reconnecting = !0, this.sendPinger.cancel(), this.receivePinger.cancel(), 128 > this._reconnectInterval && (this._reconnectInterval *= 2), this.connectOptions.uris ? (this.hostIndex = 0, this._doConnect(this.connectOptions.uris[0])) : this._doConnect(this.uri)) }; c.prototype._disconnected = function (a, b) {
      this._trace("Client._disconnected", a, b); if (void 0 !== a && this._reconnecting) this._reconnectTimeout = new z(this, this._reconnectInterval,
        this._reconnect); else if (this.sendPinger.cancel(), this.receivePinger.cancel(), this._connectTimeout && (this._connectTimeout.cancel(), this._connectTimeout = null), this._msg_queue = [], this._buffered_msg_queue = [], this._notify_msg_sent = {}, this.connectOptions.uris && this.hostIndex < this.connectOptions.uris.length - 1) this.hostIndex++ , this._doConnect(this.connectOptions.uris[this.hostIndex]); else if (void 0 === a && (a = g.OK.code, b = h(g.OK)), this.connected) {
        this.connected = !1; if (this.onConnectionLost) this.onConnectionLost({
          errorCode: a,
          errorMessage: b, reconnect: this.connectOptions.reconnect, uri: this._wsuri
        }); a !== g.OK.code && this.connectOptions.reconnect && (this._reconnectInterval = 1, this._reconnect())
        } else if (4 === this.connectOptions.mqttVersion && !1 === this.connectOptions.mqttVersionExplicit) this._trace("Failed to connect V4, dropping back to V3"), this.connectOptions.mqttVersion = 3, this.connectOptions.uris ? (this.hostIndex = 0, this._doConnect(this.connectOptions.uris[0])) : this._doConnect(this.uri); else if (this.connectOptions.onFailure) this.connectOptions.onFailure({
          invocationContext: this.connectOptions.invocationContext,
          errorCode: a, errorMessage: b
        })
    }; c.prototype._trace = function () {
      if (this.traceFunction) { for (var a in arguments) "undefined" !== typeof arguments[a] && arguments.splice(a, 1, JSON.stringify(arguments[a])); a = Array.prototype.slice.call(arguments).join(""); this.traceFunction({ severity: "Debug", message: a }) } if (null !== this._traceBuffer) {
        a = 0; for (var b = arguments.length; a < b; a++)this._traceBuffer.length == this._MAX_TRACE_ENTRIES && this._traceBuffer.shift(), 0 === a ? this._traceBuffer.push(arguments[a]) : "undefined" === typeof arguments[a] ?
          this._traceBuffer.push(arguments[a]) : this._traceBuffer.push("  " + JSON.stringify(arguments[a]))
      }
    }; c.prototype._traceMask = function (a, b) { var d = {}, c; for (c in a) a.hasOwnProperty(c) && (d[c] = c == b ? "******" : a[c]); return d }; var G = function (a, b, d, k) {
      var e; if ("string" !== typeof a) throw Error(h(g.INVALID_TYPE, [typeof a, "host"])); if (2 == arguments.length) {
        k = b; e = a; var f = e.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/); if (f) a = f[4] || f[2], b = parseInt(f[7]), d = f[8]; else throw Error(h(g.INVALID_ARGUMENT, [a, "host"]));
      } else { 3 == arguments.length && (k = d, d = "/mqtt"); if ("number" !== typeof b || 0 > b) throw Error(h(g.INVALID_TYPE, [typeof b, "port"])); if ("string" !== typeof d) throw Error(h(g.INVALID_TYPE, [typeof d, "path"])); e = "ws://" + (-1 !== a.indexOf(":") && "[" !== a.slice(0, 1) && "]" !== a.slice(-1) ? "[" + a + "]" : a) + ":" + b + d } for (var n = f = 0; n < k.length; n++) { var m = k.charCodeAt(n); 55296 <= m && 56319 >= m && n++; f++ } if ("string" !== typeof k || 65535 < f) throw Error(h(g.INVALID_ARGUMENT, [k, "clientId"])); var l = new c(e, a, b, d, k); this._getHost = function () { return a };
      this._setHost = function () { throw Error(h(g.UNSUPPORTED_OPERATION)); }; this._getPort = function () { return b }; this._setPort = function () { throw Error(h(g.UNSUPPORTED_OPERATION)); }; this._getPath = function () { return d }; this._setPath = function () { throw Error(h(g.UNSUPPORTED_OPERATION)); }; this._getURI = function () { return e }; this._setURI = function () { throw Error(h(g.UNSUPPORTED_OPERATION)); }; this._getClientId = function () { return l.clientId }; this._setClientId = function () { throw Error(h(g.UNSUPPORTED_OPERATION)); }; this._getOnConnected =
        function () { return l.onConnected }; this._setOnConnected = function (a) { if ("function" === typeof a) l.onConnected = a; else throw Error(h(g.INVALID_TYPE, [typeof a, "onConnected"])); }; this._getDisconnectedPublishing = function () { return l.disconnectedPublishing }; this._setDisconnectedPublishing = function (a) { l.disconnectedPublishing = a }; this._getDisconnectedBufferSize = function () { return l.disconnectedBufferSize }; this._setDisconnectedBufferSize = function (a) { l.disconnectedBufferSize = a }; this._getOnConnectionLost = function () { return l.onConnectionLost };
      this._setOnConnectionLost = function (a) { if ("function" === typeof a) l.onConnectionLost = a; else throw Error(h(g.INVALID_TYPE, [typeof a, "onConnectionLost"])); }; this._getOnMessageDelivered = function () { return l.onMessageDelivered }; this._setOnMessageDelivered = function (a) { if ("function" === typeof a) l.onMessageDelivered = a; else throw Error(h(g.INVALID_TYPE, [typeof a, "onMessageDelivered"])); }; this._getOnMessageArrived = function () { return l.onMessageArrived }; this._setOnMessageArrived = function (a) {
        if ("function" === typeof a) l.onMessageArrived =
          a; else throw Error(h(g.INVALID_TYPE, [typeof a, "onMessageArrived"]));
      }; this._getTrace = function () { return l.traceFunction }; this._setTrace = function (a) { if ("function" === typeof a) l.traceFunction = a; else throw Error(h(g.INVALID_TYPE, [typeof a, "onTrace"])); }; this.connect = function (a) {
        a = a || {}; y(a, {
          timeout: "number", userName: "string", password: "string", willMessage: "object", keepAliveInterval: "number", cleanSession: "boolean", useSSL: "boolean", invocationContext: "object", onSuccess: "function", onFailure: "function", hosts: "object",
          ports: "object", reconnect: "boolean", mqttVersion: "number", mqttVersionExplicit: "boolean", uris: "object"
        }); void 0 === a.keepAliveInterval && (a.keepAliveInterval = 60); if (4 < a.mqttVersion || 3 > a.mqttVersion) throw Error(h(g.INVALID_ARGUMENT, [a.mqttVersion, "connectOptions.mqttVersion"])); void 0 === a.mqttVersion ? (a.mqttVersionExplicit = !1, a.mqttVersion = 4) : a.mqttVersionExplicit = !0; if (void 0 !== a.password && void 0 === a.userName) throw Error(h(g.INVALID_ARGUMENT, [a.password, "connectOptions.password"])); if (a.willMessage) {
          if (!(a.willMessage instanceof
            v)) throw Error(h(g.INVALID_TYPE, [a.willMessage, "connectOptions.willMessage"])); a.willMessage.stringPayload = null; if ("undefined" === typeof a.willMessage.destinationName) throw Error(h(g.INVALID_TYPE, [typeof a.willMessage.destinationName, "connectOptions.willMessage.destinationName"]));
        } "undefined" === typeof a.cleanSession && (a.cleanSession = !0); if (a.hosts) {
          if (!(a.hosts instanceof Array)) throw Error(h(g.INVALID_ARGUMENT, [a.hosts, "connectOptions.hosts"])); if (1 > a.hosts.length) throw Error(h(g.INVALID_ARGUMENT,
            [a.hosts, "connectOptions.hosts"])); for (var b = !1, c = 0; c < a.hosts.length; c++) { if ("string" !== typeof a.hosts[c]) throw Error(h(g.INVALID_TYPE, [typeof a.hosts[c], "connectOptions.hosts[" + c + "]"])); if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(a.hosts[c])) if (0 === c) b = !0; else { if (!b) throw Error(h(g.INVALID_ARGUMENT, [a.hosts[c], "connectOptions.hosts[" + c + "]"])); } else if (b) throw Error(h(g.INVALID_ARGUMENT, [a.hosts[c], "connectOptions.hosts[" + c + "]"])); } if (b) a.uris = a.hosts; else {
              if (!a.ports) throw Error(h(g.INVALID_ARGUMENT,
                [a.ports, "connectOptions.ports"])); if (!(a.ports instanceof Array)) throw Error(h(g.INVALID_ARGUMENT, [a.ports, "connectOptions.ports"])); if (a.hosts.length !== a.ports.length) throw Error(h(g.INVALID_ARGUMENT, [a.ports, "connectOptions.ports"])); a.uris = []; for (c = 0; c < a.hosts.length; c++) { if ("number" !== typeof a.ports[c] || 0 > a.ports[c]) throw Error(h(g.INVALID_TYPE, [typeof a.ports[c], "connectOptions.ports[" + c + "]"])); var b = a.hosts[c], f = a.ports[c]; e = "ws://" + (-1 !== b.indexOf(":") ? "[" + b + "]" : b) + ":" + f + d; a.uris.push(e) }
            }
        } l.connect(a)
      };
      this.subscribe = function (a, b) { if ("string" !== typeof a) throw Error("Invalid argument:" + a); b = b || {}; y(b, { qos: "number", invocationContext: "object", onSuccess: "function", onFailure: "function", timeout: "number" }); if (b.timeout && !b.onFailure) throw Error("subscribeOptions.timeout specified with no onFailure callback."); if ("undefined" !== typeof b.qos && 0 !== b.qos && 1 !== b.qos && 2 !== b.qos) throw Error(h(g.INVALID_ARGUMENT, [b.qos, "subscribeOptions.qos"])); l.subscribe(a, b) }; this.unsubscribe = function (a, b) {
        if ("string" !== typeof a) throw Error("Invalid argument:" +
          a); b = b || {}; y(b, { invocationContext: "object", onSuccess: "function", onFailure: "function", timeout: "number" }); if (b.timeout && !b.onFailure) throw Error("unsubscribeOptions.timeout specified with no onFailure callback."); l.unsubscribe(a, b)
      }; this.send = function (a, b, c, d) {
        var e; if (0 === arguments.length) throw Error("Invalid argument.length"); if (1 == arguments.length) {
          if (!(a instanceof v) && "string" !== typeof a) throw Error("Invalid argument:" + typeof a); e = a; if ("undefined" === typeof e.destinationName) throw Error(h(g.INVALID_ARGUMENT,
            [e.destinationName, "Message.destinationName"]));
        } else e = new v(b), e.destinationName = a, 3 <= arguments.length && (e.qos = c), 4 <= arguments.length && (e.retained = d); l.send(e)
      }; this.publish = function (a, b, c, d) {
        console.log("Publising message to: ", a); var e; if (0 === arguments.length) throw Error("Invalid argument.length"); if (1 == arguments.length) {
          if (!(a instanceof v) && "string" !== typeof a) throw Error("Invalid argument:" + typeof a); e = a; if ("undefined" === typeof e.destinationName) throw Error(h(g.INVALID_ARGUMENT, [e.destinationName,
            "Message.destinationName"]));
        } else e = new v(b), e.destinationName = a, 3 <= arguments.length && (e.qos = c), 4 <= arguments.length && (e.retained = d); l.send(e)
      }; this.disconnect = function () { l.disconnect() }; this.getTraceLog = function () { return l.getTraceLog() }; this.startTrace = function () { l.startTrace() }; this.stopTrace = function () { l.stopTrace() }; this.isConnected = function () { return l.connected }
    }; G.prototype = {
      get host() { return this._getHost() }, set host(a) { this._setHost(a) }, get port() { return this._getPort() }, set port(a) { this._setPort(a) },
      get path() { return this._getPath() }, set path(a) { this._setPath(a) }, get clientId() { return this._getClientId() }, set clientId(a) { this._setClientId(a) }, get onConnected() { return this._getOnConnected() }, set onConnected(a) { this._setOnConnected(a) }, get disconnectedPublishing() { return this._getDisconnectedPublishing() }, set disconnectedPublishing(a) { this._setDisconnectedPublishing(a) }, get disconnectedBufferSize() { return this._getDisconnectedBufferSize() }, set disconnectedBufferSize(a) { this._setDisconnectedBufferSize(a) },
      get onConnectionLost() { return this._getOnConnectionLost() }, set onConnectionLost(a) { this._setOnConnectionLost(a) }, get onMessageDelivered() { return this._getOnMessageDelivered() }, set onMessageDelivered(a) { this._setOnMessageDelivered(a) }, get onMessageArrived() { return this._getOnMessageArrived() }, set onMessageArrived(a) { this._setOnMessageArrived(a) }, get trace() { return this._getTrace() }, set trace(a) { this._setTrace(a) }
    }; var v = function (a) {
      var b; if ("string" === typeof a || a instanceof ArrayBuffer || a instanceof
        Int8Array || a instanceof Uint8Array || a instanceof Int16Array || a instanceof Uint16Array || a instanceof Int32Array || a instanceof Uint32Array || a instanceof Float32Array || a instanceof Float64Array) b = a; else throw h(g.INVALID_ARGUMENT, [a, "newPayload"]); this._getPayloadString = function () { return "string" === typeof b ? b : E(b, 0, b.length) }; this._getPayloadBytes = function () { if ("string" === typeof b) { var a = new ArrayBuffer(p(b)), a = new Uint8Array(a); D(b, a, 0); return a } return b }; var c; this._getDestinationName = function () { return c };
      this._setDestinationName = function (a) { if ("string" === typeof a) c = a; else throw Error(h(g.INVALID_ARGUMENT, [a, "newDestinationName"])); }; var k = 0; this._getQos = function () { return k }; this._setQos = function (a) { if (0 === a || 1 === a || 2 === a) k = a; else throw Error("Invalid argument:" + a); }; var e = !1; this._getRetained = function () { return e }; this._setRetained = function (a) { if ("boolean" === typeof a) e = a; else throw Error(h(g.INVALID_ARGUMENT, [a, "newRetained"])); }; var f = !1; this._getDuplicate = function () { return f }; this._setDuplicate =
        function (a) { f = a }
    }; v.prototype = {
      get payloadString() { return this._getPayloadString() }, get payloadBytes() { return this._getPayloadBytes() }, get destinationName() { return this._getDestinationName() }, set destinationName(a) { this._setDestinationName(a) }, get topic() { return this._getDestinationName() }, set topic(a) { this._setDestinationName(a) }, get qos() { return this._getQos() }, set qos(a) { this._setQos(a) }, get retained() { return this._getRetained() }, set retained(a) { this._setRetained(a) }, get duplicate() { return this._getDuplicate() },
      set duplicate(a) { this._setDuplicate(a) }
    }; return { Client: G, Message: v }
  }(wx)
});