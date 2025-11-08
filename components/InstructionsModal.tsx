import React from 'react';

interface InstructionsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CodeBlock: React.FC<{ children: React.ReactNode, language: string }> = ({ children, language }) => (
    <pre className="bg-[#111114] rounded-lg p-4 my-4 overflow-x-auto border border-gray-700">
        <code className={`language-${language} text-sm text-[#A5C9FF]`}>
            {children}
        </code>
    </pre>
);

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-[#242428] text-gray-300 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
                onClick={e => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-[#242428]/80 backdrop-blur-sm p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-medium text-white">Build for Android in Android Studio</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors rounded-full p-2 hover:bg-white/10">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <p>This is a web application. To run it on an Android device, you can wrap it in a <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">WebView</code>, which is a component that displays web pages within your native app. Here’s a step-by-step guide:</p>
                    
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Step 1: Create a New Android Studio Project</h3>
                        <ol className="list-decimal list-inside space-y-1 pl-4">
                            <li>Open Android Studio.</li>
                            <li>Click on "New Project".</li>
                            <li>Choose the "Empty Views Activity" template and click "Next".</li>
                            <li>Configure your project (Name, Package name, etc.). Choose "Kotlin" as the language. Click "Finish".</li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Step 2: Get The Static Web Files</h3>
                        <p className="mb-2">This web app runs in a special environment that doesn't use a traditional build step (like <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">npm run build</code>). To get the files for your Android app, you'll need to save them directly from your browser:</p>
                         <ol className="list-decimal list-inside space-y-3 pl-4">
                            <li>
                                <strong>Save the HTML file:</strong>
                                <ul className="list-disc list-inside pl-4 mt-1 space-y-1 text-gray-400">
                                    <li>Right-click anywhere on this page and select "View Page Source".</li>
                                    <li>Copy the entire source code you see.</li>
                                    <li>Save it into a new file named <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">index.html</code>.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Save the JavaScript file:</strong>
                                <ul className="list-disc list-inside pl-4 mt-1 space-y-1 text-gray-400">
                                    <li>Open your browser's Developer Tools (usually by pressing F12 or Ctrl+Shift+I).</li>
                                    <li>Go to the "Sources" or "Debugger" tab.</li>
                                    <li>Find the <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">index.tsx</code> file in the file navigator. The browser shows a compiled JavaScript version.</li>
                                    <li>Copy the entire content of this compiled file.</li>
                                    <li>Save it into a new file named <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">index.js</code>.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Update the HTML file:</strong>
                                 <ul className="list-disc list-inside pl-4 mt-1 space-y-1 text-gray-400">
                                    <li>Open your saved <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">index.html</code> file.</li>
                                    <li>Find the line <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">&lt;script type="module" src="/index.tsx"&gt;&lt;/script&gt;</code>.</li>
                                    <li>Change it to <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">&lt;script type="module" src="./index.js"&gt;&lt;/script&gt;</code> to point to your new JavaScript file.</li>
                                </ul>
                            </li>
                             <li>
                                <strong>Place files in Android Studio:</strong>
                                <ul className="list-disc list-inside pl-4 mt-1 space-y-1 text-gray-400">
                                    <li>In Android Studio, create an <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">assets</code> folder inside <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">app/src/main/</code> if it doesn't exist.</li>
                                    <li>Copy your new <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">index.html</code> and <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">index.js</code> files into this <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">assets</code> folder.</li>
                                </ul>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Step 3: Add a WebView to Your Layout</h3>
                        <p>Open <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">app/src/main/res/layout/activity_main.xml</code> and replace its content with a <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">WebView</code>:</p>
                        <CodeBlock language="xml">{`<?xml version="1.0" encoding="utf-8"?>
<WebView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/webview"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity" />`}</CodeBlock>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Step 4: Configure the WebView in Your Activity</h3>
                        <p>Open <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">app/src/main/java/com/yourpackagename/MainActivity.kt</code> and modify it to load your web app.</p>
                        <CodeBlock language="kotlin">{`package com.yourpackagename // Replace with your package name

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.PermissionRequest
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val myWebView: WebView = findViewById(R.id.webview)

        // Enable JavaScript and LocalStorage
        myWebView.settings.javaScriptEnabled = true
        myWebView.settings.domStorageEnabled = true

        // Set WebView clients
        myWebView.webViewClient = WebViewClient()
        myWebView.webChromeClient = object : WebChromeClient() {
            // Handle permissions for microphone, etc.
            override fun onPermissionRequest(request: PermissionRequest) {
                runOnUiThread {
                    request.grant(request.resources)
                }
            }
        }

        // Load the local index.html file
        myWebView.loadUrl("file:///android_asset/index.html")
    }
}`}</CodeBlock>
                    </div>
                     <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Step 5: Add Permissions to Manifest</h3>
                        <p>Open <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">app/src/main/AndroidManifest.xml</code> and add the following permissions inside the <code className="text-[#A5C9FF] bg-gray-700 px-1 rounded-md">&lt;manifest&gt;</code> tag:</p>
                        <CodeBlock language="xml">{`<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />`}</CodeBlock>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Step 6: Build and Run</h3>
                        <p>You can now build and run your application on an emulator or a physical Android device. It will display your web application full-screen.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
