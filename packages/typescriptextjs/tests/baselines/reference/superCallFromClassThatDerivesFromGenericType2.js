//// [superCallFromClassThatDerivesFromGenericType2.ts]
declare class B<T> {
    m<U>(): B<U>;
}

class D extends B<any> {
    constructor() {
        super();
    }
}


//// [superCallFromClassThatDerivesFromGenericType2.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.call(this);
    }
    return D;
})(B);
