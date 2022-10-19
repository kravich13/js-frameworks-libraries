//
//  MyModule.swift
//  FullNativeModules
//
//  Created by Vladislav Onatskyi on 9/26/22.
//

import Foundation

@objc(MyModule)
class MyModule: NSObject {
  
  @objc
  func asyncMultiply (_ a: Int, b: Int, resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    let result = a * b
    
    resolve(result)
  }
  
  @objc(multiply: b: callback: )
  func multiply(a:Int, b:Int, callback:RCTResponseSenderBlock) {
      let result = a * b
    
      print([result])
      
      callback([result])
    }
  
  @objc(multiplyReturn: b: )
  func multiplyReturn(a:Int, b:Int) -> Bool {
      let result = a * b
    
      print([result])
      
      return true
    }
  
  @objc(sampleMethod: reject: )
  func sampleMethod(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    resolve(13)
  }
  
  
}
