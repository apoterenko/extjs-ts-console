//// [genericCallWithObjectTypeArgsAndConstraints2.ts]
// Generic call with constraints infering type parameter from object member properties
// No errors expected

class Base {
    x: string;
}
class Derived extends Base {
    y: string;
}

function f<T extends Base>(x: { foo: T; bar: T }) {
    var r: T;
    return r;
}
var r = f({ foo: new Base(), bar: new Derived() });
var r2 = f({ foo: new Derived(), bar: new Derived() });


interface I<T> {
    a: T;
}
function f2<T extends Base>(x: I<T>) {
    var r: T;
    return r;
}
var i: I<Derived>;
var r3 = f2(i);


function f3<T extends Base>(x: T, y: (a: T) => T) {
    return y(null);
}
var r4 = f3(new Base(), x => x);
var r5 = f3(new Derived(), x => x);

var r6 = f3(null, null); // any
var r7 = f3(null, x => x); // any


//// [genericCallWithObjectTypeArgsAndConstraints2.js]
// Generic call with constraints infering type parameter from object member properties
// No errors expected
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Base = (function () {
    function Base() {
    }
    return Base;
})();
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.apply(this, arguments);
    }
    return Derived;
})(Base);
function f(x) {
    var r;
    return r;
}
var r = f({ foo: new Base(), bar: new Derived() });
var r2 = f({ foo: new Derived(), bar: new Derived() });
function f2(x) {
    var r;
    return r;
}
var i;
var r3 = f2(i);
function f3(x, y) {
    return y(null);
}
var r4 = f3(new Base(), function (x) { return x; });
var r5 = f3(new Derived(), function (x) { return x; });
var r6 = f3(null, null); // any
var r7 = f3(null, function (x) { return x; }); // any
