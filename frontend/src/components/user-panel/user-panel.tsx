import { DefaultButton, Stack } from "@fluentui/react";
import { logoutButtonClassName, userPanelClassName } from "./user-panel-style";

interface UserPanelProps {
  onLogout: () => void;
  onGoToAccount: () => void;
  onGoToDisorder: () => void;
  onGoToPredict: () => void;
}

export const UserPanel = ({
  onLogout,
  onGoToAccount,
  onGoToDisorder,
  onGoToPredict,
}: UserPanelProps) => {
  return (
    <Stack tokens={{ childrenGap: 10 }} className={userPanelClassName}>
      <DefaultButton
        className={logoutButtonClassName}
        text="Logout"
        onClick={onLogout}
      />
      <DefaultButton
        className={logoutButtonClassName}
        text="Account"
        onClick={onGoToAccount}
      />
      <DefaultButton
        className={logoutButtonClassName}
        text="Disorders"
        onClick={onGoToDisorder}
      />
      <DefaultButton
        className={logoutButtonClassName}
        text="Predict"
        onClick={onGoToPredict}
      />
    </Stack>
  );
};
