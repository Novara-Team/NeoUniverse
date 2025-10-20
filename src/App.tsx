@@ .. @@
 import React from 'react';
+import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
+import { useAuth } from './hooks/useAuth';
+import { LoginPage } from './pages/LoginPage';
+import { SignupPage } from './pages/SignupPage';
+import { PricingPage } from './pages/PricingPage';
+import { SuccessPage } from './pages/SuccessPage';
+import { DashboardPage } from './pages/DashboardPage';
+import { Link } from 'react-router-dom';
 
 function App() {
+  const { user, loading } = useAuth();
+
+  if (loading) {
+    return (
+      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
+        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
+      </div>
+    );
+  }
+
   return (
-    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
-      <p>Start prompting (or editing) to see magic happen :)</p>
-    </div>
+    <Router>
+      <Routes>
+        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
+        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignupPage />} />
+        <Route path="/pricing" element={<PricingPage />} />
+        <Route path="/success" element={user ? <SuccessPage /> : <Navigate to="/login" />} />
+        <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
+        <Route path="/" element={<HomePage />} />
+      </Routes>
+    </Router>
   );
 }
 
+function HomePage() {
+  const { user } = useAuth();
+
+  return (
+    <div className="min-h-screen bg-gray-50">
+      <nav className="bg-white shadow">
+        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
+          <div className="flex justify-between h-16">
+            <div className="flex items-center">
+              <h1 className="text-xl font-semibold">Neo Universe</h1>
+            </div>
+            <div className="flex items-center space-x-4">
+              {user ? (
+                <>
+                  <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">
+                    Dashboard
+                  </Link>
+                  <Link to="/pricing" className="text-gray-700 hover:text-gray-900">
+                    Pricing
+                  </Link>
+                </>
+              ) : (
+                <>
+                  <Link to="/login" className="text-gray-700 hover:text-gray-900">
+                    Sign In
+                  </Link>
+                  <Link
+                    to="/signup"
+                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
+                  >
+                    Sign Up
+                  </Link>
+                </>
+              )}
+            </div>
+          </div>
+        </div>
+      </nav>
+
+      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
+        <div className="text-center">
+          <h1 className="text-4xl font-bold text-gray-900 mb-8">
+            Welcome to Neo Universe
+          </h1>
+          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
+            Discover the power of AI tools and unlock your creative potential with our comprehensive platform.
+          </p>
+          <div className="space-x-4">
+            <Link
+              to="/pricing"
+              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
+            >
+              View Plans
+            </Link>
+            {!user && (
+              <Link
+                to="/signup"
+                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
+              >
+                Get Started
+              </Link>
+            )}
+          </div>
+        </div>
+      </main>
+    </div>
+  );
+}
+
 export default App;