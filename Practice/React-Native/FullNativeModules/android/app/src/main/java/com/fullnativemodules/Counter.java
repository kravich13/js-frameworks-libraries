package com.fullnativemodules;


import androidx.annotation.NonNull;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;



public class Counter extends ReactContextBaseJavaModule{
    int counter = 0;

    Counter(ReactApplicationContext context) {
        super(context);

    }

    @Override
    public String getName () {
        return "Counter";
    }

    @ReactMethod
    public void increment(Callback callback) {
        counter += 1;

        callback.invoke(counter);

        sendEvent(getReactApplicationContext(), "onIncrement", counter);
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           int params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}


