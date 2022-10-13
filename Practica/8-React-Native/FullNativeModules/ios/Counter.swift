//
//  Counter.swift
//  FullNativeModules
//
//  Created by Vladislav Onatskyi on 10/4/22.
//

import Foundation

@objc(Counter) 
class Counter: RCTEventEmitter {
  private var  count = 0;
  
  @objc
  func increment(_ callback: RCTResponseSenderBlock) {
    count += 1
    print("count is test")
    callback([count])
    sendEvent(withName: "onIncrement", body: ["count": count])
  }
  
  override func supportedEvents() -> [String]! {
    return ["onIncrement"]
  }
  
}
