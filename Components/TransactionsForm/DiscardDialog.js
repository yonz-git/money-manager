import {
  Overlay,
  DialogBox,
  DialogTitle,
  DialogMessage,
  DialogButtons,
  DialogButton,
} from "./DiscardDialog.styles";

export default function DiscardDialog({ onDiscard, onKeepEditing }) {
  return (
    <Overlay>
      <DialogBox>
        <DialogTitle>Discard changes?</DialogTitle>
        <DialogMessage>
          Are you sure you want to cancel? All changes will be lost.
        </DialogMessage>
        <DialogButtons>
          <DialogButton type="button" onClick={onDiscard}>
            Discard
          </DialogButton>
          <DialogButton type="button" $primary onClick={onKeepEditing}>
            Keep Editing
          </DialogButton>
        </DialogButtons>
      </DialogBox>
    </Overlay>
  );
}