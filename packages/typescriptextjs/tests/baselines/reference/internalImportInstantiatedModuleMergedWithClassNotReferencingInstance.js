//// [internalImportInstantiatedModuleMergedWithClassNotReferencingInstance.ts]
class A {
    aProp: string;
}
module A {
    export interface X { s: string }
    export var a = 10;
}

module B {
    var A = 1;
    import Y = A;
}


//// [internalImportInstantiatedModuleMergedWithClassNotReferencingInstance.js]
var A = (function () {
    function A() {
    }
    return A;
})();
var A;
(function (A) {
    A.a = 10;
})(A || (A = {}));
var B;
(function (B) {
    var A = 1;
})(B || (B = {}));
