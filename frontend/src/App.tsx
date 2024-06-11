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
import { PredictPage } from "./pages/predict-page/predict-page";
import { DisorderHelp } from "./pages/disorder-help/disorder-help";

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
  const goToPredict = () => {
    window.location.href = "/predict";
  };
  return (
    <>
      <img
        src="/src/assets/logobig.png"
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
                  onGoToPredict={goToPredict}
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
                  onGoToPredict={goToPredict}
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
                  onGoToPredict={goToPredict}
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
                  onGoToPredict={goToPredict}
                />
              </Panel>
            </ProtectedRoute>
          }
        />

        <Route
          path="/predict"
          element={
            <ProtectedRoute>
              <UserMenu
                username={localStorage.getItem("username")!}
                handleUsernameClick={handleUsernameClick}
                setShowPanel={setShowPanel}
              />
              <PredictPage />
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
                  onGoToPredict={goToPredict}
                />
              </Panel>
            </ProtectedRoute>
          }
        />

        <Route
          path="/disorder-help"
          element={
            <ProtectedRoute>
              <UserMenu
                username={localStorage.getItem("username")!}
                handleUsernameClick={handleUsernameClick}
                setShowPanel={setShowPanel}
              />
              <DisorderHelp />
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
                  onGoToPredict={goToPredict}
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
