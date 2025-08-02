import { Button } from "@/app/components/Button";

type DialogProps = {
  wasOpened?: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
};

export function Dialog({
  wasOpened = false,
  title,
  content,
  onConfirm,
  onCancel,
  disabled = false,
}: DialogProps) {
  if (!wasOpened) {
    return null;
  }

  function handleClose() {
    if (disabled) return;
    onCancel();
  }

  return (
    <section className="fixed z-50 inset-0 bg-black/60 backdrop:backdrop-blur-xs flex items-center justify-center">
      <div
        className="bg-slate-50 p-6 rounded-lg max-w-2xl mx-6 flex flex-col gap-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-content"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the dialog
      >
        <h3 className="text-xl font-extrabold" id="dialog-title">
          {title}
        </h3>
        <div id="dialog-content">{content}</div>
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            size="md"
            disabled={disabled}
            onClick={handleClose}
            type="button"
            aria-label="Cancelar"
            title="Cancelar"
            autoFocus
          >
            Cancelar
          </Button>

          <Button
            size="md"
            variant="default"
            disabled={disabled}
            onClick={onConfirm}
            type="button"
            aria-label="Confirmar"
            title="Confirmar"
          >
            Exluir
          </Button>
        </div>
      </div>
    </section>
  );
}
