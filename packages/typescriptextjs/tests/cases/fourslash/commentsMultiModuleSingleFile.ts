/// <reference path='fourslash.ts' />

/////** this is multi declare module*/
////module mult/*3*/iM {
////    /** class b*/
////    export class b {
////    }
////}
/////** thi is multi module 2*/
////module mu/*2*/ltiM {
////    /** class c comment*/
////    export class c {
////    }
////}
////
////new /*1*/mu/*4*/ltiM.b();
////new mu/*5*/ltiM.c();

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker('1');
verify.completionListContains("multiM", "module multiM", "this is multi declare module\nthi is multi module 2");

goTo.marker('2');
verify.quickInfoIs("module multiM", "this is multi declare module\nthi is multi module 2");

goTo.marker('3');
verify.quickInfoIs("module multiM", "this is multi declare module\nthi is multi module 2");

goTo.marker('4');
verify.quickInfoIs("module multiM", "this is multi declare module\nthi is multi module 2");

goTo.marker('5');
verify.quickInfoIs("module multiM", "this is multi declare module\nthi is multi module 2");