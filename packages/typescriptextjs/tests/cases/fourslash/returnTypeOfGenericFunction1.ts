/// <reference path='fourslash.ts'/>

////interface WrappedArray<T> {
////    map<U>(iterator: (value: T) => U, context?: any): U[];
////}
////var x: WrappedArray<string>;
////var /**/y = x.map(s => s.length);

goTo.marker();
verify.quickInfoIs('(var) y: number[]');
