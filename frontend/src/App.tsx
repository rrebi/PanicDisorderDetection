// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   );
// }

// export default App;
import { Panel } from "@fluentui/react";
import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { UserMenu } from "./components/user-menu/user-menu";
import { UserPanel } from "./components/user-panel/user-panel";
import LoginPage from "./pages/login-page/login-page";
import { logoStyle } from "./pages/login-page/login-page-style";
import { logoutUser } from "./services/auth-service";
import { LoggedIn } from "./utils/logged-in";
import { ProtectedRoute } from "./utils/protected-route";
import { UserPage } from "./pages/user-page/user-page";
import { userPanelClassName } from "./App-style";
import { AddDisorderPage } from "./pages/add-disorder-page/add-disorder-page";
import { DisorderPage } from "./pages/disorder-page/disorder-page";
import { UserDashboard } from "./pages/user-dashboard/user-dashboard";

const App = () => {
  const [showPanel, setShowPanel] = useState(false);
  const navigate = useNavigate();
  const handleUsernameClick = () => {
    navigate("/user");
  };

  const handleLogout = () => {
    logoutUser()
      .then((response) => {
        if (response) {
          setShowPanel(false);
          navigate("/login");
        }
      })
      .catch((error) => {
        setShowPanel(false);
        console.log(error);
        navigate("/login");
      });
  };

  const goToAccount = () => {
    window.location.href = "/account";
  };
  const goToDisorder = () => {
    window.location.href = "/user";
  };
  return (
    <>
      <img
        src="/therapease-low-resolution-logo-color-on-transparent-background.png"
        alt="Panic Help Logo"
        className={logoStyle}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <LoggedIn>
              <LoginPage />
            </LoggedIn>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserMenu
                username={localStorage.getItem("username")!}
                handleUsernameClick={handleUsernameClick}
                setShowPanel={setShowPanel}
              />
              <UserDashboard />
              <Panel
                headerClassName={userPanelClassName}
                isOpen={showPanel}
                onDismiss={() => setShowPanel(false)}
                headerText="Menu"
                isBlocking={false}
                closeButtonAriaLabel="Close"
              >
                <UserPanel
                  onLogout={handleLogout}
                  onGoToAccount={goToAccount}
                  onGoToDisorder={goToDisorder}
                />
              </Panel>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/disorder/:id"
          element={
            <ProtectedRoute>
              <UserMenu
                username={localStorage.getItem("username")!}
                handleUsernameClick={handleUsernameClick}
                setShowPanel={setShowPanel}
              />
              <DisorderPage />
              <Panel
                headerClassName={userPanelClassName}
                isOpen={showPanel}
                onDismiss={() => setShowPanel(false)}
                headerText="Menu"
                isBlocking={false}
                closeButtonAriaLabel="Close"
              >
                <UserPanel
                  onLogout={handleLogout}
                  onGoToAccount={goToAccount}
                  onGoToDisorder={goToDisorder}
                />
              </Panel>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/add-disorder"
          element={
            <ProtectedRoute>
              <UserMenu
                username={localStorage.getItem("username")!}
                handleUsernameClick={handleUsernameClick}
                setShowPanel={setShowPanel}
              />
              <AddDisorderPage />
              <Panel
                headerClassName={userPanelClassName}
                isOpen={showPanel}
                onDismiss={() => setShowPanel(false)}
                headerText="Menu"
                isBlocking={false}
                closeButtonAriaLabel="Close"
              >
                <UserPanel
                  onLogout={handleLogout}
                  onGoToAccount={goToAccount}
                  onGoToDisorder={goToDisorder}
                />
              </Panel>
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <UserMenu
                username={localStorage.getItem("username")!}
                handleUsernameClick={handleUsernameClick}
                setShowPanel={setShowPanel}
              />
              <UserPage />
              <Panel
                headerClassName={userPanelClassName}
                isOpen={showPanel}
                onDismiss={() => setShowPanel(false)}
                headerText="Menu"
                isBlocking={false}
                closeButtonAriaLabel="Close"
              >
                <UserPanel
                  onLogout={handleLogout}
                  onGoToAccount={goToAccount}
                  onGoToDisorder={goToDisorder}
                />
              </Panel>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
