//// [internalAliasEnumInsideLocalModuleWithExport.ts]
export module a {
    export enum weekend {
        Friday,
        Saturday,
        Sunday
    }
}

export module c {
    export import b = a.weekend;
    export var bVal: b = b.Sunday;
}


//// [internalAliasEnumInsideLocalModuleWithExport.js]
var a;
(function (a) {
    (function (weekend) {
        weekend[weekend["Friday"] = 0] = "Friday";
        weekend[weekend["Saturday"] = 1] = "Saturday";
        weekend[weekend["Sunday"] = 2] = "Sunday";
    })(a.weekend || (a.weekend = {}));
    var weekend = a.weekend;
})(a = exports.a || (exports.a = {}));
var c;
(function (c) {
    c.b = a.weekend;
    c.bVal = 2 /* Sunday */;
})(c = exports.c || (exports.c = {}));


//// [internalAliasEnumInsideLocalModuleWithExport.d.ts]
export declare module a {
    enum weekend {
        Friday = 0,
        Saturday = 1,
        Sunday = 2,
    }
}
export declare module c {
    export import b = a.weekend;
    var bVal: b;
}
